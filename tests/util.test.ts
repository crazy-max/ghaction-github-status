import {describe, expect, it} from 'vitest';

import * as githubstatus from '../src/githubstatus.js';
import * as util from '../src/util.js';

describe('util', () => {
  it('returns github status components', async () => {
    const summary = await githubstatus.summary();
    await util.asyncForEach(summary?.components, async component => {
      expect(component?.name).not.toEqual('');
    });
  });
});
