export interface GitHubMetadata {
  started?: string;
  lastActivity?: string;
  status?: string;
  visibility?: 'public' | 'private' | 'internal';
  repository?: string;
  documentation?: string;
  primaryLanguage?: string;
  description?: string;
}

export async function fetchGitHubMetadata(_owner: string, _repo: string): Promise<GitHubMetadata> {
  return {};
}
