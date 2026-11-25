"use client";

import { brl } from "@/lib/config";
import { usePlanos } from "@/lib/usePlanos";

/** "a partir de R$ X/mês" com o preço atual da plataforma. */
export default function MenorMensalidade() {
  const planos = usePlanos();
  return <>{brl(Math.min(...planos.map((p) => p.mensal)))}</>;
}
