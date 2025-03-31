import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/placeholder",
      },
      {
        protocol: "http",
        hostname: "aleksanderpalamar.dev",
        port: "",
        pathname: "/api/placeholder",
      },
    ],
  },
};

export default nextConfig;
