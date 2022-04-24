import {describe, expect, it} from '@jest/globals';
import * as githubstatus from '../src/githubstatus';
import * as util from '../src/util';

describe('util', () => {
  it('returns github status components', async () => {
    const summary = await githubstatus.summary();
    await util.asyncForEach(summary?.components, async component => {
      expect(component?.name).not.toEqual('');
    });
  });
});
