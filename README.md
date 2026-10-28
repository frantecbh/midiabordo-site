# MidiaAbordo — Site (midiabordo.com.br)

Landing page para atrair motoristas de aplicativo para a plataforma MidiaAbordo.

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Site 100% estático (`output: "export"`): o build gera a pasta `out/`
- Os botões de cadastro e login apontam para a plataforma (`NEXT_PUBLIC_APP_URL`)

## Rodando localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra http://localhost:3000.

## Build e publicação

```bash
npm run build   # gera ./out
```

Publique a pasta `out/` na Vercel, Netlify, Cloudflare Pages ou em qualquer hospedagem estática,
apontando o domínio `midiabordo.com.br`.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Textos e seções da página | `src/app/page.tsx` |
| Preços, dias de teste, tela mínima, URL da plataforma | `src/lib/config.ts` |
| Simulador de ganhos | `src/components/Simulador.tsx` |
| Cores e fontes | `src/app/globals.css` |
| Título e descrição para Google/WhatsApp | `src/app/layout.tsx` |
