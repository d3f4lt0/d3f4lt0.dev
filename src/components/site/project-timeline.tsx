'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface TimelineEntry {
  label: string;
  date?: string;
  description?: string;
  status?: string;
}

interface ProjectTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: TimelineEntry[];
}

const statusStyles: Record<string, string> = {
  completed: 'text-muted-foreground/60',
  active: 'text-foreground/80',
  pending: 'text-muted-foreground/40',
};

export function ProjectTimeline({ entries, className, ...props }: ProjectTimelineProps) {
  return (
    <div className={cn('space-y-0', className)} {...props}>
      {entries.map((entry, index) => (
        <div key={entry.label} className="relative flex gap-4 py-3">
          {index < entries.length - 1 && (
            <div className="absolute left-[7px] top-[18px] h-full w-px bg-border/40" aria-hidden="true" />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                'h-2.5 w-2.5 rounded-full border border-border',
                entry.status === 'active' && 'bg-foreground/80 border-foreground/80',
                entry.status === 'completed' && 'bg-muted-foreground/30 border-muted-foreground/30',
                entry.status === 'pending' && 'bg-background border-muted-foreground/20'
              )}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-sm font-medium text-foreground/80">{entry.label}</span>
              {entry.date && (
                <span className="text-xs font-mono text-muted-foreground/60">{entry.date}</span>
              )}
              {entry.status && (
                <span className={cn('text-xs uppercase tracking-wider', statusStyles[entry.status])}>
                  {entry.status}
                </span>
              )}
            </div>
            {entry.description && (
              <p className="mt-1 text-sm text-muted-foreground leading-6">{entry.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
