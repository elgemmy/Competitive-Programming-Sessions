import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText, Folder, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  getTopics,
  getTopicFiles,
  getFileContent,
  getSubfolderFiles,
  deslugify,
  type FileEntry,
} from "@/lib/github";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = await getTopics();
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const topicName = deslugify(slug);
  return {
    title: `${topicName} — CP Sessions`,
    description: `Sessions, materials and practice problems for ${topicName}.`,
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const topicName = deslugify(slug);

  const [files, readmeContent] = await Promise.all([
    getTopicFiles(topicName),
    getFileContent(`${topicName}/README.md`),
  ]);

  if (!files.length && !readmeContent) notFound();

  // Separate subfolders from top-level files
  const subfolders = files.filter((f) => f.type === "tree");
  const topFiles = files.filter(
    (f) => f.type === "blob" && f.name.toLowerCase() !== "readme.md"
  );

  // Fetch subfolder contents in parallel
  const subfolderContents = await Promise.all(
    subfolders.map(async (sf) => {
      const children = await getSubfolderFiles(topicName, sf.name);
      return { folder: sf, children };
    })
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb + header */}
        <div className="border-b border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted-fg)] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/topics" className="hover:text-[var(--color-foreground)] transition-colors">Topics</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--color-foreground)]">{topicName}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-foreground)] text-balance">
              {topicName}
            </h1>

            {/* GitHub link */}
            <a
              href={`https://github.com/elgemmy/Competitive-Programming-Sessions/tree/master/${encodeURIComponent(topicName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-[var(--color-muted-fg)] hover:text-[var(--color-accent)] transition-colors font-mono"
            >
              View on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main content — README */}
          <div>
            {readmeContent ? (
              <MarkdownRenderer content={readmeContent} />
            ) : (
              <p className="text-[var(--color-muted-fg)]">No README found for this topic.</p>
            )}

            {/* Extra top-level files */}
            {topFiles.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--color-accent)]" />
                  Files
                </h2>
                <FileList files={topFiles} topicName={topicName} />
              </div>
            )}
          </div>

          {/* Sidebar — subfolders */}
          {subfolderContents.length > 0 && (
            <aside className="space-y-6">
              <div className="sticky top-20">
                <p className="font-mono text-xs text-[var(--color-muted-fg)] tracking-widest uppercase mb-4">
                  Sections
                </p>
                <div className="space-y-4">
                  {subfolderContents.map(({ folder, children }) => (
                    <div
                      key={folder.name}
                      className="border border-[var(--color-border)] bg-[var(--color-card)] rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Folder className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">
                          {folder.name}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {children.map((child) => (
                          <li key={child.path}>
                            {child.type === "blob" ? (
                              <a
                                href={`https://github.com/elgemmy/Competitive-Programming-Sessions/blob/master/${encodeURIComponent(topicName)}/${encodeURIComponent(folder.name)}/${encodeURIComponent(child.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-[var(--color-muted-fg)] hover:text-[var(--color-accent)] transition-colors group"
                              >
                                <FileText className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{child.name}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                              </a>
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-[var(--color-muted-fg)]">
                                <Folder className="w-3 h-3 flex-shrink-0" />
                                <span>{child.name}</span>
                              </div>
                            )}
                          </li>
                        ))}
                        {children.length === 0 && (
                          <li className="text-xs text-[var(--color-muted-fg)] italic">Empty folder</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function FileList({ files, topicName }: { files: FileEntry[]; topicName: string }) {
  return (
    <ul className="space-y-2">
      {files.map((file) => (
        <li key={file.path}>
          <a
            href={`https://github.com/elgemmy/Competitive-Programming-Sessions/blob/master/${encodeURIComponent(topicName)}/${encodeURIComponent(file.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-[var(--color-border)] bg-[var(--color-card)] rounded-md px-4 py-3 text-sm text-[var(--color-muted-fg)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card-hover)] transition-all group"
          >
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">{file.name}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  );
}
