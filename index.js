const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const resources = require("./routes/resources");
const db = require("./config/db");
const bodyParser = require("body-parser");
const websockets = require("./config/websockets");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/resources", resources);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

websockets(server);

// const webSocketServer = require("websocket").server;
// const http = require("http");
// const server = http.createServer();
// const wsPort = 8000;
// server.listen(wsPort);
// const wsServer = new webSocketServer({
//   httpServer: server,
// });

// const clients = {};

// const getUniqueID = () => {
//   const s4 = () =>
//     Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   return s4() + s4() + "-" + s4();
// };

// wsServer.on("request", (request) => {
//   let userID = getUniqueID();
//   console.log(new Date() + "Received a new conn from origin " + request.origin);
//   const connection = request.accept(null, request.origin);
//   clients[userID] = connection;
//   console.log(
//     "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
//   );
// });
