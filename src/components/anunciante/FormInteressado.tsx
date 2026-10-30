"use client";

import { useEffect, useRef, useState } from "react";
import { INTERESSADOS_URL } from "@/lib/config";
import { useSimulacao } from "./Simulacao";

const campo =
  "mt-1.5 w-full rounded-xl border-[1.5px] border-linha-forte bg-asfalto-2 px-4 py-3 text-base text-giz placeholder:text-cinza-2/70 focus:border-sinal focus:outline-none";

export default function FormInteressado() {
  const { resumo } = useSimulacao();
  const aberto = useRef(0);
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "erro">("livre");
  const [erro, setErro] = useState("");

  useEffect(() => {
    aberto.current = Date.now();
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const dados = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const r = await fetch(INTERESSADOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, interesse: resumo, tempoMs: Date.now() - aberto.current }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; erro?: string };
      if (!r.ok || !j.ok) throw new Error(j.erro ?? "Não conseguimos enviar agora. Tente de novo.");
      setEstado("ok");
    } catch (er) {
      setErro((er as Error).message || "Não conseguimos enviar agora. Tente de novo.");
      setEstado("erro");
    }
  }

  if (estado === "ok") {
    return (
      <div role="status" className="rounded-3xl border border-sinal/50 bg-[#1f1d14] p-7">
        <p className="font-display text-2xl font-extrabold text-sinal">Recebemos!</p>
        <p className="mt-2 text-cinza">Vamos te chamar no WhatsApp para indicar um motorista MidiaAbordo que roda na sua região.</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="grid gap-4 rounded-3xl border border-linha bg-cartao p-7 sm:grid-cols-2">
      <div>
        <label htmlFor="int-nome" className="text-sm font-semibold">
          Seu nome
        </label>
        <input id="int-nome" name="nome" required minLength={2} maxLength={80} autoComplete="name" className={campo} />
      </div>
      <div>
        <label htmlFor="int-negocio" className="text-sm font-semibold">
          Nome do negócio
        </label>
        <input id="int-negocio" name="negocio" maxLength={80} autoComplete="organization" className={campo} />
      </div>
      <div>
        <label htmlFor="int-whats" className="text-sm font-semibold">
          WhatsApp
        </label>
        <input id="int-whats" name="whatsapp" type="tel" required autoComplete="tel" placeholder="(31) 9 0000-0000" className={campo} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="int-cidade" className="text-sm font-semibold">
            Cidade
          </label>
          <input id="int-cidade" name="cidade" required maxLength={60} autoComplete="address-level2" className={campo} />
        </div>
        <div>
          <label htmlFor="int-bairro" className="text-sm font-semibold">
            Bairro
          </label>
          <input id="int-bairro" name="bairro" maxLength={60} className={campo} />
        </div>
      </div>
      {/* Campo-isca contra robôs: escondido de pessoas e leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="int-site">Site</label>
        <input id="int-site" name="site" tabIndex={-1} autoComplete="off" />
      </div>
      {resumo && <p className="text-sm text-cinza-2 sm:col-span-2">Você simulou: {resumo}</p>}
      {estado === "erro" && (
        <p role="alert" className="rounded-xl border border-[#7a3b2e] bg-[#2a1814] px-4 py-3 text-sm text-[#ffb4a2] sm:col-span-2">
          {erro}
        </p>
      )}
      <button
        type="submit"
        disabled={estado === "enviando"}
        className="rounded-2xl bg-sinal px-7 py-4 text-lg font-bold text-asfalto hover:bg-sinal-claro disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {estado === "enviando" ? "Enviando…" : "Quero anunciar no meu bairro"}
      </button>
    </form>
  );
}
