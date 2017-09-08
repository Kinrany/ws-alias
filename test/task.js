const _ = require('lodash');
const should = require('should');
const helpers = require('../helpers');
const TaskDSL = require('../lib/dsl/task');

const { reduce, isObject, castArray } = _;
const { escapeQuotes } = helpers;

describe('task', function() {
  beforeEach(function() {
    should.use(assertions);
  });

  describe('DSL', function() {
    describe('task', function() {
      it('should build task', function() {
        should({
          name: 'task',
          fn: t => t.command('echo "123"')
        }).task({ name: 'task', commands: ['echo \"123\"'] });
      });

      it('should build task with array of commands', function() {
        should({
          name: 'task',
          fn: t => t.command([
            'echo 123',
            'echo 321',
          ])
        }).task({
          name: 'task',
          commands: [
            'echo 123',
            'echo 321',
          ]
        });
      });

      it('should build task with info', function() {
        should({
          name: 'task',
          fn: t => {
            t.command('echo 123');
            t.info(`
              some info
              some more info
            `);
          },
        }).task([
          { name: 'task', commands: [
            'echo 123',
            'echo \"some info\"',
            'echo \"some more info\"'
          ] },
          { name: 'taskInfo', commands: [
            'echo \"some info\"',
            'echo \"some more info\"'
          ] },
        ]);
      });
    });
  });
});

function assertions(should, Assertion) {
  Assertion.add('task', function(expected) {
    const { name, fn } = this.obj;
    const dsl = new TaskDSL(name);

    fn(dsl);

    const assertion = dsl.toString();

    expected = reduce(castArray(expected), (result, item) => {
      if (isObject(item)) {
        const { name, commands } = item;
        const conveyor = escapeQuotes(commands.join(' && '));

        result.push(`alias ${name}="${conveyor}"`);
      }

      return result;
    }, []).join('\n');

    should(assertion).equal(expected);
  });
}
