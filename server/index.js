const express = require("express");
const morgan = require("morgan");
const DBConnection = require("./../modules/db-manager/db-connection/connection");

class Server {
  constructor() {
    this.dbConnection = new DBConnection(
      process.env.DB_SERVER,
      process.env.DB_PORT,
      process.env.DB_NAME,
      process.env.USER_NAME,
      process.env.PASSWORD
    );
    let app = express();

    /* Setting up PORT */
    app.set("port", process.env.PORT || 3000);

    /* Logging server request */
    app.use(morgan("combined"));

    this.app = app;
  }

  start() {
    return Promise.resolve()
      .then(() => this.dbConnection.connect())
      .then(() => {
        new Promise((resolve, reject) => {
          this.app.listen(this.app.get("port"), error => {
            if (error) {
              reject(error);
            } else {
              console.log(`Server running on Port ${this.app.get("port")}`);
              resolve(this.app);
            }
          });
        });
      });
  }
}

module.exports = Server;
