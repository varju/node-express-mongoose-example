'use strict';

// start our mongo connection
var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect(config.props.mongo.uri);

// create our web server
var express = require('express');
var app = express();
app.set('port', config.props.server.port);
app.use(express.bodyParser());
app.use(express.methodOverride());

// define our controllers
app.use(app.router);
require('./controllers')(app);

// register a global error handler
app.use(function (err, req, res, next) {
  switch (err.name) {
    case 'ValidationError':
      // mongoose validation errors
      res.send(400, { error: err.toString() });
      break;
    default:
      // unknown error type
      next(err);
  }
});

// catch unhandled errors
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

exports.app = app;
