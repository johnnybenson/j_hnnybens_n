module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'global-require': 'off',
    'quotes': ['error', 'single']
  },
  globals: {
  },
};
