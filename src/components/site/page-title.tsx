'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
}

export function PageTitle({
  as = 'h1',
  className,
  children,
  ...props
}: PageTitleProps) {
  const Comp = as;
  const baseClasses = {
    h1: 'text-4xl font-medium tracking-tight text-foreground sm:text-5xl',
    h2: 'text-2xl font-medium tracking-tight text-foreground',
    h3: 'text-xl font-medium tracking-tight text-foreground',
  };

  return (
    <Comp className={cn(baseClasses[as], className)} {...props}>
      {children}
    </Comp>
  );
}
