var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');

var mongo = require('mongodb');
var mongoose = require('mongoose');

/*var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb:ecommgrp1:rwgLHlbEGnzxGS0uGeH5s9RnzPd2tJkMT9BxDRaSOkxs9mf3LJa6kndZXx3Oo7kQtcBugWCuoYK7mcEXAJ3UnQ==@ecommgrp1.documents.azure.com:10250/?ssl=true", function (err, db) {
 console.log('Minimummm Mongo');
  
});  */

mongoose.connect('mongodb://ecommgrp4:f7IsBv4HJKtSqaLNfEMZv5wZKAKjnJcEhYRrzFBNIzL8WDKutTFM4wHehoE5QKwgjwx5BTHdhSqJ7mTCYD73hA==@ecommgrp4.documents.azure.com:10250/shopping?ssl=true');

var index = require('./routes/index');
//var products = require('./routes/products');

var app = express();

//mongoose.connect('localhost:27017/shopping');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});  */
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

console.log('Server Running at port 3000')
