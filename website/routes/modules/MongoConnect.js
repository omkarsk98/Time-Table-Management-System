var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://system:tmsproject1!@ds139960.mlab.com:39960/timetablemanagementsystem");