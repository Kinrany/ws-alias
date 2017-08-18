const _ = require('lodash');

const { map, isArray, capitalize } = _;

module.exports = {
  getAlias,
  getAliasName
};

/**
 * Returns alias object
 *
 * @param {Array|String} name
 * @param {String} command
 * @return {Object} - alias string
 */
function getAlias(name, command) {
  command = command
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\\'');

  return { name, command, toString };
}

function toString() {
  const { command } = this;
  const name = getAliasName(this.name);

  return `alias ${name}="${command}"`;
}

/**
 * Returns alias name. Convert to string if array given.
 *
 * @param {Array|String} words
 * @return {String}
 */
function getAliasName(words) {
  if (!isArray(words)) return words;

  return words[0] + map(words.splice(1), capitalize).join('');
}
