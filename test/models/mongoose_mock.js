/* global beforeEach,afterEach */

'use strict';

var sinon = require('sinon');
var mongoose = require('mongoose');

exports.MongooseMock = (function () {
  function MongooseMock(modelToMock) {
    var sandbox;
    var instanceMock;
    var classMock;

    /**
     * replace the model with a mock implementation
     */
    this.register = function () {
      beforeEach(function () {
        sandbox = sinon.sandbox.create();

        instanceMock = sandbox.mock(modelToMock.prototype);
        classMock = sandbox.mock(modelToMock);
      });

      afterEach(function () {
        instanceMock.verify();
        classMock.verify();

        sandbox.restore();
      });
    };

    /*
     * instance mocks
     */

    this.allowValidate = function () {
      instanceMock.expects('validate').once().callsArgAsync(0);
    };

    this.failValidate = function () {
      var error = new mongoose.Error.ValidationError({});
      error.errors = { mock: new mongoose.Error.ValidatorError('mockpath', 'mockerr') };
      instanceMock.expects('validate').once().callsArgWithAsync(0, error);
    };

    /*
     * class mocks
     */

    this.allowCreate = function (result) {
      classMock.expects('create').once().callsArgWithAsync(1, null, result);
    };

    this.allowFindById = function (result) {
      classMock.expects('findById').once().callsArgWithAsync(1, null, result);
    };

    this.failFindById = function () {
      classMock.expects('findById').callsArgWithAsync(1, new Error('not found'));
    };
  }

  return MongooseMock;
})();
