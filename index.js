'use strict';

var stringReadable = require('./string-readable')

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
var go = module.exports = function (transform, input, cb) {
  var output = '';
  transform
    .on('data', function (d) { output += d })
    .on('error', cb)
    .on('end', function () { cb(null, output) });

  stringReadable(input).pipe(transform);

  return stringReadable;
};
