import type { Metadata, Viewport } from "next";
import "./globals.css";

const descricao =
  "Coloque um tablet atrás do banco do passageiro, venda o espaço para os comércios do seu bairro e receba direto no seu Pix. 14 dias grátis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://midiabordo.com.br"),
  title: "MidiaAbordo — Transforme o seu carro de aplicativo em renda extra",
  description: descricao,
  openGraph: {
    title: "MidiaAbordo — Seu carro também anuncia",
    description: descricao,
    url: "https://midiabordo.com.br",
    siteName: "MidiaAbordo",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#11161c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
