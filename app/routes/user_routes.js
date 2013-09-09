'use strict';

var User = require('../models/user_model').User;

exports.create = function (req, res, next) {
  var user = new User(req.body);
  user.validate(function (err) {
    if (err) {
      res.send(400, { error: err });
    } else {
      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.send(201, { id: user.id });
      });
    }
  });
};

exports.get = function (req, res) {
  var id = req.param('id');
  User.findById(id, function (err, user) {
    if (null === user) {
      res.send(404);
    } else {
      res.status(200).send({
        name: user.name,
        id: user.id
      });
    }
  });
};
