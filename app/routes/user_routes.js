'use strict';

var User = require('../models/user_model').User;

function create(req, res, next) {
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
}
exports.create = create;
