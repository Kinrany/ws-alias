const _ = require('lodash');
const RcFileDSL = require('./dsl/rc-file');

const { isFunction } = _;

module.exports = { build };

/**
 * Returns content for rc file
 *
 * @param {Object|Function} params
 * @param {Function} params.rcFile - rc file schema
 * @param {Function} params.tasks - tasks schema
 * @return {String}
 */
function build(params = {}) {
  if (isFunction(params))
    params = { rcFile: params };
  else if (!params) throw new Error('"params" is required');

  const { rcFile, tasks } = params;
  const dsl = new RcFileDSL();

  rcFile(dsl);
  if (tasks) tasks(dsl);

  return dsl.toString();
}
