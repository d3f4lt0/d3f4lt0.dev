import * as React from 'react';
import { cn } from '@/lib/utils/cn';

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm card-hover-lift',
        className
      )}
      {...props}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-10 translate-y-[-100%] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:via-white/5" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-transparent transition-colors duration-300 ease-out group-hover:bg-[hsl(var(--nerv-cyan-dim))]" aria-hidden="true" />
    </div>
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
