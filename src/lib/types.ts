export type ProjectStatus = 'building' | 'shipped' | 'dormant' | 'archived' | 'seeking';

export interface Project {
  name: string;
  description: string;
  href: string;
  status: ProjectStatus;
  state: string;
  stack: string[];
  lastUpdated: string;
  repository?: string;
  documentation?: string;
}
