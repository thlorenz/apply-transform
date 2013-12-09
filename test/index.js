'use strict';

var test           =  require('tap').test
  , through        =  require('through2')
  , applyTransform =  require('../')

function toUpper() {
  return through(
    function (chunk, enc, cb) {
      this.push(chunk.toUpperCase());
      cb();
    }
  )
}

function toUpperAsync() {
  return through(
    function (chunk, enc, cb) {
      this.push(chunk.toUpperCase());
      setTimeout(cb, 5);
    }
  )
}

function toUpperError() {
  return through(
    function (chunk, enc, cb) {
      cb(new Error('BAM!'));
    }
  )
}

test('\napplying sync toUpper transform', function (t) {
  var tx = toUpper();
  tx._writableState.decodeStrings = false;

  applyTransform(tx, 'hello world', function (err, res) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(res, 'HELLO WORLD', 'calls back with transformed result')
    t.end()
  })  
})

test('\napplying async toUpper transform', function (t) {
  var tx = toUpperAsync();
  tx._writableState.decodeStrings = false;

  applyTransform(tx, 'hello world', function (err, res) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(res, 'HELLO WORLD', 'calls back with transformed result')
    t.end()
  })  
})

test('\napplying malfunctioning toUpper transform', function (t) {
  var tx = toUpperError();
  tx._writableState.decodeStrings = false;

  applyTransform(tx, 'hello world', function (err, res) {
    t.equal(err.message, 'BAM!', 'calls back with error')
    t.end()
  })  
})
