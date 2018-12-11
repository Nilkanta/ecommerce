const server = require("./server");
const DBConnection = require("./modules/db-manager/db-connection/connection.js");
require("dotenv").config();

const Server = new server();
const dbConnection = new DBConnection(
  process.env.DB_SERVER,
  process.env.DB_PORT,
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD
);

module.exports = Promise.resolve()
  .then(() => dbConnection.connect())
  .then(() => Server.start())
  .catch(error => process.emit("uncaughtException", error));

process.on("uncaughtException", error => {
  console.log(`Un Exceptional Error at ${new Date().toISOString()}`);
  console.log(`Error message:`, error.message);
  process.exit(1);
});
