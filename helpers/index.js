const _ = require('lodash');

const { map, filter, isArray } = _;

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
 * FIXME: should be prepared by single regexp
 *
 * @param {String} content
 * @return {String}
 */
function trimForBash(content) {
  const lines = map(content.split('\n'), line => line.trim());

  return filter(lines, line => !!line).join('\n');
}
