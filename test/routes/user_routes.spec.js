/* jshint expr:true */
/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

require('../../app/config').setTestMode();
var server = require('../../app/server');
var User = require('../../app/models/user_model').User;

describe('users controller', function () {
  describe('POST /users', function () {
    it('should say hello', function (done) {
      request(server.app).
        post('/users').
        send({ name: 'my user' }).
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(201);
          res.should.be.json;
          res.body.id.should.match(/^[0-9a-f]{24}$/);
          done();
        });
    });

    it('should fail if the name is missing', function (done) {
      request(server.app).
        post('/users').
        send({}).
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.name.should.eql('ValidationError');
          res.body.error.errors.should.have.property('name');
          done();
        });
    });
  });

  describe('GET /users/:id', function () {
    it('should load a user', function (done) {
      User.create({name: 'test user'}, function (err, user) {
        should.ifError(err);
        request(server.app).
          get('/users/' + user.id).
          end(function (err, res) {
            should.ifError(err);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.eql({ name: 'test user', id: user.id});
            done();
          });
      });
    });

    it("should fail if the user doesn't exist", function (done) {
      request(server.app).
        get('/users/000000000000000000000000').
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(404);
          done();
        });
    });
  });
});
