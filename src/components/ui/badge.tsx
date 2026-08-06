'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
  label?: string;
}

const statusStyles: Record<string, string> = {
  building: 'border border-primary/30 bg-primary/10 text-primary',
  shipped: 'border border-green-500/30 bg-green-500/10 text-green-500',
  dormant: 'border border-muted-foreground/20 bg-muted/20 text-muted-foreground',
  archived: 'border border-muted-foreground/30 bg-muted text-muted-foreground',
  seeking: 'border border-blue-500/30 bg-blue-500/10 text-blue-500',
  active: 'border border-green-500/30 bg-green-500/10 text-green-500',
  inactive: 'border border-muted-foreground/30 bg-muted text-muted-foreground',
  error: 'border border-destructive/30 bg-destructive/10 text-destructive',
  warning: 'border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
  pending: 'border border-blue-500/30 bg-blue-500/10 text-blue-500',
};

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className
      )}
      {...props}
    >
      {label || status}
    </span>
  );
}
