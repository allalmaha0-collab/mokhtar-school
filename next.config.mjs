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
  // Suppress missing env var warnings during build — real values set in Vercel dashboard
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://build:build@localhost:5432/build',
  },
};
export default nextConfig;
