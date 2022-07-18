// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

var url = "mongodb://localhost:27017/";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/login.html");
});

app.post("/log-failure", function(req, res){
  res.redirect("/");
});

app.post("/", function(req, res) {
  var username = req.body.user;
  var password = req.body.pass;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("testDB").find({username: req.body.user, password: req.body.pass}).toArray(function(err, result) {
      if (err)  throw err;
      if(Object.keys(result).length === 0)
        res.sendFile(__dirname + "/public/response/log-failure.html");
      else
        res.sendFile(__dirname + "/public/response/log-success.html");
    db.close();
    });
  });
});

app.listen(3000, function() {
  console.log("server is listening on port 3000.");
})
