'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { GitHubMetadata } from '@/lib/github';

interface GitHubMetadataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: GitHubMetadata;
}

export function GitHubMetadataCard({ data, className, ...props }: GitHubMetadataCardProps) {
  const items = [
    { label: 'Started', value: data.started },
    { label: 'Last Activity', value: data.lastActivity },
    { label: 'Status', value: data.status },
    { label: 'Visibility', value: data.visibility },
    { label: 'Repository', value: data.repository },
    { label: 'Documentation', value: data.documentation },
    { label: 'Primary Language', value: data.primaryLanguage },
  ].filter((item) => item.value !== undefined && item.value !== '');

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('rounded-lg border border-border/60 bg-card/50 p-4', className)}
      {...props}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
          Repository
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label}>
            <span className="text-xs text-muted-foreground/50">{item.label}</span>
            <p className="mt-0.5 text-sm text-foreground/80">{item.value}</p>
          </div>
        ))}
      </div>
      {data.description && (
        <p className="mt-3 text-sm text-muted-foreground leading-6">{data.description}</p>
      )}
    </div>
  );
}
