'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

exports.User = mongoose.model('users', userSchema);
