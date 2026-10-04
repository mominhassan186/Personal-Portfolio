/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./protected-docs/**/*"],
  },
};

export default nextConfig;