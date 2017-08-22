const _ = require('lodash');
const RcFileDSL = require('./dsl/rc-file');

const { isFunction } = _;

module.exports = { build };

/**
 * Returns content for rc file
 *
 * @param {Object|Function} params
 * @param {Function} params.rcFile
 * @return {String}
 */
function build(params = {}) {
  if (isFunction(params))
    params = { rcFile: params };

  const { rcFile } = params;
  const rcFileDSL = new RcFileDSL();

  rcFile(rcFileDSL);

  return rcFileDSL.toString();
}
