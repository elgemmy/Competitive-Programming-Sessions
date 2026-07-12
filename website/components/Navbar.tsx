"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, GitBranch } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Code2 className="w-5 h-5 text-[var(--color-accent)]" />
          <span className="font-mono text-sm font-semibold tracking-wide text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
            CP_SESSIONS
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/topics"
            className={`text-xs font-medium tracking-widest uppercase transition-colors ${
              pathname.startsWith("/topics")
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-muted-fg)] hover:text-[var(--color-foreground)]"
            }`}
          >
            Topics
          </Link>
          <a
            href="https://github.com/elgemmy/Competitive-Programming-Sessions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[var(--color-muted-fg)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
