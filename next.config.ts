import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2juy7qzamcf56.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zighang.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
