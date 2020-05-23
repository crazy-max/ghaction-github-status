import {Status} from './status';
import {Summary} from './summary';
import * as httpm from '@actions/http-client';

export enum OverallStatus {
  Minor,
  Major,
  Critical
}

export enum ComponentStatus {
  Operational,
  DegradedPerformance,
  PartialOutage,
  MajorOutage
}

export enum Component {
  Git = 'Git Operations',
  Api = 'API Requests',
  Webhooks = 'Webhooks',
  IPP = 'Issues, Pull Requests, Projects',
  Actions = 'GitHub Actions',
  Packages = 'GitHub Packages',
  Pages = 'GitHub Pages',
  Other = 'Other'
}

export const OverallStatusName = new Map<string, OverallStatus>([
  ['minor', OverallStatus.Minor],
  ['major', OverallStatus.Major],
  ['critical', OverallStatus.Critical]
]);

export const ComponentsStatusName = new Map<string, ComponentStatus>([
  ['operational', ComponentStatus.Operational],
  ['degraded_performance', ComponentStatus.DegradedPerformance],
  ['partial_outage', ComponentStatus.PartialOutage],
  ['major_outage', ComponentStatus.MajorOutage]
]);

export const getOverallStatusName = async (status: OverallStatus): Promise<string | undefined> => {
  for await (let [key, val] of OverallStatusName) {
    if (val == status) return key;
  }
};

export const getComponentStatusName = async (status: ComponentStatus): Promise<string | undefined> => {
  for await (let [key, val] of ComponentsStatusName) {
    if (val == status) return key;
  }
};

export const status = async (): Promise<Status | null> => {
  await console.log(process.env);
  if (process.env.GHACTION_GITHUB_STATUS_MOCKIT) {
    // @ts-ignore
    return <Status>require('../__tests__/data-status.json');
  }
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Status>(`https://www.githubstatus.com/api/v2/status.json`)).result;
};

export const summary = async (): Promise<Summary | null> => {
  if (process.env.GHACTION_GITHUB_STATUS_MOCKIT) {
    // @ts-ignore
    return <Summary>require('../__tests__/data-summary.json');
  }
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Summary>(`https://www.githubstatus.com/api/v2/summary.json`)).result;
};
