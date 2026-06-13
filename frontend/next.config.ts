import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
const apiOrigin = new URL(apiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Backend storage (course thumbnails / banners)
      {
        protocol: apiOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: apiOrigin.hostname,
        ...(apiOrigin.port ? { port: apiOrigin.port } : {}),
      },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      // Editorial photography
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
