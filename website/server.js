const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');

const MongoClient = require('mongodb').MongoClient

// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
// var User = mongoose.model("User", nameSchema);

const login = require('./routes/Faculty/login');
const ip = require('./routes/Faculty/ip');
const signup = require('./routes/Faculty/signup');
const createAccount = require('./routes/Faculty/CreateAccount');
const addChoices = require('./routes/Faculty/AddChoices'); 

const app = express();
app.use(express.static(__dirname+'/frontend/build/'))

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.get('/*',function(req, res){
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login',login);
app.use('/ip',ip);
app.use('/signup',signup);
app.use('/create-account',createAccount);
app.use('/add-choices',addChoices);

// app.use('/', index);
// app.use('/todos', todos);

app.listen(port, function() {
  console.log("listening on port: ", port);
})
