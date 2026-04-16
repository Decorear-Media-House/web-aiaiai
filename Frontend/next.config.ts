import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "aiaiai-wordpress",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "aiaiai-cms.decorear.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
