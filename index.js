'use strict';

var ansiRegex = require('ansi-regex');
var sliceAnsi = require('slice-ansi');
var stringWidth = require('string-width');

var endRegex = new RegExp('(?=(' + ansiRegex().source + ')*$)');

module.exports = process.stdout && process.stdout.isTTY ? function ttyTruncate(str) {
  var cols = process.stdout.columns;

  if (typeof str !== 'string') {
    throw new TypeError(
      'Expected a string to truncate to the current text terminal width (' +
      cols +
      '), but got ' +
      str +
      '.'
    );
  }

  var len = stringWidth(str);

  if (len <= cols) {
    return str;
  }

  return sliceAnsi(str, 0, cols - 1).replace(endRegex, '…');
} : function unsupported() {
  throw new Error('tty-truncate doesn\'t support non-TTY environments.');
};
