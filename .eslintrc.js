module.exports = {
    "plugins": ["filenames"],
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": 1,
        "filenames/match-exported": 2,
        "no-trailing-spaces": 1,
        "linebreak-style": 0,
        "prefer-destructuring": ["error", {
            "array": false,
            "object": true
        }, {
            "enforceForRenamedProperties": false
        }],
        "indent": [
            "error",
            "tab",
            {
                "SwitchCase": 1,
                "ignoreComments": true
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
