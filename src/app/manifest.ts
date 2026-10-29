import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MidiaAbordo",
    short_name: "MidiaAbordo",
    description: "Transforme o seu carro de aplicativo em renda extra com anúncios do comércio local.",
    start_url: "/",
    display: "standalone",
    background_color: "#11161C",
    theme_color: "#11161C",
    lang: "pt-BR",
    icons: [
      { src: "/icones/icone-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icones/icone-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icones/icone-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
