'use strict';

const cliTruncate = require('cli-truncate');
const ttyTruncate = require('.');

const cols = process.stdout.columns;
const fixtures = Array.from({length: 30000}, (v, i) => 'a'.repeat(i));

function runBench(fn, name) {
  console.log(`${name}: start`);
  console.time(name);

  for (const fixture of fixtures) {
    fn(fixture);
  }

  console.timeEnd(name);
}

runBench(v => ttyTruncate(v), 'tty-truncate');
runBench(v => cliTruncate(v, cols), 'cli-truncate');
