module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  plugins: ['import', 'prettier'],
  globals: {
    fetch: false,
    __DEV__: false,
  },
  rules: {
    'prettier/prettier': 'error',

    'no-use-before-define': 'off', // styles

    'react/jsx-filename-extension': 'off',
    'react/prop-types': ['warn', { skipUndeclared: true }],

    'import/prefer-default-export': 'off',
  },
};
