# tty-truncate

[![NPM version](https://img.shields.io/npm/v/tty-truncate.svg)](https://www.npmjs.com/package/tty-truncate)
[![Build Status](https://travis-ci.org/shinnn/tty-truncate.svg?branch=master)](https://travis-ci.org/shinnn/tty-truncate)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/tty-truncate.svg)](https://coveralls.io/github/shinnn/tty-truncate?branch=master)

Truncate a string to the current text terminal width

```javascript
const ttyTruncate = require('tty-truncate');

const str = '4724e053261747b278049de678b1ed';

process.stdout.columns; //=> 30
ttyTruncate(str); //=> '4724e053261747b278049de678b1ed'

process.stdout.columns; //=> 20
ttyTruncate(str); //=> '4724e053261747b2780…'
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install tty-truncate
```

## API

```javascript
const ttyTruncate = require('tty-truncate');
```

### ttyTruncate(*input*)

*input*: `string`  
Return: `string`

It replaces overflowing text with `…`.

Note that this module works only when `process.stdout.isTTY` is `true`. When the Node.js program is running on a non-TTY environment, it throws an error.

```javascript
const ttyTruncate = require('tty-truncate');

console.log(process.stdout.isTTY === true);

try {
  console.log(ttyTruncate('example'));
} catch ({message}) {
  console.log(message);
}
```

```
$ node example.js
> true
> example

$ node example.js | echo -n
> false
> tty-truncate doesn't support non-TTY environments.
```

## License

[Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed)