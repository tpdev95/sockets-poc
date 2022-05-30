const WebSocket = require("ws");
const queryString = require("query-string");

module.exports = async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });
  let clients = {};
  //Triggered by a request using ws protocol
  //socket: network conn between client and sv
  //head: first chunk of req data
  expressServer.on("upgrade", (request, socket, head) => {
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
    const userId = connectionParams["id"];
    if (userId) {
      if (clients[userId]) {
        console.log("already connected");
      }

      websocketConnection.id = userId;
      clients[userId] = websocketConnection;
    }

    console.log('WS Clients:', websocketServer.clients.size);



    // if (clients.includes(connectionParams["id"])) {
    //   websocketConnection.close();
    //   console.log('client-closed')
    //   clients = clients.splice(clients.indexOf(connectionParams["id"]), 1);
    // }

    websocketConnection.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      console.log("client-connection:", connectionParams)
      console.log(parsedMessage);
    });
  });
  return websocketServer;
};
