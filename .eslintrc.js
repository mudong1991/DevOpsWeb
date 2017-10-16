// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "semi": [1, "always"], // 句尾强制分号
    'indent': 0, // 单行缩进值
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 不能有未定义的变量
    "no-undef": 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-extend-native': 0,
    "space-before-function-paren": 0,
    'no-trailing-spaces': 0
  }
}
