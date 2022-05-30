const WebSocket = require("ws");
const queryString = require("query-string");

module.exports = async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

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

    websocketConnection.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
    });
  });

  return websocketServer;
};
