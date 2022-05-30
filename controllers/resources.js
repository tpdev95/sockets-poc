const ResourceModel = require("../models/ResourceModel");
const ws = require("../");

resources_list = async (req, res) => {
  try {
    const resources = await ResourceModel.findAll();
    return res.status(200).json(resources);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

add_resource = async (req, res) => {
  const { name, type } = req.body;

  const ws = await req.app.locals.ws;
  try {
    if ((name, type)) {
      const resource = await ResourceModel.create(req.body);
      //Just to test sending message based on a post(use db watcher in the future)
      // const resources = await ResourceModel.findAll();
      // console.log("zz-aca:", Array.from(ws.clients)) //ACA BUSCA POR ID
      return res.status(200).json(req.body);
    }
  } catch (err) {
    console.log("zz-err:", err)
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  resources_list,
  add_resource,
};
