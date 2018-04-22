const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const geocoder = require('geocoder');
const session = require('express-session');
const passport = require('passport');
const app = express();

app.use(session({
  secret: 'S3CR3T!',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// var connectionString = 'mongodb://localhost:27017/travelblog'; // for local
var connectionString = 'mongodb://root:password@ds117821.mlab.com:17821/heroku_cx4w5jgm'; // for heroku
var mongoose = require("mongoose");
mongoose.createConnection(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// const port = process.env.PORT || '3200';
// app.set('port', port);

const server = http.createServer(app);

require("./server/app")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Create HTTP server
// server.listen( 3200 , () => console.log('Running on port 3200')); // for localhost
server.listen( process.env.PORT , () => console.log('Running on heroku')); // for heroku

/*var dbServer = require('./test-mongodb/app');
dbServer(app);*/

//require('./test-mongodb/app')(app);
