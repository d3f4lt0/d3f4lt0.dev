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
    <div className={cn('relative space-y-3', className)} {...props}>
      <div className="nerv-corner nerv-corner--tl" aria-hidden="true" />
      <div className="nerv-corner nerv-corner--tr" aria-hidden="true" />
      <div className="flex items-center gap-4">
        {number && (
          <span className="nerv-readout">{number}</span>
        )}
        {label && !number && (
          <span className="nerv-readout">{label}</span>
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
