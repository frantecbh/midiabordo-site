"use client";

import { useEffect, useState } from "react";
import { PLANOS, PRECOS_URL } from "./config";

type Plano = (typeof PLANOS)[number];
type Valores = Record<string, { mensal: number; anual: number }>;

// Uma busca só por página; todos os componentes recebem o mesmo resultado.
let busca: Promise<Valores | null> | null = null;
function buscarValores(): Promise<Valores | null> {
  busca ??= fetch(PRECOS_URL)
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { planos?: { id: string; mensal: number; anual: number }[] } | null) => {
      if (!j?.planos?.length) return null;
      return Object.fromEntries(j.planos.map((p) => [p.id, { mensal: Number(p.mensal), anual: Number(p.anual) }]));
    })
    .catch(() => null);
  return busca;
}

/** Planos com os preços atuais da plataforma (enquanto carrega ou se falhar, os valores do config). */
export function usePlanos(): readonly Plano[] {
  const [valores, setValores] = useState<Valores | null>(null);
  useEffect(() => {
    let ativo = true;
    buscarValores().then((v) => ativo && v && setValores(v));
    return () => {
      ativo = false;
    };
  }, []);
  if (!valores) return PLANOS;
  return PLANOS.map((p) => ({ ...p, ...(valores[p.codigo] ?? {}) })) as unknown as readonly Plano[];
}
