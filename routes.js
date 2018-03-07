var express = require("express");
// var inMemoryDatabase = require("./in-memory-database.js");
var router = express.Router();

var eventDb = inMemoryDatabase();
eventDb.init([
	{eventName: "Test event", 
       	text: "Test event 1 description",
       	option1: "Option1 Test",
       	option1Price: 15,
       	option2: "Test event 2 description",
       	option2Price: 25
       }
	]);

router.get("/events", function(req, res){
	res.send(eventDb.readAll());
});