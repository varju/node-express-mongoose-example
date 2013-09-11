'use strict';

var MongooseMock = require('./mongoose_mock').MongooseMock;
var User = require('../../app/models/user_model').User;

var UserMock = new MongooseMock(User);
exports.UserMock = UserMock;
