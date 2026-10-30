import type { Metadata } from "next";
import Link from "next/link";
import Calculadora from "@/components/anunciante/Calculadora";
import FormInteressado from "@/components/anunciante/FormInteressado";
import { ProvedorSimulacao } from "@/components/anunciante/Simulacao";
import SeletorPublico from "@/components/SeletorPublico";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Anuncie em carros de aplicativo — MidiaAbordo",
  description:
    "Seu anúncio numa tela atrás do banco de carros de aplicativo que rodam o dia inteiro pela sua cidade. Veja quantas horas ele fica na rua e quanto custa.",
  alternates: { canonical: "/anuncie/" },
  openGraph: {
    title: "Seu anúncio sentado de frente para o seu cliente — MidiaAbordo",
    description: "Uma tela atrás do banco de carros de aplicativo. 15 a 20 minutos de atenção por corrida, sem pular.",
    url: "https://midiabordo.com.br/anuncie/",
    siteName: "MidiaAbordo",
    locale: "pt_BR",
    type: "website",
  },
};

const numeros = [
  { valor: "15–20 min", texto: "de atenção por corrida, sentado" },
  { valor: "3 a 4 vezes", texto: "o passageiro vê seu anúncio na mesma corrida" },
  { valor: "0 botão de pular", texto: "nada de feed, nada de concorrente ao lado" },
  { valor: "R$ 3 por dia", texto: "um anúncio de 15 s em um carro, preço sugerido" },
];

const motivos = [
  { titulo: "Sem concorrência na tela", texto: "Nada de feed, nada de outro anúncio do lado. Quando é a sua vez, a tela inteira é sua." },
  { titulo: "Na altura dos olhos", texto: "O tablet fica no encosto do banco da frente, a meio metro do passageiro. É difícil não ver." },
  { titulo: "Na sua cidade", texto: "Motoristas que rodam onde seu cliente mora e trabalha. Propaganda local, de verdade." },
  { titulo: "Resultado medido", texto: "O QR code leva direto ao seu WhatsApp com a mensagem pronta, e cada leitura entra no relatório." },
];

const rotulo = "text-sm font-bold tracking-[0.12em] text-ocre uppercase";
const titulo = "mt-3 font-display text-[clamp(32px,4.4vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em]";

export default function Anuncie() {
  return (
    <main className="min-h-screen bg-giz text-[17px] leading-relaxed text-asfalto">
      <SeletorPublico ativo="negocio" />
      <header className="bg-asfalto text-giz">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-giz no-underline" aria-label="MidiaAbordo, início">
            <Logo className="text-[22px]" />
          </Link>
          <a href="#quero-anunciar" className="rounded-full bg-sinal px-5 py-2.5 font-bold text-asfalto hover:bg-sinal-claro">
            Quero anunciar
          </a>
        </div>
      </header>

      <ProvedorSimulacao>
        <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-6 pt-16 pb-14">
          <div className="min-w-0 flex-[999_1_480px]">
            <p className={rotulo}>Para quem tem um negócio</p>
            <h1 className="mt-3.5 font-display text-[clamp(40px,6vw,76px)] leading-[0.98] font-extrabold tracking-[-0.035em]">
              Seu anúncio sentado de frente para o seu cliente.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-ardosia">
              Uma tela atrás do banco de carros de aplicativo que rodam o dia inteiro pela sua cidade. O passageiro fica 15 a 20 minutos ali, sem pular, sem
              rolar a tela, olhando para o seu anúncio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#calculadora" className="rounded-2xl bg-asfalto px-6 py-4 text-[17px] font-bold text-giz hover:bg-asfalto-2">
                Ver quanto meu anúncio roda
              </a>
              <a href="#quero-anunciar" className="rounded-2xl border-2 border-asfalto px-6 py-3.5 text-[17px] font-bold text-asfalto hover:bg-white">
                Quero anunciar no meu bairro
              </a>
            </div>
          </div>
          <figure className="m-0 min-w-0 flex-[1_1_360px]">
            <div className="rounded-[28px] bg-asfalto p-3.5 shadow-[0_30px_60px_rgba(17,22,28,0.25)]">
              <div className="relative grid aspect-[16/10] grid-cols-[74fr_26fr] grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-[#8A3B12] text-white">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-black/30">
                  <div className="h-full w-2/5 bg-sinal" />
                </div>
                <div className="p-3 pr-1.5 pb-1.5">
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-[#222A33] text-xs text-white/60">o seu vídeo aqui</div>
                </div>
                <div className="col-start-2 row-span-2 flex flex-col items-center justify-between p-4 pr-2.5 pl-1 text-center">
                  <p className="font-display text-sm leading-tight font-extrabold">Seu Negócio</p>
                  <p className="font-display text-lg font-extrabold whitespace-nowrap text-sinal">R$ 19,90</p>
                  <div className="grid size-16 grid-cols-3 gap-0.5 rounded-lg bg-white p-1.5" aria-hidden="true">
                    {[1, 0, 1, 0, 1, 0, 1, 1, 1].map((v, i) => (
                      <span key={i} className={v ? "bg-asfalto" : ""} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1 p-3.5 pt-1">
                  <p className="font-display text-xl leading-none font-extrabold">A sua oferta, em letras grandes.</p>
                  <p className="text-[11px] opacity-90">Endereço · horário · WhatsApp pelo QR</p>
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-sm text-ardosia">Como o seu anúncio aparece no tablet do carro</figcaption>
          </figure>
        </section>

        <section className="bg-asfalto text-giz">
          <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 px-6 py-7">
            {numeros.map((n) => (
              <div key={n.valor}>
                <p className="font-display text-[34px] leading-tight font-extrabold text-sinal">{n.valor}</p>
                <p className="text-cinza">{n.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="calculadora" className="mx-auto max-w-6xl scroll-mt-4 px-6 py-20">
          <p className={rotulo}>Calculadora</p>
          <h2 className={`${titulo} max-w-3xl`}>Quanto tempo o seu anúncio fica na rua?</h2>
          <p className="mt-3 max-w-2xl text-lg text-ardosia">
            Mexa nos números. A conta usa o carrossel de 5 minutos da tela: seu anúncio volta a aparecer a cada ciclo, o dia todo.
          </p>
          <Calculadora />
        </section>

        <section className="border-y border-areia bg-giz-2">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className={rotulo}>Por que funciona</p>
            <h2 className={`${titulo} max-w-3xl`}>Atenção que o celular não dá.</h2>
            <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {motivos.map((m) => (
                <div key={m.titulo} className="rounded-2xl border border-areia bg-white p-6">
                  <p className="text-lg font-bold">{m.titulo}</p>
                  <p className="mt-2 text-ardosia">{m.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-10 px-6 py-20">
          <div className="min-w-0 flex-[1_1_380px]">
            <p className={rotulo}>Todo mês</p>
            <h2 className={titulo}>Você recebe o relatório. Não precisa acreditar na gente.</h2>
            <p className="mt-3.5 text-lg text-ardosia">
              O tablet conta cada vez que o seu anúncio aparece, as horas na rua e quantas pessoas leram o QR code. O motorista te manda pelo WhatsApp.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_400px] rounded-3xl border border-areia bg-white p-6 shadow-[0_20px_40px_rgba(17,22,28,0.08)]">
            <p className="font-display font-extrabold">
              Midia<span className="text-ocre">Abordo</span> · Relatório do mês
            </p>
            <p className="text-sm text-ardosia">Exemplo · estático de 15 s · 1 carro, 8 h por dia, 22 dias</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                ["Vezes na tela", "2.112"],
                ["Horas na rua", "176 h"],
                ["Quilômetros", "~2.816 km"],
                ["Leituras do QR", "conta cada uma"],
              ].map(([r, v]) => (
                <div key={r} className="rounded-xl bg-giz p-3">
                  <p className="text-[13px] text-ardosia">{r}</p>
                  <p className="text-2xl font-extrabold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="quero-anunciar" className="scroll-mt-4 bg-asfalto text-giz">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-10 px-6 py-20">
            <div className="min-w-0 flex-[1_1_340px]">
              <h2 className="font-display text-[clamp(30px,4vw,46px)] leading-[1.04] font-extrabold tracking-tight">
                Comece com um carro. <span className="text-sinal">Veja o relatório no fim do mês.</span>
              </h2>
              <p className="mt-3 text-lg text-cinza">
                Deixe seu contato e indicamos um motorista MidiaAbordo que roda na sua região. Viu a tela num carro? Aponte a câmera para o QR “Anuncie neste
                carro” e fale direto com o motorista.
              </p>
            </div>
            <div className="min-w-0 flex-[1.4_1_440px]">
              <FormInteressado />
            </div>
          </div>
        </section>
      </ProvedorSimulacao>

      <footer className="bg-asfalto-2 text-cinza-2">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 py-6 text-sm">
          <Logo className="text-base text-giz" />
          <Link href="/" className="hover:text-giz">
            É motorista de aplicativo? Conheça a MidiaAbordo
          </Link>
        </div>
      </footer>
    </main>
  );
}
