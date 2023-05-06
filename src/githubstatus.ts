import {Status} from './status';
import {Summary} from './summary';
import * as httpm from '@actions/http-client';

export enum OverallStatus {
  Minor,
  Major,
  Critical,
  Maintenance
}

export enum ComponentStatus {
  Operational,
  DegradedPerformance,
  PartialOutage,
  MajorOutage,
  UnderMaintenance
}

export enum Component {
  Git = 'Git Operations',
  Api = 'API Requests',
  Webhooks = 'Webhooks',
  Issues = 'Issues',
  PullRequests = 'Pull Requests',
  Actions = 'Actions',
  Packages = 'Packages',
  Pages = 'Pages',
  Codespaces = 'Codespaces',
  Copilot = 'Copilot',
  Other = 'Other'
}

export const OverallStatusName = new Map<string, OverallStatus>([
  ['minor', OverallStatus.Minor],
  ['major', OverallStatus.Major],
  ['critical', OverallStatus.Critical],
  ['maintenance', OverallStatus.Maintenance]
]);

export const ComponentsStatusName = new Map<string, ComponentStatus>([
  ['operational', ComponentStatus.Operational],
  ['degraded_performance', ComponentStatus.DegradedPerformance],
  ['partial_outage', ComponentStatus.PartialOutage],
  ['major_outage', ComponentStatus.MajorOutage],
  ['under_maintenance', ComponentStatus.UnderMaintenance]
]);

export const getOverallStatusName = async (status: OverallStatus): Promise<string | undefined> => {
  for await (const [key, val] of OverallStatusName) {
    if (val == status) return key;
  }
};

export const getComponentStatusName = async (status: ComponentStatus): Promise<string | undefined> => {
  for await (const [key, val] of ComponentsStatusName) {
    if (val == status) return key;
  }
};

export const status = async (): Promise<Status | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Status>(`https://www.githubstatus.com/api/v2/status.json`)).result;
};

export const summary = async (): Promise<Summary | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Summary>(`https://www.githubstatus.com/api/v2/summary.json`)).result;
};
