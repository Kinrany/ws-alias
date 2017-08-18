const should = require('should');
const helpers = require('../helpers');

const { asArray } = helpers;

describe('helpers', function() {
  it('should cast any to array', function() {
    should(asArray('test')).eql(['test']);
  });

  it('should cast array to array', function() {
    should(asArray(['test'])).eql(['test']);
  });
});
