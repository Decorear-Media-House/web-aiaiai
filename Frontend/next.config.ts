import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
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
        hostname: "cms-aiaiai.decorear.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
