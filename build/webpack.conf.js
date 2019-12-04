const base = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, '../', dir);
}
base.devtool = '#source-map';
base.mode = 'production';
base.plugins.unshift(
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')], // 删除指定目录
    verbose: true, //开启在控制台输出信息
    dry: false //启用删除文件
  }),
)
base.plugins.push(
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: './css/[name].[hash].css',
    chunkFilename: './css/[id].[hash].css'
  })
);
base.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

base.module.rules.push({
  test: /\.(less|css)$/,
  use: [
    'css-hot-loader', //支持热更新
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    // MiniCssExtractPlugin.loader,
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
module.exports = base;
