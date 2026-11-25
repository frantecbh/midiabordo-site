"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PLANOS, PRECOS_URL } from "./config";
import type { ValoresPlanos } from "./precosBuild";

type Plano = (typeof PLANOS)[number];

// Preços que o build já trouxe da plataforma; a página confere de novo ao abrir (o admin pode ter mudado depois).
const Iniciais = createContext<ValoresPlanos | null>(null);
export function PrecosIniciais({ valores, children }: { valores: ValoresPlanos | null; children: React.ReactNode }) {
  return <Iniciais.Provider value={valores}>{children}</Iniciais.Provider>;
}

let busca: Promise<ValoresPlanos | null> | null = null;
function buscarValores(): Promise<ValoresPlanos | null> {
  busca ??= fetch(PRECOS_URL)
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { planos?: { id: string; mensal: number; anual: number }[] } | null) => {
      if (!j?.planos?.length) return null;
      return Object.fromEntries(j.planos.map((p) => [p.id, { mensal: Number(p.mensal), anual: Number(p.anual) }]));
    })
    .catch(() => null);
  return busca;
}

/** Planos com os preços atuais da plataforma (do build e, ao abrir a página, conferidos de novo). */
export function usePlanos(): readonly Plano[] {
  const iniciais = useContext(Iniciais);
  const [valores, setValores] = useState<ValoresPlanos | null>(iniciais);
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
