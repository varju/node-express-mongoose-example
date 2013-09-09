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

exports.props = require('./config.json');
try {
  var configOverrides = require('./config_overrides.json');
  exports.props = extendDeep(exports.props, configOverrides);
} catch (e) {
  // file probably doesn't exist
}
