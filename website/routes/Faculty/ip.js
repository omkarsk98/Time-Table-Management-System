const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log("Got a request");
  let local_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("ip:",local_ip);
  res.status(200).json({ ip:local_ip });
});

module.exports = router;
