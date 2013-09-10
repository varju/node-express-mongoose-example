'use strict';

var User = require('../models/user_model').User;

module.exports = function (app) {
  app.post('/users', function (req, res, next) {
    var user = new User(req.body);
    user.validate(function (err) {
      if (err) return next(err);

      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.send(201, { id: user.id });
      });
    });
  });

  app.get('/users/:id', function (req, res, next) {
    var id = req.param('id');
    User.findById(id, function (err, user) {
      if (err) return next(err);

      if (null === user) {
        res.send(404);
      } else {
        res.status(200).send({
          name: user.name,
          id: user.id
        });
      }
    });
  });
};
