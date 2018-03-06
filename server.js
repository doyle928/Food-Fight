var express = require("express");
var bodyParser = require("body-parser");
//var events = require("./routes.js");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//app.use("/", events);


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log("Express server is up and running @ ", port);
});
