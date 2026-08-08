export type ProjectStatus = 'building' | 'shipped' | 'dormant' | 'archived' | 'seeking' | 'private';

export interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  state: string;
  description: string;
  tags: string[];
  github: string;
  date: string;
  public: boolean;
  body: string;
}

export interface JournalEntry {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  status: string;
  href?: string;
  relatedProject?: string;
  relatedProjectHref?: string;
  body: string;
}

export interface NowPage {
  title: string;
  updated: string;
  focus_title: string;
  focus_status: string;
  focus_one_liner: string;
  focus_description: string;
  tags: string[];
  body: string;
}
