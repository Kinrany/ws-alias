const DSL = require('./dsl/rc-file');

module.exports = { build };

/**
 * Returns content for rc file
 *
 * @param {Function} fn
 * @return {String}
 */
function build(fn) {
  const dsl = new DSL();

  fn(dsl);

  return dsl.aliases.join('\n');
}
