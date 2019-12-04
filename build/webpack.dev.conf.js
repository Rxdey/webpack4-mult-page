const webpack = require('webpack');
const path = require('path');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const portfinder = require('portfinder');
const base = require('./webpack.base.conf');

let PORT = 8080;
function resolve (dir) {
  return path.join(__dirname, '../', dir);
}

base.devtool = 'cheap-module-eval-source-map';
base.mode = 'development';
base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: './css/[name].[hash].css',
    chunkFilename: './css/[id].[hash].css'
  })
);
base.devServer = {
  contentBase: resolve('dist'),
  compress: true,
  port: 8080,
  host: '127.0.0.1',
  inline: true,
  historyApiFallback: false,
  quiet: true,
  // publicPath: '/',
  proxy: {}
  // setup: function(app) {}
};
base.module.rules.push({
  test: /\.(less|css)$/,
  use: [
    'css-hot-loader', // 支持热更新
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: 'css-loader',
      options: { modules: false }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: resolve('postcss.config.js')
        }
      }
    },
    {
      loader: 'less-loader',
      options: { javascriptEnabled: true }
    }
  ]
});
module.exports = new Promise((res, reject) => {
  portfinder.basePort = PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      PORT = port;
      base.devServer.port = port;
      base.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${base.devServer.host}:${port}`
            ]
          }
        })
      );
      res(base);
    }
  });
});
