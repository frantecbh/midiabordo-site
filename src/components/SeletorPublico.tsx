import Link from "next/link";

/** Faixa do topo: o site tem dois públicos. */
export default function SeletorPublico({ ativo }: { ativo: "motorista" | "negocio" }) {
  const item = (chave: "motorista" | "negocio", href: string, rotulo: string) => (
    <Link
      href={href}
      aria-current={ativo === chave ? "page" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        ativo === chave ? "bg-sinal text-asfalto" : "text-cinza hover:text-giz"
      }`}
    >
      {rotulo}
    </Link>
  );
  return (
    <div className="border-b border-linha bg-asfalto">
      <nav aria-label="Para quem é" className="mx-auto flex max-w-6xl justify-center gap-1 px-6 py-2 sm:justify-end">
        {item("motorista", "/", "Sou motorista")}
        {item("negocio", "/anuncie/", "Tenho um negócio")}
      </nav>
    </div>
  );
}
