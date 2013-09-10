/* jshint expr:true */
/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

require('../../app/config').setTestMode();
var server = require('../../app/server');
var userMock = require('../models/user_model_mock').UserMock;

describe('users controller', function () {
  userMock.register();

  describe('POST /users', function () {
    it('should create a user', function (done) {
      userMock.allowValidate();
      userMock.allowCreate({ id: 'mockId'});

      request(server.app).
        post('/users').
        send({ name: 'my user' }).
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(201);
          res.should.be.json;
          res.body.id.should.eql('mockId');
          done();
        });
    });

    it('should fail if the name is missing', function (done) {
      var errorBody = { my: 'error' };
      userMock.failValidate(errorBody);

      request(server.app).
        post('/users').
        send({}).
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.eql({ error: errorBody });
          done();
        });
    });
  });

  describe('GET /users/:id', function () {
    it('should load a user', function (done) {
      var user = {name: 'fred', id: '123'};
      userMock.allowFindById(user);

      request(server.app).
        get('/users/' + user.id).
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.eql(user);
          done();
        });
    });

    it("should fail if the user doesn't exist", function (done) {
      userMock.allowFindById(null);

      request(server.app).
        get('/users/000000000000000000000000').
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(404);
          done();
        });
    });

    it("should fail if mongo is down", function (done) {
      userMock.failFindById();

      request(server.app).
        get('/users/000000000000000000000000').
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(500);
          done();
        });
    });
  });
});
