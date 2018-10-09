const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  // console.log("Got request");
  
  if(req.body.username==="omkarsk" && req.body.password==="hey"){
    res.status(200).send('authorized');
    // console.log(req.body);
  }
  else
    res.status(200).send('unauthorized');
});

module.exports = router;
