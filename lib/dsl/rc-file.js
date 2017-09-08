const _ = require('lodash');
const rcFile = require('../alias');
const TaskDSL = require('../dsl/task');
const helpers = require('../../helpers');

const { getAlias } = rcFile;
const {
  map,
  flatten,
  forEach,
  castArray,
  cloneDeep,
} = _;

module.exports = DSL;

function DSL() {
  this.objects = [];
}

/**
 * Add alias to list
 *
 * @param {String[]|String} name
 * @param {String} command
 */
DSL.prototype.alias = function(name, command) {
  // FIXME: Should make alias DSL
  this.objects.push(getAlias(name, command));
};

/**
 * Add task to list
 *
 * @param {String[]|String} name
 * @param {Function} fn
 */
DSL.prototype.task = function(name, fn) {
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
  const dsl = new DSL();

  groupName = castArray(groupName);
  fn(dsl);

  forEach(dsl.objects, object => {
    object = cloneDeep(object);

    object.name = flatten([groupName, object.name]);

    this.objects.push(object);
  });
};

DSL.prototype.toString = function() {
  return map(this.objects, object => object.toString()).join('\n');
};
