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

// define our routes
var routeIndex = require('./routes/index');
app.get('/', routeIndex.index);

var routeUser = require('./routes/user_routes');
app.post('/users', routeUser.create);
app.get('/users/:id', routeUser.get);

exports.app = app;
