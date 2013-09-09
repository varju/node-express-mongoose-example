'use strict';

var http = require('http');
var server = require('./server');

http.createServer(server.app).listen(server.app.get('port'), function () {
  console.log('Express server listening on port ' + server.app.get('port'));
});
