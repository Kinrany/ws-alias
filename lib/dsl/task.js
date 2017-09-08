const _ = require('lodash');

const { reduce, forEach, castArray } = _;

module.exports = DSL;

/**
 * @param {String[]|String} name
 * @constructor
 */
function DSL(name) {
  this._name = name;
  this._info = [];
  this._commands = [];
}

/**
 * Add commands to list
 *
 * @param {String[]|String} command - command or array of commands
 */
DSL.prototype.command = function(command) {
  const { _commands: commands } = this;

  forEach(castArray(command), item => commands.push(item));
};

/**
 * Convert string to terminal display format
 *
 * @param {String} content
 */
DSL.prototype.info = function(content) {
  if (content && content.trim())
    this._info = reduce(content.split('\n'), processInfoLine, this._info);

  return this._info;
};

/**
 * Using by reduce
 *
 * @param {Array} result
 * @param {String} line
 * @return {Array}
 */
function processInfoLine(result, line) {
  line = line.trim();

  if (line) result.push(`echo "${line}"`);

  return result;
}

/**
 * Attach info and commands as aliases to base dsl object
 *
 * @param {Object} dsl
 */
DSL.prototype.attach = function(dsl) {
  const { _name: name, _commands: commands } = this;

  const infoAlias = dsl.conveyor([name, 'info'], this._info);

  dsl.conveyor(name, commands, infoAlias);
};
