module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "linebreak-style": 0,
    "object-curly-spacing": 0,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
