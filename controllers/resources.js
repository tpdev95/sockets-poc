const ResourceModel = require("../models/ResourceModel");
const wsBroadcast = require("../utils");

resources_list = async (req, res) => {
  try {
    const resources = await ResourceModel.findAll();
    return res.status(200).json(resources);
  } catch (err) {
    console.log("err:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

add_resource = async (req, res) => {
  const { name, type } = req.body;

  const wsClients = req.app.locals.wsClients;
  try {
    if ((name, type)) {
      const resource = await ResourceModel.create(req.body);
      //Just to test sending message based on a post(use db watcher in the future)
      wsBroadcast(wsClients, "update_resources");
      return res.status(200).json(req.body);
    }
  } catch (err) {
    console.log("err:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  resources_list,
  add_resource,
};
