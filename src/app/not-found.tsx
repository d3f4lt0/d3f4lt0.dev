import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-medium tracking-tight">Not Found</h2>
      <div className="mt-2 h-px w-12 bg-border/60" aria-hidden="true" />
      <p className="mt-4 text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="link-underline mt-6 text-sm font-medium text-primary"
      >
        Return home
      </Link>
    </div>
  );
}
