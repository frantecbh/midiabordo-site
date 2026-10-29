import Planos from "@/components/Planos";
import Simulador from "@/components/Simulador";
import { BotaoPrimario, Logo, Rotulo, TituloSecao } from "@/components/ui";
import { brl, CADASTRO_URL, DIAS_TESTE, LOGIN_URL, MENOR_MENSALIDADE, TELA_MINIMA_POLEGADAS } from "@/lib/config";

const passos = [
  {
    titulo: "Instale o tablet",
    texto: `Um tablet de ${TELA_MINIMA_POLEGADAS} polegadas ou mais, preso atrás do banco do passageiro com um suporte de encosto.`,
  },
  {
    titulo: "Feche com os comércios",
    texto: "Padaria, barbearia, academia, pet shop: ofereça o espaço na sua tela pelo preço que você definir.",
  },
  {
    titulo: "Cadastre o anúncio",
    texto: "Suba a arte ou o vídeo pelo celular. O carrossel monta sozinho, no tempo que o cliente contratou.",
  },
  {
    titulo: "Receba e prove o resultado",
    texto: "Controle quem já pagou e mande ao comerciante o relatório de quantas vezes o anúncio dele passou.",
  },
];

const destaques = [
  { titulo: "100% para você", texto: "Sem comissão sobre o que você vende." },
  { titulo: "Você define o preço", texto: "Pix, dinheiro: você escolhe como recebe." },
  { titulo: "Sem som, sem incômodo", texto: "Vídeos sempre mudos e legendados." },
  { titulo: "Funciona sem internet", texto: "Os anúncios ficam salvos no tablet." },
];

const recursos = [
  { titulo: "Painel no celular", texto: "Clientes, contratos e anúncios na palma da mão." },
  { titulo: "Controle de recebimentos", texto: "Saiba quem pagou e quem está pendente." },
  { titulo: "Relatório para o comerciante", texto: "Quantas vezes o anúncio passou, pronto para mandar no WhatsApp." },
  { titulo: "Seus anúncios, só no seu carro", texto: "Ninguém mais exibe ou vê os seus clientes." },
];

const duvidas = [
  {
    p: "Preciso comprar um tablet?",
    r: `Sim. O tablet é seu: qualquer modelo Android com tela de ${TELA_MINIMA_POLEGADAS} polegadas ou mais, preso atrás do banco do passageiro com um suporte de encosto.`,
  },
  {
    p: "Quem recebe o dinheiro dos anúncios?",
    r: "Você. O comerciante paga direto para você, por Pix, dinheiro ou do jeito que vocês combinarem. A MidiaAbordo não fica com nenhuma parte; você paga só a mensalidade do seu plano.",
  },
  {
    p: "O anúncio vai incomodar o passageiro?",
    r: "Não. A tela nunca toca som e os vídeos precisam ter legenda. O passageiro olha se quiser.",
  },
  {
    p: "E se a internet cair no meio da corrida?",
    r: "O carrossel continua. Os anúncios ficam salvos no tablet e o registro das exibições é enviado quando a conexão volta.",
  },
  {
    p: "Posso anunciar qualquer coisa?",
    r: "Não. Propaganda política e eleitoral é proibida em carro de aplicativo, e conteúdo adulto, apostas, armas e cigarro também ficam de fora.",
  },
  {
    p: "Qual a diferença entre os planos?",
    r: "O Essencial é só para anúncios em imagem, com até 10 no ar. O Profissional libera vídeo e até 15 anúncios. O Ilimitado não tem limite de anúncios e o carrossel pode ter até 8 minutos. Você pode mudar de plano quando quiser.",
  },
  {
    p: "O que acontece se eu atrasar a mensalidade?",
    r: "Você tem alguns dias de carência com avisos. Depois disso a tela para de exibir até o pagamento ser confirmado, e volta na hora.",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen text-[17px] leading-relaxed">
      {/* Cabeçalho */}
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <a href="#topo" className="flex items-center gap-2.5 text-giz no-underline" aria-label="MidiaAbordo, início">
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-sinal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#11161C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </span>
          <Logo className="text-[22px]" />
        </a>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-6 text-[15px]">
          <a href="#como-funciona" className="text-cinza hover:text-giz">Como funciona</a>
          <a href="#ganhos" className="text-cinza hover:text-giz">Simule seus ganhos</a>
          <a href="#planos" className="text-cinza hover:text-giz">Planos</a>
          <a href="#duvidas" className="text-cinza hover:text-giz">Dúvidas</a>
          <a href={LOGIN_URL} className="text-cinza hover:text-giz">Entrar</a>
          <a href={CADASTRO_URL} className="rounded-full bg-sinal px-5 py-3 font-bold text-asfalto hover:bg-sinal-claro">
            Testar {DIAS_TESTE} dias grátis
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="topo" className="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-6 pt-14 pb-22">
        <div className="min-w-0 flex-[1_1_480px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2E3845] px-3.5 py-1.5 text-sm text-cinza">
            <span className="size-2 rounded-full bg-sinal" />
            Para motoristas de aplicativo
          </p>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
            Seu passageiro olha para o banco da frente.{" "}
            <span className="text-sinal">Faça esse olhar virar dinheiro.</span>
          </h1>
          <p className="mt-7 max-w-xl text-xl text-cinza">
            Coloque um tablet atrás do banco do passageiro, venda o espaço para os comércios do seu bairro e receba
            direto no seu Pix. A MidiaAbordo cuida da tela, do carrossel e dos relatórios.{" "}
            <strong className="text-giz">O dinheiro dos anúncios é 100% seu.</strong>
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <BotaoPrimario href={CADASTRO_URL}>Começar meu teste grátis</BotaoPrimario>
            <a href="#ganhos" className="rounded-2xl border-[1.5px] border-linha-forte px-7 py-4.5 text-lg font-semibold text-giz hover:border-cinza-2">
              Quanto eu posso ganhar?
            </a>
          </div>
          <p className="mt-4.5 text-sm text-cinza-2">
            {DIAS_TESTE} dias grátis com tudo liberado · planos a partir de {brl(MENOR_MENSALIDADE)}/mês · cancele quando quiser
          </p>
        </div>

        <div className="flex min-w-0 flex-[1_1_420px] justify-center" aria-hidden="true">
          <div className="w-full max-w-[460px] rounded-[56px_56px_28px_28px] border border-linha bg-[#1E252E] px-9 pt-11 pb-16">
            <div className="mx-auto mb-7 h-4.5 w-2/5 rounded-b-[14px] bg-linha" />
            <div className="rounded-[18px] border border-[#333D49] bg-[#0A0D11] p-3">
              <div className="flex aspect-[16/10] flex-col justify-between rounded-[10px] bg-giz p-5.5 text-asfalto">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold tracking-[0.08em] text-ocre uppercase">Padaria do bairro</span>
                  <span className="rounded-full bg-asfalto px-2 py-1 text-[11px] font-bold text-giz">15s</span>
                </div>
                <p className="font-display text-[clamp(22px,3vw,30px)] leading-[1.05] font-extrabold tracking-tight">
                  Pão de queijo quentinho a 2 quadras daqui.
                </p>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-[13px] text-ardosia">Mostre esta tela e ganhe um café</span>
                  <span className="flex size-13 items-center justify-center rounded-md bg-asfalto text-center text-[9px] font-bold text-giz">
                    QR CODE
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4.5 flex justify-center gap-1.5">
              <span className="h-1.5 w-5.5 rounded-full bg-sinal" />
              <span className="size-1.5 rounded-full bg-linha-forte" />
              <span className="size-1.5 rounded-full bg-linha-forte" />
              <span className="size-1.5 rounded-full bg-linha-forte" />
            </div>
            <p className="mt-3.5 text-center text-[13px] text-cinza-2">Exemplo de anúncio no carrossel · sem som</p>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section aria-label="Destaques" className="border-y border-[#222A34] bg-asfalto-2">
        <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 px-6 py-7">
          {destaques.map((d) => (
            <div key={d.titulo}>
              <p className="font-bold text-sinal">{d.titulo}</p>
              <p className="mt-1 text-[15px] text-cinza">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
        <Rotulo>Como funciona</Rotulo>
        <TituloSecao className="max-w-3xl">Quatro passos entre o seu carro e uma renda extra todo mês.</TituloSecao>
        <ol className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 p-0">
          {passos.map((p, i) => (
            <li key={p.titulo} className="rounded-[20px] border border-linha bg-cartao p-7">
              <p className="font-display text-[44px] leading-none font-extrabold text-sinal">{i + 1}</p>
              <h3 className="mt-4.5 mb-2 text-xl font-semibold">{p.titulo}</h3>
              <p className="text-base text-cinza">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Simulador */}
      <section id="ganhos" className="bg-giz text-asfalto">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-6 py-24">
          <div className="min-w-0 flex-[1_1_420px]">
            <Rotulo tom="claro">Simule seus ganhos</Rotulo>
            <TituloSecao>Poucos clientes já pagam a mensalidade. O resto é lucro.</TituloSecao>
            <p className="mt-5 max-w-md text-lg text-ardosia">
              Arraste e digite com os seus números. Você define quantos comércios atende e quanto cobra de cada um por mês.
            </p>
          </div>
          <Simulador />
        </div>
      </section>

      {/* Formatos */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Rotulo>O que você vende</Rotulo>
        <TituloSecao className="max-w-3xl">Dois formatos prontos para oferecer ao comerciante.</TituloSecao>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          <div className="rounded-3xl border border-linha bg-cartao p-8">
            <h3 className="text-2xl font-semibold">Anúncio estático</h3>
            <p className="mt-2 text-cinza">A arte do cliente na tela, com QR code opcional para ele medir o retorno.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border-[1.5px] border-sinal px-4 py-2 font-bold text-sinal">Pacote 10 segundos</span>
              <span className="rounded-full border-[1.5px] border-sinal px-4 py-2 font-bold text-sinal">Pacote 15 segundos</span>
              <span className="rounded-full border-[1.5px] border-linha-forte px-4 py-2 font-bold text-giz">Dose dupla</span>
            </div>
          </div>
          <div className="rounded-3xl border border-linha bg-cartao p-8">
            <h3 className="text-2xl font-semibold">Anúncio em vídeo</h3>
            <p className="mt-2 text-cinza">O vídeo do cliente, sempre sem som e com legenda, para não incomodar o passageiro.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border-[1.5px] border-sinal px-4 py-2 font-bold text-sinal">De 30 a 60 segundos</span>
              <span className="rounded-full border-[1.5px] border-linha-forte px-4 py-2 font-bold text-giz">Dose dupla</span>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 rounded-3xl border border-linha bg-asfalto-2 p-8">
          {recursos.map((r) => (
            <div key={r.titulo}>
              <p className="font-bold">{r.titulo}</p>
              <p className="mt-1 text-[15px] text-cinza">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="border-t border-[#222A34]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Rotulo>Planos</Rotulo>
          <TituloSecao>Comece grátis. Pague só se valer a pena.</TituloSecao>
          <p className="mt-4 max-w-2xl text-lg text-cinza">
            Escolha o plano agora e teste {DIAS_TESTE} dias grátis com tudo liberado. A primeira cobrança só acontece depois do
            teste, e no anual você paga 10 meses e leva 12.
          </p>
          <Planos />
        </div>
      </section>

      {/* Dúvidas */}
      <section id="duvidas" className="border-t border-[#222A34] bg-asfalto-2">
        <div className="mx-auto max-w-[880px] px-6 py-24">
          <Rotulo>Dúvidas</Rotulo>
          <TituloSecao className="mb-10">Perguntas de motorista.</TituloSecao>
          {duvidas.map((d, i) => (
            <details key={d.p} className={`border-t border-linha py-5.5 ${i === duvidas.length - 1 ? "border-b" : ""}`}>
              <summary className="cursor-pointer text-[19px] font-bold">{d.p}</summary>
              <p className="mt-3 text-cinza">{d.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Chamada final */}
      <section id="cadastro" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-12 px-6 py-24">
        <div className="min-w-0 flex-[1_1_520px]">
          <h2 className="font-display text-[clamp(36px,5vw,60px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
            Seu carro já roda a cidade inteira. <span className="text-sinal">Agora ele também anuncia.</span>
          </h2>
          <p className="mt-5 text-[19px] text-cinza">
            Crie sua conta e libere seus {DIAS_TESTE} dias grátis. Sem cartão para começar.
          </p>
        </div>
        <BotaoPrimario href={CADASTRO_URL} className="px-9 py-5 text-xl">
          Quero meus {DIAS_TESTE} dias grátis
        </BotaoPrimario>
      </section>

      <footer className="border-t border-[#222A34]">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-8 text-sm text-cinza-2">
          <span>
            <Logo className="text-base text-giz" /> · midiabordo.com.br
          </span>
          <span>© {new Date().getFullYear()} MidiaAbordo</span>
        </div>
      </footer>
    </main>
  );
}
