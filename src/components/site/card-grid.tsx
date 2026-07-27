'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridGap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function CardGrid({
  columns = 2,
  gap = 'md',
  className,
  children,
  ...props
}: CardGridProps) {
  return (
    <div
      className={cn('grid', gridCols[columns], gridGap[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}
