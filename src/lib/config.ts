// Endereço da plataforma (painel do motorista). Configure em `.env.local`:
// NEXT_PUBLIC_APP_URL=https://app.midiabordo.com.br
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.midiabordo.com.br").replace(/\/$/, "");

export const CADASTRO_URL = `${APP_URL}/cadastro`;
export const LOGIN_URL = `${APP_URL}/login`;

export const PLANOS = {
  mensal: { valor: 39.9 },
  anual: { valor: 399, mesesCobrados: 10 },
  diasTeste: 14,
} as const;

export const TELA_MINIMA_POLEGADAS = "8,7";

export function brl(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
