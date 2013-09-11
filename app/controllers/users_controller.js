'use strict';

var asyncblock = require('asyncblock');

var User = require('../models/user_model').User;

module.exports = function (app) {

  app.post('/users', function (req, res, next) {
    asyncblock(function (flow) {
      flow.errorCallback = next;

      var userTemplate = req.body;
      new User(userTemplate).validate().sync();

      var user = User.create(userTemplate).sync();
      res.send(201, { id: user.id });
    });
  });

  app.get('/users/:id', function (req, res, next) {
    asyncblock(function (flow) {
      flow.errorCallback = next;

      var id = req.param('id');
      var user = User.findById(id).sync();
      if (null === user) {
        res.send(404);
      } else {
        res.status(200).send({
          id: user.id,
          name: user.name
        });
      }
    });
  });

};
