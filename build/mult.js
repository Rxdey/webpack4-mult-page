const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function buildEntriesAndHTML() {
  // 用来构建entery
  const result = glob.sync('src/html/*.html');
  const config = {
    hash: true,
    inject: true
  };
  const entries = {};
  const htmls = [];
  result.forEach(item => {
    const page = path.parse(item);
    entries[page.name] = `./src/js/${page.name}.js`;
    htmls.push(
      new HtmlWebpackPlugin({
        ...config,
        filename: page.base,
        template: `./${page.dir}/${page.base}`,
        chunks: [page.name]
      })
    );
  });
  return {
    entries,
    htmls
  };
}
module.exports = buildEntriesAndHTML;
// buildEntriesAndHTML()
