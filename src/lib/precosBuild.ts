import { PRECOS_URL } from "./config";

export type ValoresPlanos = Record<string, { mensal: number; anual: number }>;

/** Na hora do build (o site é estático), busca os preços atuais na plataforma. Falhou: null (vale o config). */
export async function precosNoBuild(): Promise<ValoresPlanos | null> {
  try {
    const r = await fetch(PRECOS_URL, { signal: AbortSignal.timeout(8000), cache: "no-store" });
    if (!r.ok) return null;
    const j = (await r.json()) as { planos?: { id: string; mensal: number; anual: number }[] };
    if (!j.planos?.length) return null;
    return Object.fromEntries(j.planos.map((p) => [p.id, { mensal: Number(p.mensal), anual: Number(p.anual) }]));
  } catch {
    return null;
  }
}
