import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Necesario para hosting estático
  },
  reactStrictMode: true,
  // Configuración para Firebase Hosting
  // No usamos export estático porque tenemos rutas dinámicas con client components
  // Usaremos una estrategia diferente
};

export default nextConfig;
