const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var db;

/* GET home page. */
router.post('/', function(req, res, next) {
  // console.log("Got request");
  if(!req.body.username || !req.body.password){
    res.status(200).send("data required");
  }
  
  else{
    MongoClient.connect(
      "mongodb://system:tmsproject1!@ds139960.mlab.com:39960/timetablemanagementsystem",
      (err, client) => {
        if (err) return console.log(err);
        db = client.db("timetablemanagementsystem");
        var query = { $and:[{username: req.body.username},{password:req.body.password}] };
        db.collection('accounts').find(query).toArray(function (err, result){
          if (err) return console.log("Error",err);
          if(result.length>0){
            // console.log("Result present.");
            res.status(200).send('authorized');
          }            
          else
            res.status(200).send('unauthorized');
          // console.log(result);
        })
      }
    );
    
    // res.status(200).send('authorized');
  }
    
});

module.exports = router;
