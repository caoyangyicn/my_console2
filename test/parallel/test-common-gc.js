'use strict';
// Flags: --expose-gc
const common = require('../common');
const { onGC } = require('../common/gc');

{
  onGC({}, { ongc: common.mustCall() });
  global.gc();
}

{
  onGC(process, { ongc: common.mustNotCall() });
  global.gc();
}