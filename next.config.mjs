/** @type {import('next').NextConfig} */
const nextConfig = { experimental: {
    middlewareClientMaxBodySize: 200 * 1024 * 1024, // 200MB
  },};

export default nextConfig;


