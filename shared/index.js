const _ = require('lodash');

const { map, isArray, capitalize } = _;

module.exports = { getName };

/**
 * Returns alias name. Convert to string if array given.
 *
 * @param {Array|String} words
 * @return {String}
 */
function getName(words) {
  if (!isArray(words)) return words;

  return words[0] + map(words.splice(1), capitalize).join('');
}

