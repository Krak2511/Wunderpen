const express = require("express");
const app = express();

app.use(express.static(__dirname + '/static'));

app.listen(3000, function (req, res) {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});