'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface VersionBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  version: string;
}

export function VersionBadge({ version, className, ...props }: VersionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {version}
    </span>
  );
}
