const static = require('node-static');
const fs = require("fs");
const file = new static.Server('./public');
var express = require('express');
var app = express();

app.use('/static',express.static('public'));
app.set("view engine", "ejs");
app.get('/', function(req, res) {
  res.render('index.ejs');
});
app.get('/recognition', function(req, res) {
  res.render('recognition.ejs');
});
app.get('/synthesis', function(req, res) {
  res.render('synthesis.ejs');
});
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

