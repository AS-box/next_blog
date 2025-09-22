import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    STATIC_TOKEN: process.env.STATIC_TOKEN
  }
};

export default nextConfig;
