const wsBroadcast = (clients, msg) => {
  console.log("clients:", clients);
  Object.keys(clients).map((client) => clients[client].send(msg));
};

module.exports = wsBroadcast;
