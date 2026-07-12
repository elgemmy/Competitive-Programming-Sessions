import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTopics } from "@/lib/github";

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

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Page header */}
        <div className="border-b border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="font-mono text-xs text-[var(--color-muted-fg)] tracking-widest uppercase mb-3">
              Curriculum
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-foreground)] text-balance mb-4">
              All Topics
            </h1>
            <p className="text-[var(--color-muted-fg)] text-base leading-relaxed max-w-xl">
              {topics.length} topics covering core competitive programming concepts — from
              fundamentals to advanced algorithms. Each topic includes sessions, materials,
              and Codeforces practice sheets.
            </p>
          </div>
        </div>

        {/* Topics list */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, i) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group border border-[var(--color-border)] bg-[var(--color-card)] rounded-lg p-6 flex items-start gap-5 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card-hover)] transition-all duration-200"
              >
                {/* Number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="font-mono text-[10px] text-[var(--color-muted-fg)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-muted)] border border-[var(--color-border)] rounded px-2 py-1 tracking-widest">
                    {TOPIC_ICONS[topic.name] ?? "//"}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                    {topic.name}
                  </h2>
                  <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                    {TOPIC_DESC[topic.name] ?? "Sessions, materials and practice problems."}
                  </p>
                </div>

                <ArrowUpRight className="flex-shrink-0 w-4 h-4 text-[var(--color-muted-fg)] group-hover:text-[var(--color-accent)] transition-colors mt-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
