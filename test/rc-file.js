const _ = require('lodash');
const should = require('should');
const alias = require('../lib/alias');
const rcFile = require('../lib/rc-file');

const { isArray } = _;
const { getAlias } = alias;
const { build } = rcFile;

describe('rc-file', function() {
  beforeEach(function() {
    should.use(assertions);
  });

  describe('alias', function() {
    it('should generate alias', function() {
      should({ name: 'testAlias', command: 'echo 123' })
        .alias('alias testAlias="echo 123"');
    });

    it('should join name', function() {
      should({ name: ['test', 'alias'], command: 'echo 123' })
        .alias('alias testAlias="echo 123"');
    });

    it('should escape quotes', function() {
      should({ name: ['test', 'alias'], command: 'echo \'123\'' })
        .alias('alias testAlias="echo \\\'123\\\'"');
    });

    it('should escape double quotes', function() {
      should({ name: ['test', 'alias'], command: 'echo "123"' })
        .alias('alias testAlias="echo \\"123\\""');
    });
  });

  describe('DSL', function() {
    it('should build aliases set', function() {
      should(rc => {
        rc.alias('alias1', 'echo alias1');
        rc.alias('alias2', 'echo alias2');
        rc.alias('alias3', 'echo alias3');
      }).build([
        'alias alias1="echo alias1"',
        'alias alias2="echo alias2"',
        'alias alias3="echo alias3"',
      ]);
    });

    it('should build group of alias', function() {
      should(rc => {
        rc.alias('noGrouped', 'alias');
        rc.aliasGroup('grouped', rc => {
          rc.alias('first', 'alias1');
          rc.alias('second', 'alias2');
        });
      }).build([
        'alias noGrouped="alias"',
        'alias groupedFirst="alias1"',
        'alias groupedSecond="alias2"',
      ]);
    });

    it('should build group recursive', function() {
      should(rc => {
        rc.aliasGroup('first', rc => {
          rc.alias('alias1', 'alias1');

          rc.aliasGroup('second', rc => {
            rc.alias('alias2', 'alias2');
            rc.alias('alias3', 'alias3');

            rc.aliasGroup('third', rc => {
              rc.alias('alias4', 'alias4');
              rc.alias('alias5', 'alias5');
            });
          });
        });
      }).build([
        'alias firstAlias1="alias1"',
        'alias firstSecondAlias2="alias2"',
        'alias firstSecondAlias3="alias3"',
        'alias firstSecondThirdAlias4="alias4"',
        'alias firstSecondThirdAlias5="alias5"',
      ]);
    });

    it('should build group with array of words in name', function() {
      should(rc => rc.aliasGroup(['first', 'second'],
        rc => rc.alias('third', 'alias'))
      ).build('alias firstSecondThird="alias"');
    });
  });
});

function assertions(should, Assertion) {
  Assertion.add('alias', function(expected) {
    const { name, command } = this.obj;
    const assertion = getAlias(name, command).toString();

    should(assertion).equal(expected);
  });

  Assertion.add('build', function(expected) {
    const assertion = build(this.obj);

    if (isArray(expected)) expected = expected.join('\n');

    should(assertion).equal(expected);
  });
}
