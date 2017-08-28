const should = require('should');
const shared = require('../shared');

const { getName } = shared;

describe('shared', function() {
  it('should get name', function() {
    should(getName('myName')).eql('myName');
  });

  it('should get name from array', function() {
    should(getName(['my','secondName'])).eql('mySecondName');
  });
});
