//Load HTTP module
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");

module.exports = httpServer = http.createServer(app);

app.use(cors());

const port = 5000;

const db = require("./setup/Dburl").URL;
const auth = require("./routes/api/auth");

mongoose
  .connect(db)
  .then((result) => {
    console.log("sucessfully connect to db");
  })
  .catch((err) => {
    console.log("DbErr: ", err.message);
  });

//Midleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello word");
});

app.use("/api/auth", auth);

httpServer.listen(port, () => {
  console.log(`server listening on port number ${port}`);
});
