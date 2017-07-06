'use strict';

const inspect = require('util').inspect;

const ansiRegex = require('ansi-regex');
const inspectWithKind = require('inspect-with-kind');
const sliceAnsi = require('slice-ansi');
const stringWidth = require('string-width');

const endRegex = new RegExp(`(?=(${ansiRegex().source})*$)`);

module.exports = process.stdout && process.stdout.isTTY ? function ttyTruncate(str) {
  const cols = process.stdout.columns;

  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string to truncate to the current text terminal width (${cols}), but got ${
      inspectWithKind(str)
    }.`);
  }

  if (str.indexOf('\n') !== -1) {
    throw new Error(`tty-truncate doesn't support string with newline, but got ${inspect(str)}.`);
  }

  const len = stringWidth(str);

  if (len <= cols) {
    return str;
  }

  return sliceAnsi(str, 0, cols - 1).replace(endRegex, '…');
} : function unsupported() {
  throw new Error('tty-truncate doesn\'t support non-TTY environments.');
};
