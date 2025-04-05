/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TLS_REJECT_UNAUTHORIZED: "0",
  },
   webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: "worker-loader" },
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/r/:id',
        destination: '/resume/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
