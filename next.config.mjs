/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
    ],
    unoptimized: true,
  },
  // Include SQLite database file in all serverless function bundles
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./prisma/school.db'],
    },
  },
};
export default nextConfig;
