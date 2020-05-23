export interface Status {
  page: Page;
  status: Status;
}

interface Page {
  id: string;
  name: string;
  url: string;
  time_zone: string;
  updated_at: string;
}

interface Status {
  indicator: string;
  description: string;
}
