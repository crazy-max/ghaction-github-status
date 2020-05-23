import * as githubstatus from '../src/githubstatus';

describe('githubstatus', () => {
  it('returns GitHub Status (status)', async () => {
    const status = await githubstatus.status();
    console.log(status);
    expect(status?.indicator).not.toEqual('');
  });

  it('returns GitHub Status (summary)', async () => {
    const summary = await githubstatus.summary();
    console.log(summary);
    expect(summary?.status.indicator).not.toEqual('');
    expect(summary?.components?.length).toBeGreaterThan(0);
  });
});
