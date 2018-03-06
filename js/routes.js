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

// router.post("/events", function(req,res){
// 	var event = req.body;
// 	eventDb.create(event);
// 	res.status(201).send(event);
// });

// router.delete("/events/:id", function(req,res){
// 	var id = req.params.id;
// 	eventDb.delete(id);
// 	res.send("Deleted.");
// });

// router.put("/events/:id", function(req,res){
// 	var id = req.params.id;
// 	var event = req.body.event;
// 	eventDb.update(id, event);
// 	res.status(201).send("Updated");
// });

module.exports = router;