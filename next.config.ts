import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Edge-compatible streaming
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
