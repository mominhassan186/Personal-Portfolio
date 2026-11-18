/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/unlock-private": ["./protected-docs/**/*"],
  },
};

export default nextConfig;