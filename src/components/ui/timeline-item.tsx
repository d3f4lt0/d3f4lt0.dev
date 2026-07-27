'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StatusBadge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import Link from 'next/link';

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
  title: string;
  summary?: string;
  href?: string;
  lessonsLearned?: string;
  relatedProject?: string;
  relatedProjectHref?: string;
  status?: string;
}

export function TimelineItem({
  date,
  title,
  summary,
  href,
  lessonsLearned,
  relatedProject,
  relatedProjectHref,
  status,
  className,
  children,
  ...props
}: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'group relative flex gap-4 py-4 transition-colors duration-150 ease-out hover:bg-accent/30',
        !prefersReducedMotion && 'transition-opacity duration-300 ease-out',
        className
      )}
      {...props}
    >
      <div className="flex w-[100px] shrink-0 flex-col justify-center">
        <span className="text-xs font-mono text-muted-foreground/70 transition-colors duration-150 ease-out group-hover:text-foreground">
          {date}
        </span>
      </div>
      <div className="flex-1">
        {href ? (
          <a
            href={href}
            className="block text-base font-medium text-foreground/80 transition-colors duration-150 ease-out group-hover:text-foreground"
          >
            {title}
          </a>
        ) : (
          <h3 className="text-base font-medium text-foreground/80">{title}</h3>
        )}
        {summary && (
          <p className="mt-1 text-sm text-muted-foreground/65 leading-6 transition-colors duration-150 ease-out group-hover:text-muted-foreground/80">
            {summary}
          </p>
        )}
        {(lessonsLearned || relatedProject || status) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {status && <StatusBadge status={status} />}
            {relatedProject && relatedProjectHref ? (
              <Link href={relatedProjectHref} className="link-underline">
                <Tag>{relatedProject}</Tag>
              </Link>
            ) : relatedProject ? (
              <Tag>{relatedProject}</Tag>
            ) : null}
          </div>
        )}
        {lessonsLearned && (
          <div className="mt-2 rounded-md border border-border/60 bg-card/30 p-3">
            <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
              Lessons learned
            </span>
            <p className="mt-1 text-sm text-muted-foreground/80 leading-6">{lessonsLearned}</p>
          </div>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}
