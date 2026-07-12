import Link from "next/link";
import { GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-[var(--color-foreground)]">
            CP_SESSIONS
          </span>
          <span className="text-[var(--color-border)]">—</span>
          <span className="text-sm text-[var(--color-muted-fg)]">
            ICPC SCU · Competitive Programming
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/topics"
            className="text-xs text-[var(--color-muted-fg)] hover:text-[var(--color-foreground)] transition-colors tracking-widest uppercase"
          >
            Topics
          </Link>
          <a
            href="https://github.com/elgemmy/Competitive-Programming-Sessions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-muted-fg)] hover:text-[var(--color-foreground)] transition-colors tracking-widest uppercase"
          >
            <GitBranch className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
