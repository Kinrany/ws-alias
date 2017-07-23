const _ = require('lodash');

const { map, isArray, capitalize } = _;

const aliasName = words => words[0] + map(words.splice(1), capitalize).join('');

module.exports = {
  getAlias
};

/**
 * Returns alias string
 *
 * @param {Array|String} name
 * @param {String} command
 * @return {String} - alias string
 */
function getAlias(name, command) {
  if (isArray(name)) name = aliasName(name);

  command = command.replace(/"/g, '\\"');

  return `alias ${name}="${command}"`;
}
