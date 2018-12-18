const mongoose = require("mongoose");

class DBConnection {
    constructor(server, port, database, userName, passWord) {
    this.server = server;
    this.port = port;
    this.database = database;
    this.userName = userName;
    this.passWord = passWord;
  }
  connect() {
    mongoose.connect(`mongodb://${this.server}:${this.port}/${this.database}`,{useNewUrlParser:true});
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "Database not connect"));
    db.once("open", () => console.log("Database connection successfull"));
  }
}
module.exports = DBConnection;
