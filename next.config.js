const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  webpack: (config, { isServer }) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    // Add the fallback for crypto
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify")
    };

    // Add the openssl legacy provider for Node.js 17+ compatibility
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider')
      })
    );

    return config;
  }
};
