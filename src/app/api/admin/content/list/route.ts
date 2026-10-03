import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'd3f4lt0';
const REPO_NAME = 'd3f4lt0.dev';

function getGitHubToken(): string {
  const token = process.env.GITHUB_ADMIN_TOKEN;
  if (!token) {
    throw new Error('Server misconfigured');
  }
  return token;
}

function checkAdminAuth(request: Request): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const authHeader = request.headers.get('authorization');
  const expected = `Basic ${Buffer.from(`admin:${adminPassword}`).toString('base64')}`;
  return authHeader === expected;
}

async function githubRequest(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getGitHubToken();
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'd3f4lt0-admin',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }

  return res;
}

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const dir = searchParams.get('dir') || 'content';

    const res = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(dir)}`);
    const data = await res.json();

    const files = Array.isArray(data)
      ? data.filter((item: any) => item.type === 'file' && item.name.endsWith('.md')).map((item: any) => item.name)
      : [];

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Failed to list content:', error);
    return NextResponse.json({ error: 'Failed to list content' }, { status: 500 });
  }
}
