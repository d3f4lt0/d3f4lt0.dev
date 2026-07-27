'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
