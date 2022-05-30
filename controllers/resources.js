const ResourceModel = require("../models/ResourceModel");

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
  try {
    if ((name, type)) {
      const resources = await ResourceModel.create(req.body);
      return res.status(200).json(req.body);
    }
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  resources_list,
  add_resource,
};
