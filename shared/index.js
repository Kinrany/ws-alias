const _ = require('lodash');

const {
  map,
  isArray,
  upperFirst,
  lowerFirst
} = _;

module.exports = { getName };

/**
 * Returns alias name. Convert to string if array given.
 *
 * @param {Array|String} words
 * @return {String}
 */
function getName(words) {
  if (!isArray(words)) return words;

  const upperFirstWords = map(words, upperFirst);

  return lowerFirst(upperFirstWords.join(''));
}

