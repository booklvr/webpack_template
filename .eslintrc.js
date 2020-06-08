module.exports = {
    "plugins": [ "node", "standard", "promise", "import" ],
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:promise/recommended",
        "plugin:import/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
    },
    "rules": {
        // "node/exports-style": ["error", "module.exports"],
        // "node/file-extension-in-import": ["error", "always"],
        // "node/prefer-global/buffer": ["error", "always"],
        // "node/prefer-global/console": ["error", "always"],
        // "node/prefer-global/process": ["error", "always"],
        // "node/prefer-global/url-search-params": ["error", "always"],
        // "node/prefer-global/url": ["error", "always"],
        // "node/prefer-promises/dns": "error",
        // "node/prefer-promises/fs": "error",
        'standard/object-curly-even-spacing': [2, "either"],
        'standard/array-bracket-even-spacing': [2, "either"],
        'standard/computed-property-even-spacing': [2, "even"],
        'standard/no-callback-literal': [2, ["cb", "callback"]]
    },
    "parser": "babel-eslint"
};