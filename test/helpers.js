const should = require('should');
const helpers = require('../helpers');

const {
  asArray,
  trimForBash,
  escapeQuotes,
} = helpers;

describe('helpers', function() {
  it('should cast any to array', function() {
    should(asArray('test')).eql(['test']);
  });

  it('should cast array to array', function() {
    should(asArray(['test'])).eql(['test']);
  });

  it('should escape quotes', function() {
    should(escapeQuotes('echo \'123\'')).eql('echo \\\'123\\\'');
  });

  it('should escape double quotes', function() {
    should(escapeQuotes('echo "123"')).eql('echo \\"123\\"');
  });

  it('should trim for bash', function() {
    const assertion = trimForBash(`
      
      echo 123
      
      
      echo 321
      
    `);
    const expected = ['echo 123', 'echo 321'].join('\n');

    should(assertion).eql(expected);
  });
});
