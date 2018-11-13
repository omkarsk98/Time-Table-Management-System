var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://server:secretpass1!@ds139960.mlab.com:39960/timetablemanagementsystem");