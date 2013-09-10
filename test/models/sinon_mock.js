/* global beforeEach,afterEach */

'use strict';

var sinon = require('sinon');

exports.SinonMock = (function () {
  function SinonMock(modelToMock) {
    var sandbox;
    var prototypeMock;
    var classMock;

    /**
     * replace the model with a mock implementation
     */
    this.register = function () {
      beforeEach(function () {
        sandbox = sinon.sandbox.create();

        prototypeMock = sandbox.mock(modelToMock.prototype);
        classMock = sandbox.mock(modelToMock);
      });

      afterEach(function () {
        prototypeMock.verify();
        classMock.verify();

        sandbox.restore();
      });
    };

    /*
     * mocks
     */

    this.allowValidate = function () {
      prototypeMock.expects('validate').once().callsArgAsync(0);
    };

    this.failValidate = function (errorBody) {
      prototypeMock.expects('validate').once().callsArgWithAsync(0, errorBody);
    };

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

  return SinonMock;
})();
