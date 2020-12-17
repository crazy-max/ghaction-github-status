import * as path from 'path';
import * as githubstatus from '../src/githubstatus';
import {Page, Status} from '../src/status';
import {Summary} from '../src/summary';

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

describe('status', () => {
  test.each([
    [
      'data-status.json',
      {
        description: 'Minor Service Outage',
        indicator: 'minor'
      } as Status,
      {
        id: 'kctbh9vrtdwd',
        name: 'GitHub',
        url: 'https://www.githubstatus.com',
        time_zone: 'Etc/UTC',
        updated_at: '2020-05-22T20:50:20.457Z'
      } as Page
    ],
    [
      'data-status-2.json',
      {
        description: 'Service Under Maintenance',
        indicator: 'maintenance'
      } as Status,
      {
        id: 'kctbh9vrtdwd',
        name: 'GitHub',
        url: 'https://www.githubstatus.com',
        time_zone: 'Etc/UTC',
        updated_at: '2020-12-17T00:54:37.709Z'
      } as Page
    ]
  ])('given %p', async (file, expStatus, expPage) => {
    jest.spyOn(githubstatus, 'status').mockImplementation(
      (): Promise<Status | null> => {
        return <Promise<Status>>require(path.join(__dirname, 'fixtures', file));
      }
    );

    const status = await githubstatus.status();
    console.log(status);
    expect(status?.status).toEqual(expStatus);
    expect(status?.page).toEqual(expPage);
  });
});

describe('summary', () => {
  test.each([['data-summary.json'], ['data-summary-2.json']])('given %p', async file => {
    jest.spyOn(githubstatus, 'summary').mockImplementation(
      (): Promise<Summary | null> => {
        return <Promise<Summary>>require(path.join(__dirname, 'fixtures', file));
      }
    );

    const summary = await githubstatus.summary();
    console.log(summary);
    expect(summary?.status.indicator).not.toEqual('');
    expect(summary?.components?.length).toBeGreaterThan(0);
  });
});
