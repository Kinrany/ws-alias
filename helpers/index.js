const _ = require('lodash');

const { isArray } = _;

const asArray = item => isArray(item) ? item : [item];

module.exports = { asArray };
