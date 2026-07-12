import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["react-markdown", "remark-gfm", "rehype-raw"],
};

export default nextConfig;
