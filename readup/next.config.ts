import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep the seed library and prompts available to server functions on Vercel.
  outputFileTracingIncludes: { "/api/**": ["./prompts/**"] },
};

export default nextConfig;
