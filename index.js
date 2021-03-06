'use strict';

const {inspect} = require('util');

const ansiRegex = require('ansi-regex');
const inspectWithKind = require('inspect-with-kind');
const sliceAnsi = require('slice-ansi');
const stringWidth = require('string-width');

const endRegex = new RegExp(`(?=(?:${ansiRegex().source})*$)`, 'u');

module.exports = process.stdout && process.stdout.isTTY ? function ttyTruncate(...args) {
	const argLen = args.length;

	if (argLen !== 1) {
		throw new RangeError(`Expected 1 argument (<string>), but got ${argLen || 'no'} arguments.`);
	}

	const [str] = args;

	if (typeof str !== 'string') {
		throw new TypeError(`Expected a string to truncate to the current text terminal width, but got ${
			inspectWithKind(str)
		}.`);
	}

	if (str.includes('\n')) {
		throw new Error(`tty-truncate doesn't support string with newline, but got ${inspect(str)}.`);
	}

	const {columns} = process.stdout;

	if (columns === 0) {
		return '';
	}

	if (stringWidth(str) <= columns) {
		return str;
	}

	if (columns === 1) {
		return sliceAnsi(str, 0, 1) || '…';
	}

	return sliceAnsi(str, 0, columns - 1).replace(endRegex, '…');
} : function unsupported() {
	throw new Error('tty-truncate doesn\'t support non-TTY environments.');
};
