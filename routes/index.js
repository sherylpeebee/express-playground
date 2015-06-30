var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
// req.query

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
router.get('/quotes', function(req, res) {
  var data = require("../data.json");
  var quotes = data.quotes;
  res.render("quotes", {quotes: quotes});
});
router.post('/quotes', function(req, res) {
  var newQuote = req.body.SUBMISSION ;
  var data = require("../data.json");
  data.quotes.push(newQuote);
  fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), function(err){
    //This allows us to use absolute paths and join together like strings ^^!!!
    //see documentation on nodemodule "path"
    if (err){
      console.error(err);
      res.status(500).send("We could not save the quote, please try again later");
    }
  res.redirect("/quotes");
  });
  // res.send("done.");
});

module.exports = router;
