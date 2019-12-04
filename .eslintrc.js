module.exports = {
  root: true, // 作用的目录是根目录
  parserOptions: {
    sourceType: 'module' // 按照模块的方式解析
  },
  extends: [
    'airbnb'
  ],
  plugins: [
    'html' // 使用eslint-plugin-html
  ],
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true, //
    es6: true
  },
  rules: {
    'space-before-function-paren': 0,
    'indent': ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'comma-dangle': [1, 'never'],
    'max-len': 0, //字符串最大长度
    'import/no-cycle': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-unused-vars': 0,
  },
  parser: 'babel-eslint',
}