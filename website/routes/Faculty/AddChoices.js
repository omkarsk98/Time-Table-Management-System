const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var db;

router.post("/", function(req, res, next) {
  // console.log("Got request");
  if (
    !req.body.id ||
    !req.body.doj ||
    !req.body.choice1 ||
    !req.body.choice2 ||
    !req.body.choice3 ||
    !req.body.choice4
  )
    res.status(422).send("data required");

  if (!req.body.mail) res.status(422).send("email id required");
  else {
    var choices = {
      1: req.body.choice1,
      2: req.body.choice2,
      3: req.body.choice3,
      4: req.body.choice4
    };
    MongoClient.connect(
      "mongodb://system:tmsproject1!@ds139960.mlab.com:39960/timetablemanagementsystem",
      (err, client) => {
        if (err) return console.log(err);
        db = client.db("timetablemanagementsystem");
        var old = {
          Email: req.body.mail
        };
        var newValues = { $set: { pref: choices } };
        db.collection("accounts").updateOne(old, newValues, (err, res) => {
          if (err) throw err;
          res.status(200).send("Updated");
          console.log(res.result.nModified);
          console.log("1 document updated");
          db.close();
        });
      }
    );
  }
});

module.exports = router;

// db.accounts.find({username: 'omkarsk98'},{password:'check'})
