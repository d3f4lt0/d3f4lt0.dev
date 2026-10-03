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
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    const res = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`);
    const data = await res.json();

    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return NextResponse.json({
      content,
      sha: data.sha,
    });
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, content, message, sha } = body;

    if (!path || content === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const encoded = Buffer.from(content).toString('base64');

    const payload: any = {
      message: message || `Update ${path} via admin`,
      content: encoded,
    };

    if (sha) {
      payload.sha = sha;
    }

    const res = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${getGitHubToken()}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'd3f4lt0-admin',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API ${res.status}: ${text}`);
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      commit: data.commit?.sha,
    });
  } catch (error) {
    console.error('Failed to update content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
