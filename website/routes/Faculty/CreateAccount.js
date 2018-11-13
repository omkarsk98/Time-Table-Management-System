const express = require("express");
const router = express.Router();
require('../modules/MongoConnect')
const MongoClient = require("mongodb").MongoClient;
var db;

router.post("/", function(req, res, next) {
  // console.log("Got a request!");
  if (!req.body.username || !req.body.password)
    res.status(200).send("data required");
  else {
    MongoClient.connect(
      "mongodb://server:secretpass1!@ds139960.mlab.com:39960/timetablemanagementsystem",
      (err, client) => {
        // ... do something here
        if (err) return console.log(err);
        db = client.db("timetablemanagementsystem");
        var old = {
          "Email": req.body.mail
        };
        var newValues = { $set: { "username": req.body.username,"password":req.body.password } };
        db.collection("Teachers").updateOne(old, newValues, (err, result) => {
          if (err) return console.log("Error",err);
          res.status(200).send("Updated");
          if(result.result.nModified===0)
            res.status(204).send("Not Registered");
          console.log("Number of updates:",result.result.nModified);
          console.log("1 document updated");
          // db.close();
        });


        // db.collection('accounts').insertOne(req.body, (err, result) => {
        //   if (err) return console.log(err)
        //   // console.log('saved to database')
        //   // res.redirect('/')
        // })
      }
    );
    res.status(200).send("ok");
  }
});

module.exports = router;
