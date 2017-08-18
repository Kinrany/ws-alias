const _ = require('lodash');
const rcFile = require('../alias');
const helpers = require('../../helpers');

const { asArray } = helpers;
const { getAlias } = rcFile;
const {
  flatten,
  forEach,
  cloneDeep,
} = _;

module.exports = DSL;

function DSL() {
  this.aliases = [];
}

/**
 * Add alias to list
 *
 * @param {String|Array} name
 * @param {String} command
 */
DSL.prototype.alias = function(name, command) {
  this.aliases.push(getAlias(name, command));
};

/**
 * Attach group name prefix to aliases name recursive and push them to root dsl
 *
 * @param {String|Array} groupName
 * @param {Function} fn
 */
DSL.prototype.aliasGroup = function(groupName, fn) {
  const dsl = new DSL();

  fn(dsl);

  forEach(dsl.aliases, alias => {
    alias = cloneDeep(alias);

    alias.name = flatten(asArray(groupName).concat(asArray(alias.name)));

    this.aliases.push(alias);
  });
};
