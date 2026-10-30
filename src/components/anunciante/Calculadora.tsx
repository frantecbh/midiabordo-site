"use client";

import { useEffect, useMemo, useState } from "react";
import { PRECOS_SUGERIDOS } from "@/lib/config";
import { useSimulacao } from "./Simulacao";

// Premissas da estimativa (aparecem em letra pequena embaixo da calculadora).
const CICLO_SEG = 5 * 60;
const CORRIDAS_POR_HORA = 2;
const PASSAGEIROS_POR_CORRIDA = 1.3;
const KM_POR_HORA = 16;
const KM_BH_SP = 590;
const DOSE_DUPLA = 1.7;
const INICIO_DIA = 7;

const FORMATOS = PRECOS_SUGERIDOS.map((p) => ({ ...p, seg: Number(p.rotulo.match(/\d+/)?.[0] ?? 15) }));

const nf = (n: number) => Math.round(n).toLocaleString("pt-BR");
const brl = (n: number, casas = 0) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: casas, maximumFractionDigits: casas });

export default function Calculadora() {
  const [formato, setFormato] = useState<string>("Estático 15 s");
  const [dose, setDose] = useState(false);
  const [horas, setHoras] = useState(8);
  const [dias, setDias] = useState(22);
  const [carros, setCarros] = useState(1);
  const { setResumo } = useSimulacao();

  const f = FORMATOS.find((x) => x.rotulo === formato) ?? FORMATOS[1];
  const ins = dose ? 2 : 1;
  const porHora = (3600 / CICLO_SEG) * ins;
  const horasRua = horas * dias * carros;
  const exibicoes = horasRua * porHora;
  const segTela = exibicoes * f.seg;
  const pessoas = horasRua * CORRIDAS_POR_HORA * PASSAGEIROS_POR_CORRIDA;
  const km = horasRua * KM_POR_HORA;
  const preco = f.valor * (dose ? DOSE_DUPLA : 1) * carros;
  const tempoTela = `${Math.floor(segTela / 3600)}h${String(Math.round((segTela % 3600) / 60)).padStart(2, "0")}`;

  useEffect(() => {
    setResumo(`${f.rotulo}${dose ? " · dose dupla" : ""} · ${carros} ${carros === 1 ? "carro" : "carros"}`);
  }, [f.rotulo, dose, carros, setResumo]);

  // Um dia em um carro: um risco por exibição, das 7h até o fim do turno (régua das 6h às 24h).
  const riscos = useMemo(() => {
    const fim = Math.min(24, INICIO_DIA + horas);
    const lista: { esq: number; dupla: boolean }[] = [];
    for (let t = INICIO_DIA * 60; t < fim * 60; t += CICLO_SEG / 60) {
      lista.push({ esq: ((t - 360) / (18 * 60)) * 100, dupla: false });
      if (dose) lista.push({ esq: ((t + CICLO_SEG / 120 - 360) / (18 * 60)) * 100, dupla: true });
    }
    return { lista, esq: ((INICIO_DIA - 6) / 18) * 100, larg: ((fim - INICIO_DIA) / 18) * 100 };
  }, [horas, dose]);

  const card = "rounded-2xl bg-cartao p-4";

  return (
    <>
      <div className="mt-9 flex flex-wrap items-stretch gap-6">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-7 rounded-3xl border border-areia bg-white p-7">
          <fieldset>
            <legend className="text-base font-bold">Seu anúncio</legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {FORMATOS.map((x) => (
                <button
                  key={x.rotulo}
                  type="button"
                  onClick={() => setFormato(x.rotulo)}
                  aria-pressed={formato === x.rotulo}
                  className={`min-h-13 rounded-xl border-[1.5px] px-2 text-[15px] font-bold ${
                    formato === x.rotulo ? "border-asfalto bg-asfalto text-giz" : "border-[#CFC8B8] bg-giz-2 text-asfalto hover:border-asfalto"
                  }`}
                >
                  {x.rotulo}
                </button>
              ))}
            </div>
            <label className="mt-3 flex min-h-11 items-center gap-2.5 text-[15px]">
              <input type="checkbox" checked={dose} onChange={(e) => setDose(e.target.checked)} className="size-5 accent-asfalto" />
              <span>
                <strong>Dose dupla</strong> · aparece 2 vezes a cada ciclo
              </span>
            </label>
          </fieldset>

          <div>
            <label htmlFor="calc-horas" className="flex justify-between text-base font-bold">
              Horas por dia na rua <span>{horas} h</span>
            </label>
            <input id="calc-horas" type="range" min={4} max={14} value={horas} onChange={(e) => setHoras(Number(e.target.value))} className="mt-2 h-7 w-full" />
          </div>
          <div>
            <label htmlFor="calc-dias" className="flex justify-between text-base font-bold">
              Dias por mês <span>{dias} dias</span>
            </label>
            <input id="calc-dias" type="range" min={12} max={30} value={dias} onChange={(e) => setDias(Number(e.target.value))} className="mt-2 h-7 w-full" />
          </div>
          <div>
            <p className="text-base font-bold">Quantos carros</p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCarros((c) => Math.max(1, c - 1))}
                aria-label="Um carro a menos"
                className="size-12 rounded-xl border-[1.5px] border-[#CFC8B8] bg-giz-2 text-2xl font-bold hover:border-asfalto"
              >
                −
              </button>
              <span className="min-w-16 text-center font-display text-3xl font-extrabold" aria-live="polite">
                {carros}
              </span>
              <button
                type="button"
                onClick={() => setCarros((c) => Math.min(20, c + 1))}
                aria-label="Um carro a mais"
                className="size-12 rounded-xl border-[1.5px] border-[#CFC8B8] bg-giz-2 text-2xl font-bold hover:border-asfalto"
              >
                +
              </button>
              <span className="text-sm text-ardosia">{carros === 1 ? "carro rodando" : "carros ao mesmo tempo"}</span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1.3_1_440px] flex-col gap-5 rounded-3xl bg-asfalto p-7 text-giz" aria-live="polite">
          <div>
            <p className="text-[15px] text-cinza-2">Por mês, o seu anúncio fica</p>
            <p className="mt-1 font-display text-[clamp(42px,5.4vw,66px)] leading-none font-extrabold text-sinal">{nf(horasRua)} horas na rua</p>
            <p className="mt-2 text-cinza">rodando no carrossel, com o carro trabalhando pela cidade</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={card}>
              <p className="text-sm text-cinza-2">Vezes na tela</p>
              <p className="mt-1 font-display text-3xl font-extrabold">{nf(exibicoes)}</p>
            </div>
            <div className={card}>
              <p className="text-sm text-cinza-2">Seu anúncio no ar, somado</p>
              <p className="mt-1 font-display text-3xl font-extrabold">{tempoTela}</p>
            </div>
            <div className={card}>
              <p className="text-sm text-cinza-2">Passageiros diferentes</p>
              <p className="mt-1 font-display text-3xl font-extrabold">~{nf(pessoas)}</p>
            </div>
            <div className={card}>
              <p className="text-sm text-cinza-2">Quilômetros rodados</p>
              <p className="mt-1 font-display text-3xl font-extrabold">~{nf(km)} km</p>
            </div>
          </div>
          <p className="text-base text-cinza">
            É como ir <strong className="text-giz">{(km / KM_BH_SP).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} vezes de BH a São Paulo</strong> com
            a sua marca no banco de trás. Cada passageiro vê o anúncio <strong className="text-giz">{dose ? "7 a 8" : "3 a 4"} vezes</strong> na mesma corrida.
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-dashed border-linha-forte pt-5">
            <div>
              <p className="text-sm text-cinza-2">Investimento sugerido</p>
              <p className="font-display text-4xl font-extrabold">
                {brl(preco)}
                <span className="text-base font-semibold text-cinza-2"> /mês</span>
              </p>
            </div>
            <div className="text-right text-[15px] text-cinza">
              <p>{brl(preco / 30, 2)} por dia</p>
              <p>{brl(preco / pessoas, 2)} por passageiro alcançado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-areia bg-white p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold">Um dia do seu anúncio, em um carro</h3>
          <p className="text-sm text-ardosia">
            cada risco = uma vez na tela · {nf(horas * porHora)} vezes no dia
          </p>
        </div>
        <div className="relative mt-4 h-16 overflow-hidden rounded-xl bg-giz" role="img" aria-label={`${nf(horas * porHora)} exibições entre 7h e ${Math.min(24, INICIO_DIA + horas)}h`}>
          <span className="absolute inset-y-0 bg-[#FFF3CC]" style={{ left: `${riscos.esq}%`, width: `${riscos.larg}%` }} />
          {riscos.lista.map((r, i) => (
            <span key={i} className={`absolute inset-y-3.5 w-0.5 rounded-sm ${r.dupla ? "bg-[#C58A00]" : "bg-asfalto"}`} style={{ left: `${r.esq}%` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[13px] text-ardosia">
          {["6h", "9h", "12h", "15h", "18h", "21h", "24h"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
      <p className="mt-3.5 text-[13px] text-ardosia">
        Estimativa com ciclo de 5 minutos, cerca de {CORRIDAS_POR_HORA} corridas por hora, 1,3 passageiro por corrida, corridas de 18 minutos e {KM_POR_HORA} km/h de
        média na cidade. Preço sugerido pela MidiaAbordo; o valor final você combina com o motorista. O número real de cada mês chega no relatório.
      </p>
    </>
  );
}
