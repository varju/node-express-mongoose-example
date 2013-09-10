/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

var server = require('../../app/server');

describe('root controller', function () {
  describe('GET /', function () {
    it('should say hello', function (done) {
      request(server.app).
        get('/').
        expect(200).
        expect('Content-Type', /json/).
        expect({ hello: 'world' }).
        end(function (err) {
          should.ifError(err);
          done();
        });
    });
  });
});
