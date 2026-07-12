const REPO_OWNER = "elgemmy";
const REPO_NAME = "Competitive-Programming-Sessions";
const BRANCH = "master";
const BASE = "https://api.github.com";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function headers() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) h["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

export interface GHTreeItem {
  path: string;
  type: "blob" | "tree";
  sha: string;
  url: string;
}

export interface Topic {
  slug: string;
  name: string;
  path: string;
  subfolders: string[];
}

export interface FileEntry {
  name: string;
  path: string;
  type: "blob" | "tree";
  sha: string;
}

const KNOWN_TOPICS = [
  "Arrays",
  "Basic Math & Number Theory",
  "Binary Search",
  "Bits Manipulation",
  "Data Types & Conditions",
  "Dynamic Programming",
  "Graph Theory",
  "Recursion & Backtracking",
  "Time Complexity",
  "Two Pointers",
];

export function slugify(name: string) {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"));
}

export function deslugify(slug: string) {
  const decoded = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&");
  return (
    KNOWN_TOPICS.find(
      (t) => t.toLowerCase() === decoded.toLowerCase()
    ) || decoded
  );
}

export async function getTopics(): Promise<Topic[]> {
  const url = `${BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return KNOWN_TOPICS.map((n) => ({ slug: slugify(n), name: n, path: n, subfolders: [] }));

  const data: Array<{ name: string; type: string; path: string }> = await res.json();
  const dirs = data.filter((d) => d.type === "dir" && KNOWN_TOPICS.includes(d.name));

  return dirs.map((d) => ({
    slug: slugify(d.name),
    name: d.name,
    path: d.path,
    subfolders: [],
  }));
}

export async function getTopicFiles(topicName: string): Promise<FileEntry[]> {
  const encodedPath = encodeURIComponent(topicName);
  const url = `${BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodedPath}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data: Array<{ name: string; path: string; type: string; sha: string }> =
    await res.json();
  return data.map((f) => ({
    name: f.name,
    path: f.path,
    type: f.type as "blob" | "tree",
    sha: f.sha,
  }));
}

export async function getSubfolderFiles(topicName: string, subfolder: string): Promise<FileEntry[]> {
  const encodedPath = encodeURIComponent(`${topicName}/${subfolder}`);
  const url = `${BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodedPath}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data: Array<{ name: string; path: string; type: string; sha: string }> =
    await res.json();
  return data.map((f) => ({
    name: f.name,
    path: f.path,
    type: f.type as "blob" | "tree",
    sha: f.sha,
  }));
}

export async function getFileContent(filePath: string): Promise<string | null> {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  const url = `${BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodedPath}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data: { content?: string; encoding?: string } = await res.json();
  if (data.content && data.encoding === "base64") {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  return null;
}

export async function getRepoStats() {
  const url = `${BASE}/repos/${REPO_OWNER}/${REPO_NAME}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    stars: data.stargazers_count as number,
    forks: data.forks_count as number,
    watchers: data.watchers_count as number,
    updatedAt: data.updated_at as string,
    description: data.description as string,
  };
}
