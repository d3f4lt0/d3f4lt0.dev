import { NextResponse } from 'next/server';
import matter from 'gray-matter';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'd3f4lt0';
const REPO_NAME = 'd3f4lt0.dev';
const FILE_PATH = 'content/now/index.md';

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

function parseNowPage(content: string) {
  const { data, content: body } = matter(content);

  const sections = body
    .split('\n## ')
    .map((section: string) => section.trim())
    .filter((section: string) => section.length > 0)
    .map((section: string) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+\s*/, '');
      const bodyContent = lines.slice(1).join('\n').trim();
      return { title, content: bodyContent };
    });

  return {
    title: (data.title as string) || 'Now',
    updated: (data.updated as string) || '',
    sections,
  };
}

function serializeNowPage(data: { title: string; updated: string; sections: { title: string; content: string }[] }) {
  const frontmatter = `---\ntitle: "${data.title}"\nupdated: "${data.updated}"\n---\n\n`;
  const body = data.sections
    .map((s) => `## ${s.title}\n\n${s.content}`)
    .join('\n\n');
  return frontmatter + body;
}

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(FILE_PATH)}`);
    const data = await res.json();

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const parsed = parseNowPage(content);

    return NextResponse.json({
      ...parsed,
      sha: data.sha,
    });
  } catch (error) {
    console.error('Failed to fetch now page:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, updated, sections, message } = body;

    if (!title || !updated || !Array.isArray(sections)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const content = serializeNowPage({ title, updated, sections });
    const encoded = Buffer.from(content).toString('base64');

    let sha: string | undefined;
    try {
      const res = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(FILE_PATH)}`);
      const data = await res.json();
      sha = data.sha;
    } catch {
      // File may not exist yet; proceed without sha
    }

    const payload: any = {
      message: message || 'Update now page via admin',
      content: encoded,
    };

    if (sha) {
      payload.sha = sha;
    }

    const res = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(FILE_PATH)}`, {
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
    console.error('Failed to update now page:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
