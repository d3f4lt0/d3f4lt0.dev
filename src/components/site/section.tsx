'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        'py-16 sm:py-24',
        !prefersReducedMotion && 'transition-opacity duration-300 ease-out',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
