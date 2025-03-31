const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'worker.js'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withPWA(nextConfig); 