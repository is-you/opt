module.exports = {
  'env': {
    'browser': true,
    'es2021': 'latest',
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'no-mixed-spaces-and-tabs': 0,
    'space-before-function-paren': 0,
    'skipBlankLines': 0,
    'linebreak-style': 0,
    'camelcase': 'off',
    'max-len': ['error', {'code': 120}],
    'indent': [0, 'tab'],
    'no-tabs': 0,
  },
};
