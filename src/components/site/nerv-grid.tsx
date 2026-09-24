'use client';

import * as React from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function NervGrid() {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    if (typeof window !== 'undefined') {
      console.log('%cd3f4lt0', 'color: #888; font-family: monospace;');
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="nerv-grid" aria-hidden="true" />
      <div className="nerv-scanline" aria-hidden="true" />
      <div className="nerv-light-beam" aria-hidden="true" />
      <div className="nerv-particles" aria-hidden="true">
        <span className="nerv-particle" style={{ top: '60%', left: '20%', animationDelay: '0s', animationDuration: '22s' }} />
        <span className="nerv-particle" style={{ top: '80%', left: '70%', animationDelay: '-8s', animationDuration: '26s' }} />
        <span className="nerv-particle" style={{ top: '50%', left: '45%', animationDelay: '-15s', animationDuration: '30s' }} />
        <span className="nerv-particle" style={{ top: '70%', left: '85%', animationDelay: '-4s', animationDuration: '24s' }} />
      </div>
    </>
  );
}
