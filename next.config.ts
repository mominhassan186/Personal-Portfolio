/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/**/*": ["./protected-docs/**/*"],
    },
  },
};

export default nextConfig;