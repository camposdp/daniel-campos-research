import type { NextConfig } from "next";

const repositoryName = "daniel-campos-research";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repositoryName}`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
