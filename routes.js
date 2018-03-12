var express = require("express");
// var inMemoryDatabase = require("./in-memory-database.js");
var router = express.Router();
var pool = require("./pg-connection-pool");
// var eventDb = inMemoryDatabase();
// eventDb.init([
// 	{eventName: "Test event",
//        	text: "Test event 1 description",
//        	option1: "Option1 Test",
//        	option1Price: 15,
//        	option2: "Test event 2 description",
//        	option2Price: 25
//        }
// 	]);

router.get("/events", function(req, res){
	pool.query("select * from events").then(function(result){
		res.send(result.rows);
	});
});
router.post("/events", function(req, res) {
  var data = req.body;
  var sql = "insert into events(text, option2price, option2, option1price, option1, eventname) values($1::text, $2::text, $3::text, $4::text);";
  var values = [data.text, data.option2price, data.option2, data.option1price, data.option1, data.eventname];
  pool.query(sql, values).then(function() {
    pool.query("select * from events").then(function(result) {
      res.send(result.rows);
      console.log(result.rows)
    });
  });
});

module.exports = router;
