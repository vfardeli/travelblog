var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/travelblog'); //for local
var db = mongoose.connect('mongodb://root:password@ds117821.mlab.com:17821/heroku_cx4w5jgm'); //for heroku

module.exports = db;