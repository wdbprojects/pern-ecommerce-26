import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://pern-ecommerce-26.onrender.com/api/auth/:path*",
      },
      {
        source: "/api/:path*",
        destination: "https://pern-ecommerce-26.onrender.com/api/:path*",
      },
    ];
  },
  trailingSlash: false,
};

export default nextConfig;
