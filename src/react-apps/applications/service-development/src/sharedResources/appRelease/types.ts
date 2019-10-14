export enum BuildStatus {
  cancelling = 'cancelling',
  completed = 'completed',
  inProgress = 'inProgress',
  none = 'none',
  notStarted = 'notStarted',
  postponed = 'postponed',
}

export interface IBuild {
  id: string;
  status: BuildStatus;
  started: string;
  finished: string;
}

export interface IRelease {
  id: string;
  tag_name: string;
  name: string;
  body: string;
  app: string;
  org: string;
  env_name: string;
  target_commitish: string;
  created_by: string;
  created: string;
  build: IBuild;
}
