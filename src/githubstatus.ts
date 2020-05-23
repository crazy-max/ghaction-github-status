import * as httpm from '@actions/http-client';
import {Status} from './status';
import {Summary} from './summary';

export const status = async (): Promise<Status | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Status>(`https://www.githubstatus.com/api/v2/status.json`)).result;
};

export const summary = async (): Promise<Summary | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Summary>(`https://www.githubstatus.com/api/v2/summary.json`)).result;
};
