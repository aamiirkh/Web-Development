// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "testDB";

const client = new MongoClient(url, { useNewUrlParser: true});

client.connect(function(err){
  assert.equal(null, err);

  const db = client.db(dbName);
  client.close();
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/login.html");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/", function(req, res) {
  var username = req.body.user;
  var password = req.body.pass;

  if (username === "admin" && password === "admin")
    res.sendFile(__dirname + "/success.html");
  else
    res.sendFile(__dirname + "/failure.html");
});

app.listen(3000, function() {
  console.log("server is listening on port 3000.");
})
