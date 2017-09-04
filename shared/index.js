const _ = require('lodash');

const {
  map,
  isArray,
  upperFirst,
  lowerFirst,
  flattenDeep,
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

  // TODO: найти все имена и везде убрать развертывание массива (аля flatten)
  words = flattenDeep(words);

  const upperFirstWords = map(words, upperFirst);

  return lowerFirst(upperFirstWords.join(''));
}

