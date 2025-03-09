/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TLS_REJECT_UNAUTHORIZED: "0",
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
