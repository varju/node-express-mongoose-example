'use strict';

var config = require('../../config/config.js');
var mongoose = require('mongoose');
mongoose.connect(config.props.mongo.uri);

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

exports.User = mongoose.model('users', userSchema);
