import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://backend.c2c.network/",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "particularistically-transelementary-owen.ngrok-free.dev",
        port: "",
        pathname: "/media/**",
      },
      // If you use https for ngrok, add it here too
      {
        protocol: "https",
        hostname: "particularistically-transelementary-owen.ngrok-free.dev",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
