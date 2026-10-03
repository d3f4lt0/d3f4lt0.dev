import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, JournalEntry, NowPage } from './types';

const contentDir = path.join(process.cwd(), 'content');

function readMarkdownFile<T>(filePath: string): T {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  return data as T;
}

function readAllMarkdownFiles<T>(dirPath: string, sortBy?: keyof T): T[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md'));
  const items: T[] = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const item = readMarkdownFile<T>(filePath);
    items.push(item);
  }

  if (sortBy) {
    items.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return bVal.localeCompare(aVal);
      }
      return 0;
    });
  }

  return items;
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, 'projects');
  return readAllMarkdownFiles<Project>(projectsDir, 'date');
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((project) => project.slug === slug);
}

export function getJournalEntries(): JournalEntry[] {
  const journalDir = path.join(contentDir, 'journal');
  return readAllMarkdownFiles<JournalEntry>(journalDir, 'date');
}

export function getNowPage(): (NowPage & { content: string }) | null {
  const nowPath = path.join(contentDir, 'now', 'index.md');
  if (!fs.existsSync(nowPath)) {
    return null;
  }
  const fileContent = fs.readFileSync(nowPath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { ...(data as NowPage), content };
}

export function getSiteSettings(): Record<string, any> {
  const settingsPath = path.join(contentDir, 'settings', 'site.json');
  if (!fs.existsSync(settingsPath)) {
    return {};
  }
  const fileContent = fs.readFileSync(settingsPath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getAboutPage(): Record<string, any> {
  const aboutPath = path.join(contentDir, 'about.json');
  if (!fs.existsSync(aboutPath)) {
    return {};
  }
  const fileContent = fs.readFileSync(aboutPath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getDocsPage(): Record<string, any> {
  const docsPath = path.join(contentDir, 'docs.json');
  if (!fs.existsSync(docsPath)) {
    return {};
  }
  const fileContent = fs.readFileSync(docsPath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getDocsArchitecturePage(): Record<string, any> {
  const archPath = path.join(contentDir, 'docs', 'architecture.json');
  if (!fs.existsSync(archPath)) {
    return {};
  }
  const fileContent = fs.readFileSync(archPath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getKnowledgePage(): Record<string, any> {
  const knowledgePath = path.join(contentDir, 'knowledge.json');
  if (!fs.existsSync(knowledgePath)) {
    return {};
  }
  const fileContent = fs.readFileSync(knowledgePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getNotFoundPage(): Record<string, any> {
  const notFoundPath = path.join(contentDir, '404.json');
  if (!fs.existsSync(notFoundPath)) {
    return {};
  }
  const fileContent = fs.readFileSync(notFoundPath, 'utf-8');
  return JSON.parse(fileContent);
}
