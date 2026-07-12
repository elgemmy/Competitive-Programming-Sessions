import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The v0 preview is served from a cross-origin proxy domain
  // (e.g. *.vusercontent.net). Next.js 16 blocks cross-origin dev/HMR
  // asset requests by default, which breaks Turbopack chunk loading in
  // the preview. Allow the preview origin so chunks/HMR load correctly.
  allowedDevOrigins: ["*.vusercontent.net"],
};

export default nextConfig;
