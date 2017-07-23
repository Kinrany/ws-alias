const should = require('should');
const rcFile = require('../lib/rc-file');

const { getAlias } = rcFile;

describe('rc-file', function() {
  describe('alias', function() {
    beforeEach(function() {
      should.use(alias);
    });

    it('should generate alias', function() {
      should({ name: 'testAlias', command: 'echo 123' })
        .alias('alias testAlias="echo 123"');
    });

    it('should join name', function() {
      should({ name: ['test', 'alias'], command: 'echo 123' })
        .alias('alias testAlias="echo 123"');
    });

    it('should escape quote', function() {
      should({ name: ['test', 'alias'], command: 'echo "123"' })
        .alias('alias testAlias="echo \\"123\\""');
    });
  });
});

function alias(should, Assertion) {
  Assertion.add('alias', function(expected) {
    const { name, command } = this.obj;
    const alias = getAlias(name, command);

    should(alias).equal(expected);
  });
}
