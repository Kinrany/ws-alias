const _ = require('lodash');
const RcFileDSL = require('./dsl/rc-file');

const { isFunction } = _;

module.exports = { build };

/**
 * Returns content for rc file
 *
 * @param {Object|Function} params
 * @param {Function} params.schema - rc file schema
 * @return {String}
 */
function build(params = {}) {
  if (isFunction(params))
    params = { schema: params };
  else if (!params) throw new Error('"params" is required');

  const { schema } = params;
  const dsl = new RcFileDSL();

  schema(dsl);

  return dsl.toString();
}
