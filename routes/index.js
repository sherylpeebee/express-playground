var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
// req.query
var data = require("../data.json");



var persistData = function(data, successCB, errorCB){
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
    if (err) {
      console.error(err);
      errorCB();
      res.status(500).json( { error: "We could not save the quote, please try again later" });
    }
    successCB();
    res.json({ quote: newQuote });
  });
};

router.get('/quotes', function(req, res) {
  res.json(data);
});


router.delete('/quotes/:id', function(req, res) {
  data.quote.splice(req.params.id, 1);

  res.status(400).json({mesage: "quote deleted"});
  res.json({mesage: "quote not deleted"});
});



  router.post('/quotes', function(req, res) {
    var newQuote = req.body.quote;
    if (!newQuote) {
      res.status(404).json( { error: "We need a text for that quote, son" });
      return;
    }
    if (data.quotes.indexOf(newQuote)  > -1) {
      res.status(406).json( { error: "Say something, I'm givin up on you..." });
      return;
    }
    data.quotes.push(newQuote);
  persistData(data, function(){

  });
});

router.get('/index', function(req, res) {
  res.render("index");

});
// router.get('/quotes/json', function(req, res) {
//   res.json("../data.json");
// });
// router.get('/data/:id', function(req, res) {
//   var data = require("../data.json");
//   res.send(data.quotes[+req.params.id - 1]);
// });
//
// router.get('/data', function(req, res) {
//   res.send("Got it!\n");
// });
//
// router.post('/data', function(req, res) {
//   res.send("Posted!\n");
// });
// router.get('/quotes', function(req, res) {
//   var data = require("../data.json");
//   var quotes = data.quotes;
//   res.render("quotes", {quotes: quotes});
// });
// router.post('/quotes', function(req, res) {
//   var newQuote = req.body.SUBMISSION ;
//   var data = require("../data.json");
//   data.quotes.push(newQuote);
//   fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), function(err){
//     //This allows us to use absolute paths and join together like strings ^^!!!
//     //see documentation on nodemodule "path"
//     if (err){
//       console.error(err);
//       res.status(500).send("We could not save the quote, please try again later");
//     }
//   res.redirect("/quotes");
//   });
  // res.send("done.");
// });

module.exports = router;
