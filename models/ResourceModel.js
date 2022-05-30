const { DataTypes } = require("sequelize");
const db = require("../config/db");

const ResourceModel = db.define("resources", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ResourceModel;
