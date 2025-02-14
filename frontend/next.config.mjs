/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
