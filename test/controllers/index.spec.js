/* jshint expr:true */
/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

var server = require('../../app/server');

describe('root controller', function () {
  describe('GET /', function () {
    it('should list all the routes', function (done) {
      request(server.app).
        get('/').
        end(function (err, res) {
          should.ifError(err);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('routes');
          var routes = res.body.routes;
          routes.should.include('GET /');
          routes.should.include('GET /users/:id');
          routes.should.include('POST /users');
          done();
        });
    });
  });
});
