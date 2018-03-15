var express = require("express");
var router = express.Router();
var pool = require("./pg-connection-pool");

router.get("/events", function(req, res){
	pool.query("select * from events").then(function(result){
		res.send(result.rows);
	});
});
router.post("/events", function(request, response) {
	var data = request.body;
	console.log(request.body);
  console.log(data);
  var sql = "INSERT INTO events(text, option2price, option2, option1price, option1, eventname, repeatability, image) VALUES($1::text, $2::integer, $3::text, $4::integer, $5::text, $6::varchar, true, 'images/emptyplate.png')";
  var values = [data.text, data.option2price, data.option2, data.option1price, data.option1, data.eventname];
  pool.query(sql, values).then(function() {
    pool.query("select * from events").then(function(result) {
      response.send(result.rows);
      console.log(result.rows);
    });
  }).catch(function(err){
  	console.log(err);
  	response.status(500).send("Error");
  })
});

module.exports = router;
