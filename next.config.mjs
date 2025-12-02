// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',  // Permitir localhost
        port: '4000',            // Porta do servidor de imagens
        pathname: '/uploads/**', // Caminho para as imagens
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',  // Permitir 127.0.0.1 (IP local)
        port: '4000',            // Porta do servidor de imagens
        pathname: '/uploads/**', // Caminho para as imagens
      },
    ],
  },
};

export default nextConfig;
