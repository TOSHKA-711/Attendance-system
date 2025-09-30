/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily skip ESLint during builds to avoid non-serializable parser issues
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
