import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Tailwind CSS v4 : traitement de globals.css (@import "tailwindcss") par le loader Turbopack.
  // Sans cette règle (ni postcss.config), aucune classe utilitaire n'est générée.
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  // Désactive le strict mode pour éviter les double-renders en développement
  // reactStrictMode: false,
};

export default nextConfig;
