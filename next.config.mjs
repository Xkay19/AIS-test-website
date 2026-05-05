

const nextConfig = {
  experimental: {
    // Keep pdf-parse / pdfjs-dist as native Node.js requires — do not bundle through webpack
    serverComponentsExternalPackages: ["pdf-parse", "pdfjs-dist"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
};

export default nextConfig;
