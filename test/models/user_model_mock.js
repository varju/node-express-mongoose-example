'use strict';

var SinonMock = require('./sinon_mock').SinonMock;
var User = require('../../app/models/user_model').User;

var UserMock = new SinonMock(User);
exports.UserMock = UserMock;
