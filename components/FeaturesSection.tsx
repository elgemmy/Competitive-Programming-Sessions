import { Video, BookOpen, Code, Trophy } from "lucide-react";

const features = [
  {
    icon: Video,
    label: "Session Recordings",
    description:
      "Watch full ICPC SCU lecture recordings linked directly from each topic page.",
  },
  {
    icon: BookOpen,
    label: "Curated Materials",
    description:
      "Hand-picked video tutorials and reading materials from top educators like Dr. Mostafa Saad and Adel Nasim.",
  },
  {
    icon: Code,
    label: "Practice Problems",
    description:
      "Codeforces problem sheets for every topic — practice what you've learned immediately.",
  },
  {
    icon: Trophy,
    label: "Structured Curriculum",
    description:
      "Topics ordered from fundamentals to advanced, built for learners competing in ICPC and similar contests.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-[var(--color-muted-fg)] tracking-widest uppercase mb-2">
          {"What's inside"}
        </p>
        <h2 className="text-3xl font-semibold text-[var(--color-foreground)] mb-12 text-balance">
          Everything you need to get started
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                  {label}
                </h3>
                <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
