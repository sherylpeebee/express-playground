var express = require('express');
var router = express.Router();

router.get('/data/:id', function(req, res) {
  var data = require("../data.json");
  res.send(data.quotes[+req.params.id - 1]);
});

router.get('/data', function(req, res) {
  res.send("Got it!\n");
});

router.post('/data', function(req, res) {
  res.send("Posted!\n");
});

module.exports = router;
