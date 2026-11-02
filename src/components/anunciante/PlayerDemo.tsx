"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ARTES_DEMO, QR_DEMO, QR_ROTA_DEMO, type ArteDemo } from "./artesDemo";

// Demonstração do player do tablet: as artes de exemplo rodando como no carro, com barra de tempo,
// QR code, selo "Aberto agora" e o alerta de proximidade. Comércios fictícios.

type NaTela = { arte: ArteDemo; perto: number | null; chave: string };

const TRANSICAO_MS = 700;
const AUTOCENTER = ARTES_DEMO.find((a) => a.perto) ?? ARTES_DEMO[0];

function Svg({ html, className = "" }: { html: string; className?: string }) {
  // Conteúdo estático gerado pela própria MidiaAbordo (artesDemo.ts), sem nada vindo do usuário.
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Tela({ item }: { item: NaTela }) {
  const { arte, perto } = item;
  return (
    <div className="absolute inset-0">
      <Svg html={arte.svg} className="absolute inset-0 [&>svg]:block [&>svg]:size-full" />

      {/* QR code no lugar reservado da arte (canto inferior direito) */}
      <div className="absolute top-[67%] left-[80.6%] flex w-[16.4%] flex-col items-center rounded-[8%] bg-white p-[1.1%] shadow-md">
        <Svg html={QR_DEMO} className="aspect-square w-full [&>svg]:size-full" />
        <span className="mt-[4%] text-center text-[clamp(5px,1.05cqw,13px)] leading-tight font-semibold whitespace-nowrap text-asfalto">{arte.qr}</span>
      </div>

      {arte.aberto && (
        <span className="absolute top-[8.5%] right-[1.6%] flex items-center gap-[0.5cqw] rounded-full bg-[#0f3d2a]/90 px-[1.2cqw] py-[0.45cqw] text-[clamp(7px,1.25cqw,15px)] font-semibold text-[#c9f5dc]">
          <span className="size-[0.8cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#4ade80]" aria-hidden="true" />
          Aberto agora · {arte.aberto}
        </span>
      )}

      {perto !== null && (
        <div className="absolute top-[15%] right-[2%] flex max-w-[46%] items-center gap-[1.2cqw] rounded-[1.6cqw] bg-asfalto/95 p-[1.3cqw] text-giz shadow-xl ring-2 ring-sinal">
          <div className="min-w-0">
            <p className="font-display text-[clamp(10px,2.5cqw,30px)] leading-tight font-extrabold">
              📍 Você está a <span className="text-sinal">{perto} m</span> daqui
            </p>
            <p className="mt-[0.4cqw] text-[clamp(7px,1.35cqw,16px)] leading-snug text-cinza">Quer passar lá? Peça uma parada ao motorista pelo app.</p>
          </div>
          <figure className="m-0 flex w-[8cqw] flex-none flex-col items-center rounded-[0.8cqw] bg-white p-[0.5cqw]">
            <Svg html={QR_ROTA_DEMO} className="aspect-square w-full [&>svg]:size-full" />
            <figcaption className="text-[clamp(5px,0.95cqw,12px)] font-semibold text-asfalto">Rota até lá</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

function BarraTempo({ duracao, chave }: { duracao: number; chave: string }) {
  const [restante, setRestante] = useState(duracao);
  useEffect(() => {
    const inicio = Date.now();
    setRestante(duracao);
    const t = setInterval(() => setRestante(Math.max(0, Math.ceil(duracao - (Date.now() - inicio) / 1000))), 250);
    return () => clearInterval(t);
  }, [duracao, chave]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10" aria-hidden="true">
      <div className="h-[3px] bg-black/25">
        <div key={chave} className="demo-barra h-full origin-left bg-sinal" style={{ animationDuration: `${duracao}s` }} />
      </div>
      <span className="absolute top-[0.9cqw] right-[1.2cqw] rounded-full bg-black/35 px-[0.8cqw] py-[0.15cqw] text-[clamp(7px,1.1cqw,13px)] font-medium text-white/85 tabular-nums">
        {restante}s
      </span>
    </div>
  );
}

export default function PlayerDemo() {
  const [indice, setIndice] = useState(0);
  const [especial, setEspecial] = useState<NaTela | null>(null);
  const [saindo, setSaindo] = useState<NaTela | null>(null);
  const [rodando, setRodando] = useState(true);
  const [sino, setSino] = useState(false);
  const pendente = useRef(false);
  const contador = useRef(0);
  const visivel = useRef(true);
  const caixa = useRef<HTMLDivElement>(null);

  const normal: NaTela = { arte: ARTES_DEMO[indice % ARTES_DEMO.length], perto: null, chave: `n-${indice}` };
  const atual = especial ?? normal;

  const trocar = useCallback(
    (proximo: () => void) => {
      setSaindo(atual);
      proximo();
      setTimeout(() => setSaindo(null), TRANSICAO_MS);
    },
    [atual],
  );

  const avancar = useCallback(() => {
    trocar(() => {
      if (especial) return setEspecial(null);
      if (pendente.current) {
        pendente.current = false;
        contador.current += 1;
        setIndice((i) => i + 1);
        setEspecial({ arte: AUTOCENTER, perto: AUTOCENTER.perto ?? 350, chave: `p-${contador.current}` });
        setSino(true);
        setTimeout(() => setSino(false), 2200);
        return;
      }
      setIndice((i) => i + 1);
    });
  }, [especial, trocar]);

  // Só roda quando a demo está na tela (economiza bateria de quem rola a página).
  useEffect(() => {
    const el = caixa.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      visivel.current = e.isIntersecting;
      setRodando(e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!rodando) return;
    const t = setTimeout(avancar, atual.arte.duracao * 1000);
    return () => clearTimeout(t);
  }, [atual.chave, atual.arte.duracao, rodando, avancar]);

  function simularProximidade() {
    pendente.current = true;
    // Para a demo não demorar: o anúncio da loja entra já na próxima troca, em até 2 s.
    setTimeout(() => {
      if (pendente.current) avancar();
    }, 1200);
  }

  return (
    <div>
      <div ref={caixa} className="rounded-[28px] bg-asfalto p-3 shadow-[0_30px_60px_rgba(17,22,28,0.35)] ring-1 ring-white/10 sm:p-3.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black [container-type:inline-size]">
          {saindo && (
            <div key={`s-${saindo.chave}`} className="demo-sai absolute inset-0" style={{ animationDuration: `${TRANSICAO_MS}ms` }}>
              <Tela item={saindo} />
            </div>
          )}
          <div key={atual.chave} className={`absolute inset-0 ${saindo ? "demo-entra z-[1]" : ""}`} style={{ animationDuration: `${TRANSICAO_MS}ms` }}>
            <Tela item={atual} />
          </div>
          <BarraTempo duracao={atual.arte.duracao} chave={atual.chave} />
          {sino && (
            <span className="demo-sino absolute right-[2%] bottom-[34%] z-20 rounded-full bg-sinal px-[1.2cqw] py-[0.5cqw] text-[clamp(8px,1.4cqw,16px)] font-bold text-asfalto shadow-lg">
              🔔 plim-plom
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Anúncios da demonstração">
          {ARTES_DEMO.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => trocar(() => (setEspecial(null), setIndice(i)))}
              aria-label={`Mostrar ${a.segmento}`}
              aria-current={!especial && indice % ARTES_DEMO.length === i}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!especial && indice % ARTES_DEMO.length === i ? "bg-asfalto text-giz" : "bg-white text-ardosia ring-1 ring-areia hover:text-asfalto"}`}
            >
              {a.segmento}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-ardosia">Demonstração com comércios fictícios. No carro, cada anúncio fica o tempo contratado (10 a 60 s) e o ciclo se repete o dia todo.</p>

      <button
        type="button"
        onClick={simularProximidade}
        className="mt-5 w-full rounded-2xl bg-sinal px-5 py-4 text-left font-bold text-asfalto shadow-sm hover:bg-sinal-claro sm:w-auto"
      >
        📍 Simular o carro passando perto do Auto Center
      </button>
    </div>
  );
}
