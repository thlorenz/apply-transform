'use strict';

var stream = require('stream');
var util = require('util');

var Readable = require('readable-stream').Readable;

module.exports = StringReadable

util.inherits(StringReadable, Readable);

function StringReadable(input, opts) {
  if (!(this instanceof StringReadable)) return new StringReadable(input, opts);

  opts = opts || {};
  
  Readable.call(this, opts);

  this.setEncoding('utf8');
  this.parts = input.split('');
  this.index = -1;
}

StringReadable.prototype._read = function () {
  var chunk = (this.index++) < this.parts.length ? this.parts[this.index] : null;
  this.push(chunk);
};
