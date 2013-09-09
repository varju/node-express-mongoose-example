function extendDeep(target, toCopy) {
  for (var name in toCopy) {
    if (typeof toCopy[name] === 'object') {
      target[name] = extendDeep(target[name], toCopy[name]);
    } else {
      target[name] = toCopy[name];
    }
  }
  return target;
}

/**
 * raw configuration properties, with local overrides
 */
exports.props = require('../config/config.json');
try {
  var configOverrides = require('../config/config_overrides.json');
  extendDeep(exports.props, configOverrides);
} catch (e) {
  // file probably doesn't exist
}

/**
 * turn on test mode, overriding certain properties
 */
exports.setTestMode = function () {
  var testOverrides = require('../config/config_test.json');
  extendDeep(exports.props, testOverrides);
};
