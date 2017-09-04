const _ = require('lodash');
const shared = require('../../shared');
const helpers = require('../../helpers');

const { reduce, forEach, castArray } = _;
const { getName } = shared;
const { escapeQuotes } = helpers;

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

const separator = ' && ';
const makeAlias =
    (name, command) => `alias ${getName(name)}="${escapeQuotes(command)}"`;

DSL.prototype.toString = function() {
  // TODO: передлать на переиспользование алиаса info
  // TODO: возможно стоит избавиться от отдельного DSL. Стоит сделать просто
  // метод в коревом DSL, который будет регистрировать два алиаса.
  // Переписать тесты в этом случае
  const { _name: name, _commands: commands } = this;
  const infoName = [name, 'info'];
  const info = this.info();
  const conveyor = commands.concat(info).join(separator);
  const infoConveyor = info.join(separator);

  const result = [makeAlias(name, conveyor)];

  if (this._info.length)
    result.push(`alias ${getName(infoName)}="${escapeQuotes(infoConveyor)}"`);

  return result.join('\n');
};
