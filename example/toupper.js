'use strict';

var applyTransform = require('../')
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
  console.log('Success!');
})  
