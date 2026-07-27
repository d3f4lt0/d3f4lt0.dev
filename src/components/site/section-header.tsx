'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  label?: string;
  description?: string;
  as?: 'h2' | 'h3';
  number?: string;
}

export function SectionHeader({
  title,
  label,
  description,
  as = 'h2',
  number,
  className,
  ...props
}: SectionHeaderProps) {
  const Comp = as;
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="flex items-center gap-4">
        {number && (
          <span className="text-xs font-medium text-muted-foreground/40 font-mono tracking-wider">
            {number}
          </span>
        )}
        {label && !number && (
          <span className="text-xs font-medium text-muted-foreground/50 uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
      <Comp className="text-2xl font-medium text-foreground sm:text-3xl tracking-tight">
        {title}
      </Comp>
      {description && (
        <p className="text-base text-muted-foreground leading-7">{description}</p>
      )}
    </div>
  );
}
