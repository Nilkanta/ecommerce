const express = require("express");
const morgan = require("morgan");

class Server {
  constructor() {
    let app = express();

    /* Setting up PORT */
    app.set("port", process.env.PORT || 3000);

    /* Logging server request */
    app.use(morgan("combined"));

    this.app = app;
  }
  start() {
    return new Promise((resolve, reject) => {
      return this.app.listen(this.app.get("port"), error => {
        if (error) {
          reject(error);
        } else {
          console.log(`Server running on Port ${this.app.get("port")}`);

          resolve(this.app);
        }
      });
    });
  }
}

module.exports = Server;
