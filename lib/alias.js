const shared = require('../shared');
const helpers = require('../helpers');

const { escapeQuotes } = helpers;
const { getName } = shared;

module.exports = { getAlias };

/**
 * Returns alias object
 *
 * @param {String[]|String} name
 * @param {String} command
 * @return {Object} - alias string
 */
function getAlias(name, command) {
  return { name, command, toString };
}

function toString() {
  const { command } = this;
  const name = getName(this.name);

  return `alias ${name}="${escapeQuotes(command)}"`;
}
