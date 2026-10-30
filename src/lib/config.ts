// Endereço da plataforma (painel do motorista). Configure em `.env.local`:
// NEXT_PUBLIC_APP_URL=https://app.midiabordo.com.br
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.midiabordo.com.br").replace(/\/$/, "");

export const CADASTRO_URL = `${APP_URL}/cadastro`;
export const LOGIN_URL = `${APP_URL}/login`;

export const DIAS_TESTE = 14;

/** Mesmos valores da plataforma (midiabordo-plataforma/src/domain/regras.ts). Anual = pague 10, leve 12. */
export const PLANOS = [
  {
    codigo: "essencial",
    nome: "Essencial",
    mensal: 29.9,
    anual: 299,
    maxAnuncios: 10,
    cicloSeg: 5 * 60,
    itens: ["Só anúncios estáticos (imagem)", "Até 10 anúncios no ar", "Ciclo de até 5 minutos"],
  },
  {
    codigo: "profissional",
    nome: "Profissional",
    mensal: 39.9,
    anual: 399,
    maxAnuncios: 15,
    cicloSeg: 5 * 60,
    itens: ["Anúncios estáticos e em vídeo", "Até 15 anúncios no ar", "Ciclo de até 5 minutos"],
    destaque: true,
  },
  {
    codigo: "ilimitado",
    nome: "Ilimitado",
    mensal: 59.9,
    anual: 599,
    maxAnuncios: null,
    cicloSeg: 8 * 60,
    itens: ["Anúncios estáticos e em vídeo", "Anúncios ilimitados no ar", "Ciclo de até 8 minutos"],
  },
] as const;

/** Menor anúncio possível (arte de 10 s): define quantos cabem no ciclo de um plano sem limite de quantidade. */
export const MENOR_ANUNCIO_SEG = 10;

/** Preços sugeridos por carro, por mês (mesma tabela padrão da plataforma: src/domain/precos.ts). */
export const PRECOS_SUGERIDOS = [
  { rotulo: "Estático 10 s", valor: 70, video: false },
  { rotulo: "Estático 15 s", valor: 90, video: false },
  { rotulo: "Vídeo 30 s", valor: 150, video: true },
  { rotulo: "Vídeo 60 s", valor: 250, video: true },
] as const;

/** Quantos comércios cabem no ar ao mesmo tempo no plano (no Ilimitado, quem limita é o tempo do ciclo). */
export function maxComercios(p: { maxAnuncios: number | null; cicloSeg: number }): number {
  return p.maxAnuncios ?? Math.floor(p.cicloSeg / MENOR_ANUNCIO_SEG);
}

export type CodigoPlanoSite = (typeof PLANOS)[number]["codigo"];

export const MENOR_MENSALIDADE = Math.min(...PLANOS.map((p) => p.mensal));

export const TELA_MINIMA_POLEGADAS = "8,7";

export function brl(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Formulário "Quero anunciar" do /anuncie: grava no admin da plataforma. */
export const INTERESSADOS_URL = `${APP_URL}/api/interessados`;
