'use strict';

var express = require('express');

// start our mongo connection
var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect(config.props.mongo.uri);

// create our web server
var app = express();
app.set('port', config.props.server.port);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// define our controllers
require('./controllers')(app);

exports.app = app;
