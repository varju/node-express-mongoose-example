/* jshint expr:true */
/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

require('../../app/config').setTestMode();
var server = require('../../app/server');

describe('users controller', function () {
  describe('POST /users', function () {
    it('should say hello', function (done) {
      request(server.app).
        post('/users').
        send({ name: 'my user' }).
        expect('Content-Type', /json/).
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
        expect(400).
        expect('Content-Type', /json/).
        end(function (err, res) {
          should.ifError(err);
          res.body.should.have.property('error');
          res.body.error.name.should.eql('ValidationError');
          res.body.error.errors.should.have.property('name');
          done();
        });
    });
  });
});
