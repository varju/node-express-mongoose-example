'use strict';

var express = require('express');

var routeIndex = require('./routes/index');
var config = require('./config.js');

var app = express();

// all environments
app.set('port', config.props.server.port);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routeIndex.index);

exports.app = app;
