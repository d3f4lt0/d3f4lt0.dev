'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface AngelWingsProps {
  className?: string;
}

export function AngelWings({ className }: AngelWingsProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[520px] w-[320px] opacity-[0.08] dark:opacity-[0.14]',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full text-[hsl(var(--nerv-cyan))]"
      >
        <path
          d="M160 500 L100 420 L40 340 L20 280 L50 240 L90 280 L130 320 L160 360"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M160 500 L120 440 L80 360 L50 280 L70 240 L100 280 L140 340 L160 380"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M160 500 L200 440 L240 360 L270 280 L250 240 L220 280 L180 340 L160 380"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M160 500 L220 420 L280 340 L300 280 L270 240 L230 280 L190 320 L160 360"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="160" y1="500" x2="160" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      </svg>
    </div>
  );
}
