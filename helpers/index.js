const _ = require('lodash');

const { isArray } = _;

const asArray = item => isArray(item) ? item : [item];

module.exports = {
  asArray,
  trimForBash,
  escapeQuotes,
};

/**
 * Returns string with escaped quotes for bash `echo`
 *
 * @param {String} content
 * @return {String}
 */
function escapeQuotes(content) {
  return content
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\\'');
}

/**
 * Split content by lines and trim all lines for bash
 *
 * @param {String} content
 * @return {String}
 */
function trimForBash(content) {
  return content.replace(/\n(\s*\n*\s*)+/g, '\n').trim();
}
