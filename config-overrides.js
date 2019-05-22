module.exports = function override(config, env) {
  if (env === 'production') {
    config.devtool = false;
  }
  return config;
};
