import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      Midia<span className="text-sinal">Abordo</span>
    </span>
  );
}

export function Rotulo({ children, tom = "escuro" }: { children: ReactNode; tom?: "escuro" | "claro" }) {
  return (
    <p className={`text-sm font-bold tracking-[0.1em] uppercase ${tom === "claro" ? "text-ocre" : "text-sinal"}`}>
      {children}
    </p>
  );
}

export function TituloSecao({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3 font-display text-[clamp(32px,4.2vw,52px)] leading-[1.05] font-extrabold tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function BotaoPrimario({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-block rounded-2xl bg-sinal px-7 py-4.5 text-lg font-bold text-asfalto transition-colors hover:bg-sinal-claro ${className}`}
    >
      {children}
    </a>
  );
}
