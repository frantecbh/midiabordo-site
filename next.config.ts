import type { NextConfig } from "next";

// Site 100% estático: `npm run build` gera a pasta `out/`,
// que pode ser publicada na Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
