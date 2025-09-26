/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Modern browser targeting - reduces polyfills
  transpilePackages: [],
}

export default nextConfig
