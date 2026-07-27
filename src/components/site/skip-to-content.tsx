'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function SkipToContent({ className, ...props }: SkipToContentProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none',
        className
      )}
      {...props}
    >
      Skip to main content
    </a>
  );
}
