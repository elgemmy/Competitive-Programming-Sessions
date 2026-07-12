import Link from "next/link";
import { ArrowRight, Star, GitFork, Eye } from "lucide-react";
import { getRepoStats } from "@/lib/github";

export default async function HeroSection() {
  const stats = await getRepoStats();

  return (
    <section className="relative border-b border-[var(--color-border)] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.35,
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(232,197,71,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
        {/* Label */}
        <div className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-muted)] rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-mono text-xs text-[var(--color-muted-fg)] tracking-widest uppercase">
            ICPC — SCU
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold text-balance leading-none tracking-tight text-[var(--color-foreground)] mb-6">
          COMPETITIVE<br />
          <span className="text-[var(--color-accent)]">PROGRAMMING</span><br />
          SESSIONS.
        </h1>

        <p className="text-[var(--color-muted-fg)] text-lg leading-relaxed max-w-xl mb-10">
          Recorded sessions, detailed explanations, and curated practice problems
          covering the most important algorithms and data structures in competitive
          programming.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mb-16">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-semibold text-sm px-5 py-2.5 rounded-md hover:brightness-110 transition-all"
          >
            Browse Topics
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/elgemmy/Competitive-Programming-Sessions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-foreground)] font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[var(--color-muted)] transition-all"
          >
            View on GitHub
          </a>
        </div>

        {/* GitHub Stats */}
        {stats && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[var(--color-muted-fg)] text-sm">
              <Star className="w-4 h-4" />
              <span className="font-mono font-semibold text-[var(--color-foreground)]">{stats.stars}</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--color-muted-fg)] text-sm">
              <GitFork className="w-4 h-4" />
              <span className="font-mono font-semibold text-[var(--color-foreground)]">{stats.forks}</span>
              <span>forks</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--color-muted-fg)] text-sm">
              <Eye className="w-4 h-4" />
              <span className="font-mono font-semibold text-[var(--color-foreground)]">{stats.watchers}</span>
              <span>watching</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
