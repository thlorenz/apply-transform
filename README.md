# apply-transform [![build status](https://secure.travis-ci.org/thlorenz/apply-transform.png)](http://travis-ci.org/thlorenz/apply-transform)

[![testling badge](https://ci.testling.com/thlorenz/apply-transform.png)](https://ci.testling.com/thlorenz/apply-transform)

Applies a transform to an input string and calls back with result, mostly useful for testing transforms

```js
var applyTransform = require('apply-transform')
  , assert = require('assert')
  , through = require('through2');

function toUpper() {
  return through(
    function (chunk, enc, cb) {
      this.push(chunk.toUpperCase());
      cb();
    }
  )
}

var tx = toUpper();
tx._writableState.decodeStrings = false;

applyTransform(tx, 'hello world', function (err, res) {
  if (err) return assert.fail(err); 
  assert.equal(res, 'HELLO WORLD', 'calls back with transformed result')
})  
```

## Installation

    npm install apply-transform

## API

```
/**
 * Applies the given transform to the input and calls back with result.
 * 
 * @name 
 * @function
 * @param {TransformStream} transform to apply to the @see input
 * @param {String} input to transform
 * @param {Function} cb function(err, output) { }
 *  - {Error} err: is set if an error occurred
 *  - {String} output: the result of applying the @see transform to the @see input
 * @return {ReadableStream} that streams the input string char by char, useful for debugging failing transforms
 */
```

## License

MIT
