require("dotenv").config();
const Sequelize = require("sequelize");

const { PGSQL_USERNAME, PGSQL_PASSWORD, PGSQL_DB, PGSQL_HOST, PGSQL_PORT } =
  process.env;

module.exports = new Sequelize(PGSQL_DB, PGSQL_USERNAME, PGSQL_PASSWORD, {
  host: PGSQL_HOST,
  port: PGSQL_PORT,
  dialect: "postgres",
  timezone: "utc",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
