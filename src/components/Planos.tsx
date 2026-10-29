"use client";

import { useState } from "react";
import { brl, CADASTRO_URL, DIAS_TESTE, PLANOS } from "@/lib/config";

type Periodo = "mensal" | "anual";

export default function Planos() {
  const [periodo, setPeriodo] = useState<Periodo>("mensal");

  const opcao = (valor: Periodo, rotulo: string, extra?: string) => (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ${
        periodo === valor ? "bg-sinal text-asfalto" : "text-cinza hover:text-giz"
      }`}
    >
      <input type="radio" name="periodo" value={valor} checked={periodo === valor} onChange={() => setPeriodo(valor)} className="sr-only" />
      {rotulo}
      {extra && (
        <span className={`rounded-full px-2 py-0.5 text-[11px] ${periodo === valor ? "bg-asfalto text-sinal" : "bg-linha text-sinal"}`}>{extra}</span>
      )}
    </label>
  );

  return (
    <>
      <fieldset className="mt-8 inline-flex rounded-full border border-linha bg-asfalto-2 p-1">
        <legend className="sr-only">Forma de pagamento</legend>
        {opcao("mensal", "Mensal")}
        {opcao("anual", "Anual", "2 meses grátis")}
      </fieldset>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {PLANOS.map((p) => {
          const destaque = "destaque" in p && p.destaque;
          const anual = periodo === "anual";
          const sub = destaque ? "text-[#3D3420]" : "text-cinza-2";
          return (
            <div key={p.codigo} className={`flex flex-col rounded-3xl p-8 ${destaque ? "bg-sinal text-asfalto" : "border border-linha bg-cartao"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[22px] font-semibold">{p.nome}</h3>
                {destaque && <span className="rounded-full bg-asfalto px-3 py-1.5 text-[13px] font-bold text-sinal">Mais escolhido</span>}
              </div>

              <p className="mt-5 font-display text-[48px] leading-none font-extrabold" aria-live="polite">
                {anual ? brl(p.anual / 12) : brl(p.mensal)}
                <span className={`font-sans text-[17px] font-medium ${sub}`}> /mês</span>
              </p>
              <p className={`mt-2 min-h-5 text-sm ${sub}`}>
                {anual ? (
                  <>
                    {brl(p.anual).replace(",00", "")} por ano · <s>{brl(p.mensal * 12)}</s>
                  </>
                ) : (
                  <>ou {brl(p.anual / 12)}/mês no plano anual</>
                )}
              </p>

              <ul className={`mt-6 mb-8 list-none space-y-2 p-0 ${destaque ? "text-[#2a2410]" : "text-cinza"}`}>
                {p.itens.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className={destaque ? "text-asfalto" : "text-sinal"}>
                      ✓
                    </span>
                    {i}
                  </li>
                ))}
              </ul>

              <a
                href={`${CADASTRO_URL}?plano=${p.codigo}&periodo=${periodo}`}
                className={`mt-auto rounded-2xl p-4 text-center font-bold ${
                  destaque ? "bg-asfalto text-giz hover:bg-[#232B35]" : "border-[1.5px] border-linha-forte text-giz hover:border-cinza-2"
                }`}
              >
                Começar com o {p.nome}
              </a>
              <p className={`mt-2 text-center text-xs ${sub}`}>{DIAS_TESTE} dias grátis antes da primeira cobrança</p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 max-w-3xl text-sm text-cinza-2">
        Anual: Pix à vista ou cartão em até 12x. Mensal: cobrança automática no cartão ou Pix mês a mês. Troque de plano quando quiser, direto no painel.
      </p>
    </>
  );
}
