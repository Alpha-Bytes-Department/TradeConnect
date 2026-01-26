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
        protocol: "http",
        hostname: "particularistically-transelementary-owen.ngrok-free.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "backend.c2c.network",
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
