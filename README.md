## Usage

```bash
npm run ws-alias -s ./path/to/schema.js -o ./path/to/aliases.sh
```

This schema:
```js
module.exports = function(s) {
  s.alias('echo1', 'echo 1');
  s.alias('echo2', 'echo 2');

  s.group('echo', function(g) {
    g.alias('3', 'echo 3')
  });

  const alias = s.alias('foo', 'echo foo');

  s.conveyor('conveyor', [alias, 'echo bar']);
};
```

Will build aliases:
```bash
alias echo1="echo 1"
alias echo2="echo 2"
alias echo3="echo 3"
alias foo="echo foo"
alias conveyor="foo && echo bar"
```
