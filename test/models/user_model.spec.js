/* global describe,it */

'use strict';

var should = require('should');

require('../../app/config').setTestMode();
var User = require('../../app/models/user_model').User;

describe('user model', function () {
  describe('create', function () {
    it('should store a new user', function (done) {
      var user = new User({name: 'joe cool'});
      user.save(function (err, persistedUser) {
        should.ifError(err);
        persistedUser.name.should.eql('joe cool');
        persistedUser.id.should.match(/[0-9a-f]{24}/);

        User.findById(persistedUser.id, function (err, foundUser) {
          foundUser.name.should.eql('joe cool');
          foundUser.id.should.eql(persistedUser.id);
          done();
        });
      });
    });
  });
});
