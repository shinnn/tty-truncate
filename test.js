'use strict';

const execa = require('execa');
const stringWidth = require('string-width');
const ttyTruncate = require('.');
const test = require('tape');

test('ttyTruncate()', t => {
  const columns = process.stdout.columns;
  const fixture = 'aBc';
  const fixtureWidth = stringWidth(fixture);

  t.equal(
    ttyTruncate(fixture.repeat(100)),
    fixture.repeat(Math.floor(columns / fixtureWidth)) +
    fixture.substr(0, columns % fixtureWidth - 1) +
    '…',
    'should truncate a string to the terminal width.'
  );

  t.equal(
    ttyTruncate(''),
    '',
    'should not truncate a string when it is short enough.'
  );

  t.throws(
    () => ttyTruncate('a\n\rb'),
    /^Error.*tty-truncate doesn't support string with newline, but got 'a\\n\\rb'\./,
    'should throw an error when it takes a multiline string.'
  );

  t.throws(
    () => ttyTruncate(Infinity),
    /^TypeError.*Expected a string to truncate to the current text terminal width \(\d+\), but got Infinity \(number\)\./,
    'should throw an error when it takes a non-string argument.'
  );

  t.throws(
    () => ttyTruncate(),
    /^TypeError.*Expected a string to truncate to the current text terminal width \(\d+\), but got undefined\./,
    'should throw an error when it takes no arguments.'
  );

  t.end();
});

test('ttyTruncate() on a non-TTY environment', async t => {
  try {
    await execa('node', [__filename]);
  } catch ({message}) {
    t.ok(
      message.includes('tty-truncate doesn\'t support non-TTY environments.'),
      'should throw an error.'
    );
  }

  t.end();
});
