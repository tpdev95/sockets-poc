const db = require("./config/db");
require("dotenv").config();

const ResourceModel = require("./models/ResourceModel");

console.log("SEEDER-ON");

const importData = async () => {
  try {
    await db.drop();
    await db.sync();

    await ResourceModel.create({
      name: "rent-program-01",
      type: "rent",
    });

    console.log("Data Imported...");
  } catch (err) {
    console.log(err);
  }
};

importData();

module.exports = importData;
