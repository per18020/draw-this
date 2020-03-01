module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended" // prettier needs to go last in array to override other configs
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "default-case": 2,
    "interface-name": 0,
    "object-literal-sort-keys": 0,
    "ordered-imports": 0,
    "quotemark": 0,
    "no-console": 0,
    "no-unused-variable": { "severity": "warning" },
    "no-undef": 0,
    "no-var": 2,
    "react/button-has-type": 2,
    "react/destructuring-assignment": [2, "always"],
    "react/no-deprecated": 2,
    "react/no-unsafe": 2,
    "react/no-unused-state": 2,
    "react/jsx-pascal-case": 2,
    "@typescript-eslint/indent": [2, 2],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.7", // React version. "detect" automatically picks the version you have installed.
    },
  }
};
