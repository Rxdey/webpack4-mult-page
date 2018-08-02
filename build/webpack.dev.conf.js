const webpack = require('webpack');
const base = require('./webpack.base.conf');
const path = require('path');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const portfinder = require('portfinder');
let PORT = 8080;
function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

base['devtool'] = 'cheap-module-eval-source-map';
base['mode'] = 'development';
base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  })
);
base['devServer'] = {
  contentBase: resolve('dist'),
  compress: true,
  port: 8080,
  host: '127.0.0.1',
  inline: true,
  historyApiFallback: false,
  quiet: true,
  proxy: {}
  // setup: function(app) {}
};

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT;
  portfinder.getPort(function(err, port) {
    if (err) {
      reject(err);
    } else {
      PORT = port;
      base.devServer.port = port;
      base.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${ base.devServer.host }:${port}`
            ]
          }
        })
      );
      resolve(base);
    }
  });
});