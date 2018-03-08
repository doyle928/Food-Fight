var express = require("express");
var bodyParser = require("body-parser");
var util = require("util");
var router = require("./routes");
//var events = require("./routes.js");
var app = express();
app.use("/", router);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//app.use("/", events);

var port = process.env.PORT || 5000;
var server = app.listen(5000, function() {
  var port = server.address().port;
  console.log("Express server is up and running @ ", port);
});
