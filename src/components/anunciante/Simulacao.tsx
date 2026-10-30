"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// O que o comerciante escolheu na calculadora vai junto no formulário ("Simulou: Vídeo 30 s · 2 carros").
type Simulacao = { resumo: string; setResumo: (r: string) => void };
const Ctx = createContext<Simulacao>({ resumo: "", setResumo: () => {} });

export function ProvedorSimulacao({ children }: { children: ReactNode }) {
  const [resumo, setResumo] = useState("");
  return <Ctx.Provider value={{ resumo, setResumo }}>{children}</Ctx.Provider>;
}

export const useSimulacao = () => useContext(Ctx);
