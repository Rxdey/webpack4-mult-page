const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildEntriesAndHTML = require('./mult')();

function resolve (dir) {
  return path.join(__dirname, '../', dir);
}
const config = {
  entry: buildEntriesAndHTML.entries,
  output: {
    filename: 'js/[name].js',
    path: resolve('dist')
    // publicPath:''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  externals: {
    jquery: 'window.$'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...buildEntriesAndHTML.htmls,
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: 'static',
      ignore: ['.*']
    }])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      // loader: 'babel-loader',
      use: [
        { loader: 'eslint-loader' },
        { loader: 'babel-loader' }
      ],
      enforce: 'pre',
      exclude: /node_modules/,
      include: [
        resolve('src'),
        resolve('test'),
        resolve('node_modules/webpack-dev-server/client')
      ],
      options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        // eslint-disable-next-line global-require
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      }
    },
    {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
    ]
  }
};
module.exports = config;
