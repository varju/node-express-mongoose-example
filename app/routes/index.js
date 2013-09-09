'use strict';

function index(req, res) {
  res.send({ hello: 'world' });
}
exports.index = index;
