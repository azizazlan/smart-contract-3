module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:prettier/recommended',
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project" : "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        'prettier'
    ],
    "rules": {
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 'off',
        'no-param-reassign': 0,
    }
}
