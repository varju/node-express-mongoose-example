'use strict';

var fs = require('fs');

module.exports = function (app) {
  // load all the other controllers in this directory
  fs.readdirSync(__dirname).
    filter(function (file) {
      return file !== "index.js" && (/.js$/).test(file);
    }).
    forEach(function (file) {
      var name = file.substr(0, file.indexOf('.'));
      require('./' + name)(app);
    });

  // define our root controller
  app.get('/', function (req, res) {
    res.send({ hello: 'world' });
  });
};
