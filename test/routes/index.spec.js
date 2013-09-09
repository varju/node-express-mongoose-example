/* global describe,it */

'use strict';

var should = require('should');
var request = require('supertest');

require('../../app/config').setTestMode();
var server = require('../../app/server');

describe('root controller', function () {
  describe('/ endpoint', function () {
    it('should say hello', function (done) {
      request(server.app).get('/').
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
