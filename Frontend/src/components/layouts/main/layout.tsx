import { cn } from "@/lib/cn";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <span className="h5 bold">DECR</span>
          <nav className="flex items-center gap-8">
            <a href="#" className="body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Work
            </a>
            <a href="#" className="body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              About
            </a>
            <a href="#" className="body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--border)] py-10">
        <div className="container mx-auto flex items-center justify-between">
          <span className="caption text-[var(--text-secondary)]">
            © {new Date().getFullYear()} DECR. All rights reserved.
          </span>
          <span className="caption text-[var(--text-secondary)]">
            Built with Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
