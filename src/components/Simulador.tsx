"use client";

import { useState } from "react";
import { brl, maxComercios, MENOR_ANUNCIO_SEG, PLANOS, type CodigoPlanoSite } from "@/lib/config";

export function calcularGanhos(clientes: number, valorPorCliente: number, mensalidade: number) {
  const bruto = Math.max(0, clientes) * Math.max(0, valorPorCliente);
  return { bruto, liquido: bruto - mensalidade };
}

export default function Simulador() {
  const [clientes, setClientes] = useState(5);
  const [valor, setValor] = useState(80);
  const [codigo, setCodigo] = useState<CodigoPlanoSite>("essencial");
  const plano = PLANOS.find((p) => p.codigo === codigo) ?? PLANOS[0];
  const maximo = maxComercios(plano);

  // Ao trocar de plano, a barrinha não pode ficar acima do que o plano comporta.
  function escolherPlano(c: CodigoPlanoSite) {
    setCodigo(c);
    const p = PLANOS.find((x) => x.codigo === c) ?? PLANOS[0];
    setClientes((n) => Math.min(n, maxComercios(p)));
  }
  const { bruto, liquido } = calcularGanhos(clientes, valor, plano.mensal);

  return (
    <div className="min-w-0 flex-[1_1_460px] rounded-3xl border border-areia bg-white p-8">
      <fieldset>
        <legend className="text-base font-semibold">Seu plano</legend>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {PLANOS.map((p) => (
            <label
              key={p.codigo}
              className={`cursor-pointer rounded-xl border-[1.5px] px-2 py-2.5 text-center text-sm font-semibold ${
                codigo === p.codigo ? "border-asfalto bg-asfalto text-giz" : "border-[#CFC8B8] text-asfalto hover:border-asfalto"
              }`}
            >
              <input type="radio" name="plano" value={p.codigo} checked={codigo === p.codigo} onChange={() => escolherPlano(p.codigo)} className="sr-only" />
              {p.nome}
              <span className={`block text-xs font-normal ${codigo === p.codigo ? "text-cinza" : "text-ardosia"}`}>{brl(p.mensal)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="sim-clientes" className="mt-7 flex justify-between text-base font-semibold">
        Comércios anunciando <span className="font-extrabold">{clientes}</span>
      </label>
      <input
        id="sim-clientes"
        type="range"
        min={1}
        max={maximo}
        step={1}
        value={clientes}
        onChange={(e) => setClientes(Number(e.target.value))}
        className="mt-3.5 h-7 w-full"
      />
      <p className="mt-1 mb-7 flex justify-between text-xs text-ardosia">
        <span>1</span>
        <span>
          {plano.maxAnuncios === null
            ? `até ${maximo} (artes de ${MENOR_ANUNCIO_SEG} s no ciclo de ${plano.cicloSeg / 60} min)`
            : `máximo do ${plano.nome}: ${maximo}`}
        </span>
      </p>

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
          <p className="text-sm text-ardosia">Plano {plano.nome}</p>
          <p className="mt-1 text-2xl font-bold">− {brl(plano.mensal)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-asfalto px-6 py-5 text-giz" aria-live="polite">
        <p className="text-sm text-cinza">Fica no seu bolso por mês</p>
        <p className="mt-1 font-display text-[44px] leading-tight font-extrabold text-sinal">{brl(liquido)}</p>
      </div>

      <p className="mt-3.5 text-[13px] text-ardosia">
        Simulação com os valores que você digitou. O preço de cada anúncio é você quem combina com o comerciante.
        {plano.maxAnuncios !== null && clientes === maximo && ` No ${plano.nome} cabem até ${maximo} anúncios no ar; para mais, veja o Ilimitado.`}
        {plano.maxAnuncios === null && " No Ilimitado não há limite de quantidade: o que limita é o tempo do ciclo de 8 minutos."}
      </p>
    </div>
  );
}
