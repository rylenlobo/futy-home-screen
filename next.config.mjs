/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.gstatic.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
