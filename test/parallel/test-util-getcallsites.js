'use strict';

const common = require('../common');

const fixtures = require('../common/fixtures');
const file = fixtures.path('get-call-sites.js');

const { getCallSites } = require('node:util');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert');

{
  const callSites = getCallSites();
  assert.ok(callSites.length > 1);
  assert.match(
    callSites[0].scriptName,
    /test-util-getcallsites/,
    'node:util should be ignored',
  );
}

{
  const callSites = getCallSites(3);
  assert.strictEqual(callSites.length, 3);
  assert.match(
    callSites[0].scriptName,
    /test-util-getcallsites/,
    'node:util should be ignored',
  );
}

// Guarantee dot-left numbers are ignored
{
  const callSites = getCallSites(3.6);
  assert.strictEqual(callSites.length, 3);
}

{
  const callSites = getCallSites(3.4);
  assert.strictEqual(callSites.length, 3);
}

{
  assert.throws(() => {
    // Max than kDefaultMaxCallStackSizeToCapture
    getCallSites(201);
  }, common.expectsError({
    code: 'ERR_OUT_OF_RANGE'
  }));
  assert.throws(() => {
    getCallSites(-1);
  }, common.expectsError({
    code: 'ERR_OUT_OF_RANGE'
  }));
  assert.throws(() => {
    getCallSites({});
  }, common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE'
  }));
}

{
  const callSites = getCallSites(1);
  assert.strictEqual(callSites.length, 1);
  assert.match(
    callSites[0].scriptName,
    /test-util-getcallsites/,
    'node:util should be ignored',
  );
}

// Guarantee [eval] will appear on stacktraces when using -e
{
  const { status, stderr, stdout } = spawnSync(
    process.execPath,
    [
      '-e',
      `const util = require('util');
       const assert = require('assert');
       assert.ok(util.getCallSites().length > 1);
       process.stdout.write(util.getCallSites()[0].scriptName);
      `,
    ],
  );
  assert.strictEqual(status, 0, stderr.toString());
  assert.strictEqual(stdout.toString(), '[eval]');
}

// Guarantee the stacktrace[0] is the filename
{
  const { status, stderr, stdout } = spawnSync(
    process.execPath,
    [file],
  );
  assert.strictEqual(status, 0, stderr.toString());
  assert.strictEqual(stdout.toString(), file);
}

// Error.stackTraceLimit should not influence callsite size
{
  const originalStackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const callSites = getCallSites();
  assert.notStrictEqual(callSites.length, 0);
  Error.stackTraceLimit = originalStackTraceLimit;
}