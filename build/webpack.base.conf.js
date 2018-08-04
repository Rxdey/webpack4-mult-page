const webpack = require('webpack');
const path = require('path');
const buildEntriesAndHTML = require('./mult')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}
const config = {
  entry: buildEntriesAndHTML.entries,
  output: {
    filename: 'js/[name].js',
    path: resolve('dist/static')
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
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...buildEntriesAndHTML.htmls,
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(less|css)$/,
        use: [
          'css-hot-loader', //支持热更新
          MiniCssExtractPlugin.loader,
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
