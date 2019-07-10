# tty-truncate

[![npm version](https://img.shields.io/npm/v/tty-truncate.svg)](https://www.npmjs.com/package/tty-truncate)
[![GitHub Actions](https://action-badges.now.sh/shinnn/tty-truncate)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/shinnn/tty-truncate)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/tty-truncate.svg)](https://coveralls.io/github/shinnn/tty-truncate?branch=master)

Truncate a `string` to the current text terminal width, considering its [visual width](https://eev.ee/blog/2015/09/12/dark-corners-of-unicode/#combining-characters-and-character-width)

```javascript
const ttyTruncate = require('tty-truncate');

const string = '4724e053261747b278049de678b1ed';

process.stdout.columns; //=> 30
ttyTruncate(string); //=> '4724e053261747b278049de678b1ed'

process.stdout.columns; //=> 20
ttyTruncate(string); //=> '4724e053261747b2780…'
```

Though the first impression of this module would be “`string.slice(0, process.stdout.columns)` suffices.”, it doesn't always work well because lots of non-ASCII characters occupy 2 columns in a terminal.

```javascript
process.stdout.columns; //=> 80

const original = '字'.repeat(100);
//=> '字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字'
const sliced = original.slice(0, process.stdout.columns);
//=> '字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字'

original.length; //=> 100
sliced.length; //=> 80

// The output will overflow the current row,
// because the width of 字 in a text terminal is not 1 column but 2 columns.
console.log(sliced);
```

tty-truncate handles this case.

```javascript
ttyTruncate(original);
//=> '字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字…'
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install tty-truncate
```

## API

```javascript
const ttyTruncate = require('tty-truncate');
```

### ttyTruncate(*input*)

*input*: `string` with no `\n`  
Return: `string`

It replaces overflowing text with a single `…`.

```javascript
process.stdout.columns; //=> 20

ttyTruncate('Halfwidth characters');
//=> 'Halfwidth characters'

ttyTruncate('Ｆｕｌｌｗｉｄｔｈ　ｃｈａｒａｃｔｅｒｓ');
//=> 'Ｆｕｌｌｗｉｄｔｈ…'
```

This works only when [`process.stdout.isTTY`](https://nodejs.org/api/tty.html#tty_writestream_istty) is `true`. In a non-TTY environment it throws an `Error` instead.

## License

[ISC License](./LICENSE) © 2018 - 2019 Watanabe Shinnosuke
