const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const resources = require("./routes/resources");
const db = require("./config/db");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const queryString = require("query-string");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use("/resources", resources);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
const websocketServer = new WebSocket.Server({
  noServer: true,
  path: "/websockets",
});
let clients = {};
//Triggered by a request using ws protocol
//socket: network conn between client and sv
//head: first chunk of req data
server.on("upgrade", (request, socket, head) => {
  //handleUpgrade method upgrades the http request into a websocket request
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    //emit an event named connection with the upgraded ws connection and the original request to handle the new ws connection
    websocketServer.emit("connection", websocket, request);
  });
});

websocketServer.on("connection", (websocketConnection, connectionRequest) => {
  //Getting data from params and parsed manually(cant pass data into the body on ws)
  const [_path, params] = connectionRequest?.url?.split("?");
  const connectionParams = queryString.parse(params);
  const userToken = connectionParams["token"];
  if (userToken) {
    if (clients[userToken]) {
      console.log("already connected");
    }

    websocketConnection.id = userToken;
    clients[userToken] = websocketConnection;
  }

  console.log("WS Clients:", websocketServer.clients.size);

  websocketConnection.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
  });
});

app.locals.wsClients = clients;
