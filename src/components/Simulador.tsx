"use client";

import { useState } from "react";
import { brl, PLANOS } from "@/lib/config";

export function calcularGanhos(clientes: number, valorPorCliente: number, mensalidade = PLANOS.mensal.valor) {
  const bruto = Math.max(0, clientes) * Math.max(0, valorPorCliente);
  return { bruto, liquido: bruto - mensalidade };
}

export default function Simulador() {
  const [clientes, setClientes] = useState(5);
  const [valor, setValor] = useState(80);
  const { bruto, liquido } = calcularGanhos(clientes, valor);

  return (
    <div className="min-w-0 flex-[1_1_460px] rounded-3xl border border-areia bg-white p-8">
      <label htmlFor="sim-clientes" className="flex justify-between text-base font-semibold">
        Comércios anunciando <span className="font-extrabold">{clientes}</span>
      </label>
      <input
        id="sim-clientes"
        type="range"
        min={1}
        max={20}
        step={1}
        value={clientes}
        onChange={(e) => setClientes(Number(e.target.value))}
        className="mt-3.5 mb-7 h-7 w-full"
      />

      <label htmlFor="sim-valor" className="block text-base font-semibold">
        Quanto cada um paga por mês (R$)
      </label>
      <input
        id="sim-valor"
        type="number"
        inputMode="numeric"
        min={0}
        step={10}
        value={valor}
        onChange={(e) => setValor(Math.max(0, Number(e.target.value) || 0))}
        className="mt-2.5 w-full rounded-xl border-[1.5px] border-[#CFC8B8] bg-giz-2 px-4 py-3.5 text-xl font-semibold text-asfalto"
      />

      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-dashed border-[#CFC8B8] pt-6">
        <div>
          <p className="text-sm text-ardosia">Você fatura</p>
          <p className="mt-1 text-2xl font-bold">{brl(bruto)}</p>
        </div>
        <div>
          <p className="text-sm text-ardosia">Mensalidade MidiaAbordo</p>
          <p className="mt-1 text-2xl font-bold">− {brl(PLANOS.mensal.valor)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-asfalto px-6 py-5 text-giz" aria-live="polite">
        <p className="text-sm text-cinza">Fica no seu bolso por mês</p>
        <p className="mt-1 font-display text-[44px] leading-tight font-extrabold text-sinal">{brl(liquido)}</p>
      </div>

      <p className="mt-3.5 text-[13px] text-ardosia">
        Simulação com os valores que você digitou. O preço de cada anúncio é você quem combina com o comerciante.
      </p>
    </div>
  );
}
