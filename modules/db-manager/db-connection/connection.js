const mongoose = require("mongoose");

class DBConnection {
  constractor(server, port, database, userName, passWord) {
    (this.server = server),
    (this.port = port),
    (this.database = database),
    (this.userName = userName),
    (this.passWord = passWord);
  }
  connect() {
    mongoose.connect(`mongodb://${this.server}:${this.port}/${this.database}`);
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => console.log("Database connection successfull"));
  }
}
module.exports = DBConnection;
