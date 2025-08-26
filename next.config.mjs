/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {};
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
