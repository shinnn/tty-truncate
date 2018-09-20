'use strict';

const {execFile} = require('child_process');
const {promisify} = require('util');

const stringWidth = require('string-width');
const ttyTruncate = require('.');
const test = require('tape');

test('ttyTruncate()', t => {
	const columns = process.stdout.columns;
	const fixture = 'aBc';
	const fixtureWidth = stringWidth(fixture);

	t.equal(
		ttyTruncate(fixture.repeat(100)),
		`${fixture.repeat(Math.floor(columns / fixtureWidth)) +
    fixture.substr(0, columns % fixtureWidth - 1)
		}…`,
		'should truncate a string to the terminal width.'
	);

	t.equal(
		ttyTruncate(''),
		'',
		'should not truncate a string when it is short enough.'
	);

	t.throws(
		() => ttyTruncate('a\n\rb'),
		/^Error.*tty-truncate doesn't support string with newline, but got 'a\\n\\rb'\./u,
		'should throw an error when it takes a multiline string.'
	);

	t.throws(
		() => ttyTruncate(Infinity),
		/^TypeError.*Expected a string to truncate to the current text terminal width, but got Infinity \(number\)\./u,
		'should throw an error when it takes a non-string argument.'
	);

	t.throws(
		() => ttyTruncate(),
		/^RangeError.*Expected 1 argument \(<string>\), but got no arguments\./u,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => ttyTruncate('1', '2'),
		/^RangeError.*Expected 1 argument \(<string>\), but got 2 arguments\./u,
		'should throw an error when it takes too many arguments.'
	);

	t.end();
});

test('ttyTruncate() on a non-TTY environment', async t => {
	try {
		await promisify(execFile)('node', [__filename], {shell: process.platform === 'win32'});
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.ok(
			message.includes('tty-truncate doesn\'t support non-TTY environments.'),
			'should throw an error.'
		);
	}

	t.end();
});
