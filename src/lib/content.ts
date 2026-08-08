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

export function getNowPage(): NowPage | null {
  const nowPath = path.join(contentDir, 'now', 'index.md');
  if (!fs.existsSync(nowPath)) {
    return null;
  }
  return readMarkdownFile<NowPage>(nowPath);
}
