const _ = require('lodash');
const rcFile = require('../alias');
const TaskDSL = require('../dsl/task');
const shared = require('../../shared');

const { getName } = shared;
const { getAlias } = rcFile;
const {
  map,
  reduce,
  flatten,
  forEach,
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
 * Add task
 *
 * @param {String[]|String} name
 * @param {Function} fn
 */
DSL.prototype.task = function(name, fn) {
  const dsl = new TaskDSL(name);

  fn(dsl);

  dsl.attach(this);
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
 * Returns alias using another aliases or string commands as bash conveyor
 *
 * @param {String[]|String} name
 * @param {Object[]|String[]} commands
 */
DSL.prototype.conveyor = function(name, ...commands) {
  commands = flatten(commands);

  const items = reduce(commands, (result, command) => {
    if (!command) return result;

    result.push(isObject(command) ? getName(command.name) : command);

    return result;
  }, []);

  if (!items.length) return;

  return this.alias(name, items.join(' && '));
};

DSL.prototype.toString = function() {
  return map(this.objects, object => object.toString()).join('\n');
};
