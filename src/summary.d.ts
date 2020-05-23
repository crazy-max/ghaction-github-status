export interface Summary {
  page: Page;
  components?: ComponentsEntity[] | null;
  incidents?: IncidentsEntity[] | null;
  scheduled_maintenances?: null[] | null;
  status: Status;
}
export interface Page {
  id: string;
  name: string;
  url: string;
  time_zone: string;
  updated_at: string;
}
export interface ComponentsEntity {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  position: number;
  description?: string | null;
  showcase: boolean;
  group_id?: null;
  page_id: string;
  group: boolean;
  only_show_if_degraded: boolean;
}
export interface IncidentsEntity {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  monitoring_at?: null;
  resolved_at?: null;
  impact: string;
  shortlink: string;
  started_at: string;
  page_id: string;
  incident_updates?: IncidentUpdatesEntity[] | null;
}
export interface IncidentUpdatesEntity {
  id: string;
  status: string;
  body: string;
  incident_id: string;
  created_at: string;
  updated_at: string;
  display_at: string;
  affected_components?: AffectedComponentsEntity[] | null;
  deliver_notifications: boolean;
  custom_tweet?: null;
  tweet_id?: null;
}
export interface AffectedComponentsEntity {
  code: string;
  name: string;
  old_status: string;
  new_status: string;
}
export interface Status {
  indicator: string;
  description: string;
}
