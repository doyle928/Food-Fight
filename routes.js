// var express = require("express");
// var router = express.Router();
// //var pool = require("./pg-connection-pool");

// // router.get("/todolist", function(req, res) {
// //   pool
// //     .query("SELECT * FROM todolist")
// //     .then(function(result) {
// //       res.send(result.rows);
// //       console.log("got");
// //     })
// //     .catch(function(err) {
// //       console.log(err);
// //       res.status(500).send("ERROR");
// //     });
// // });

// // router.post("/todolist", function(req, res) {
// //   var todolist = req.body;
// //   var sql = "INSERT INTO todolist(task) VALUES ($1::text)";
// //   var values = [todolist.task];
// //   pool
// //     .query(sql, values)
// //     .then(function(result) {
// //       res.status(201).send("Created");
// //       console.log("added");
// //     })
// //     .catch(function(err) {
// //       console.log(err);
// //       res.status(500).send("ERROR");
// //     });
// // });

// // router.delete("/todolist/:id", function(req, res) {
// //   var id = req.params.id;
// //   var sql = "DELETE FROM todolist WHERE id=$1::int";
// //   pool
// //     .query(sql, [id])
// //     .then(function(result) {
// //       res.send("deleted");
// //     })
// //     .catch(function(err) {
// //       console.log(err);
// //       res.status(500).send("ERROR");
// //     });
// // });

// // router.put("/todolist/:id", function(req, res) {
// //   var id = req.params.id;
// //   var task = req.body;
// //   var sql = "UPDATE todolist SET task=$2::text WHERE id=$1::int";
// //   var values = [id, task.task];
// //   pool
// //     .query(sql, values)
// //     .then(function(result) {
// //       res.status(201).send("edited");
// //       console.log("added");
// //     })
// //     .catch(function(err) {
// //       console.log(err);
// //       res.status(500).send("ERROR");
// //     });
// // });

// module.exports = router;
