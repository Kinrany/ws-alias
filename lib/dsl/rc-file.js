const _ = require('lodash');
const rcFile = require('../alias');
const TaskDSL = require('../dsl/task');
const shared = require('../../shared');

const { getName } = shared;
const { getAlias } = rcFile;
const {
  map,
  flatten,
  forEach,
  castArray,
  isObject,
} = _;

module.exports = DSL;

function DSL() {
  this.objects = [];
  this.groupName = null;
}

/**
 * Add alias to list
 *
 * @param {String[]|String} name
 * @param {String} command
 * @param {Object} options
 * @param {Boolean} options.skipAttachGroupName
 */
DSL.prototype.alias = function(name, command, options = {}) {
  const { groupName } = this;
  const { skipAttachGroupName } = options;

  if (groupName && !skipAttachGroupName)
    name = [groupName, name];

  const alias = getAlias(name, command);

  this.objects.push(alias);

  return alias;
};

/**
 * Add task to list
 *
 * @param {String[]|String} name
 * @param {Function} fn
 */
DSL.prototype.task = function(name, fn) {
  const { groupName } = this;

  if (groupName)
    name = [groupName, name];

  const dsl = new TaskDSL(name);

  fn(dsl);

  this.objects.push(dsl);
};

/**
 * Attach group name prefix to objects name recursive and push them to root dsl
 *
 * @param {String[]|String} groupName
 * @param {Function} fn
 */
DSL.prototype.group = function(groupName, fn) {
  const baseGroupName = this.groupName;
  const dsl = new DSL();

  if (baseGroupName)
    groupName = [baseGroupName, groupName];

  dsl.groupName = groupName;
  
  fn(dsl);

  forEach(dsl.objects, object => this.objects.push(object));
};

/**
 * Use another alias as prefix on name and command
 *
 * @param {Object} alias - alias object for dsl
 * @param {String[]|String} name - postfix for base alias bane
 * @param {String} command - insert base alias name before command
 */
DSL.prototype.useAlias = function(alias, name, command) {
  const baseName = alias.name;
  const options = { skipAttachGroupName: true };

  command = `${getName(baseName)} ${command}`;
  name = [baseName, name];

  return this.alias(name, command, options);
};

/**
 * TODO: написать описание
 *
 * @param {String[]|String} name
 * @param {Object[]|String[]} commands
 */
DSL.prototype.conveyor = function(name, ...commands) {
  commands = flatten(commands);

  // FIXME: гдето это уже было (join по separator "&&")
  const items = map(commands,
    command => isObject(command) ? getName(command.name) : command);

  this.alias(name, items.join(' && '));
};

DSL.prototype.toString = function() {
  return map(this.objects, object => object.toString()).join('\n');
};
