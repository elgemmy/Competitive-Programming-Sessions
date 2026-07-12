import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTopics, slugify } from "@/lib/github";

const TOPIC_ICONS: Record<string, string> = {
  "Arrays": "[ ]",
  "Basic Math & Number Theory": "∑",
  "Binary Search": "⌕",
  "Bits Manipulation": "01",
  "Data Types & Conditions": "?:",
  "Dynamic Programming": "DP",
  "Graph Theory": "G",
  "Recursion & Backtracking": "↺",
  "Time Complexity": "O",
  "Two Pointers": "←→",
};

const TOPIC_DESC: Record<string, string> = {
  "Arrays": "Fundamentals of 1D and 2D arrays, traversal, prefix sums, and array tricks.",
  "Basic Math & Number Theory": "Primes, GCD, modular arithmetic, and number-theoretic algorithms.",
  "Binary Search": "Search on sorted arrays and answer-space binary search patterns.",
  "Bits Manipulation": "Bitwise operations, masks, and efficient low-level optimizations.",
  "Data Types & Conditions": "C++ data types, overflow, conditions, and branching patterns.",
  "Dynamic Programming": "Memoization, tabulation, classic DP patterns and problem decomposition.",
  "Graph Theory": "BFS, DFS, shortest paths, trees, and graph representations.",
  "Recursion & Backtracking": "Recursive thinking, call stack, and exhaustive search with pruning.",
  "Time Complexity": "Big-O analysis, amortized complexity, and performance estimation.",
  "Two Pointers": "Sliding window, opposite pointers, and linear-time range techniques.",
};

export default async function TopicsGrid() {
  const topics = await getTopics();

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-xs text-[var(--color-muted-fg)] tracking-widest uppercase mb-2">
            Curriculum
          </p>
          <h2 className="text-3xl font-semibold text-[var(--color-foreground)] text-balance">
            Topics Covered
          </h2>
        </div>
        <Link
          href="/topics"
          className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:underline font-medium"
        >
          All topics <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="group relative border border-[var(--color-border)] bg-[var(--color-card)] rounded-lg p-6 flex flex-col gap-3 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card-hover)] transition-all duration-200"
          >
            <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-muted)] border border-[var(--color-border)] rounded px-2 py-1 w-fit tracking-widest">
              {TOPIC_ICONS[topic.name] ?? "//"}
            </span>

            <h3 className="text-base font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
              {topic.name}
            </h3>

            <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed flex-1">
              {TOPIC_DESC[topic.name] ?? "Explore sessions, materials and practice problems."}
            </p>

            <ArrowUpRight className="w-4 h-4 text-[var(--color-muted-fg)] group-hover:text-[var(--color-accent)] transition-colors mt-auto self-end" />
          </Link>
        ))}
      </div>
    </section>
  );
}
