

const nextConfig = {
  // Keep pdf-parse as a native Node.js require — do not bundle through webpack
  serverExternalPackages: ["pdf-parse"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
};

export default nextConfig;
