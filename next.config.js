const nextConfig = {
  images: {
    domains: [
      "files.edgestore.dev",
      "applicantai.com"
    ]
  },
  webpack: (config, { isServer }) => {
    // Add file-loader rule to handle binary files
    config.module.rules.push({
      test: /\.(bin|dat|node|pdf)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets', // Output folder for the binary files
      },
    });

    return config;
  },
};

module.exports = nextConfig;
