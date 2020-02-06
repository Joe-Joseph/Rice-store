module.exports = {
    "root": true,
    "extends": "airbnb-base",
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        "comma-dangle": 0,
        "import/no-unresolved": [2, { "commonjs": true }],
        "import/no-dynamic-require": 0,
        "no-undef": 0
    }
};