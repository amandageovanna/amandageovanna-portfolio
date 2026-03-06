import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  User,
  FileText,
  BookOpen,
  Grid,
  GraduationCap,
  Briefcase,
  Code,
  Cloud,
  Linkedin,
  Github,
  Book,
  Dumbbell,
  Sparkles,
  Puzzle,
} from "lucide-react";

/**
 * Portfólio base (sidebar + conteúdo).
 * Mantido em JS/JSX para evitar problemas de parser em sandboxes.
 */

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "Sobre mim", icon: User },
  { id: "resume", label: "Resumo Profissional", icon: FileText },
  { id: "dedicacao", label: "Resumo Acadêmico", icon: BookOpen },
  { id: "itau", label: "Trajetória no Itaú", icon: Grid },
];

function TechPill({ label }) {
  return (
    <span
      className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm"
      style={{ borderColor: "rgba(0,0,0,.08)" }}
    >
      {label}
    </span>
  );
}

function TechPillGroup({ items = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <TechPill key={t} label={t} />
      ))}
    </div>
  );
}


function SkillBar({ label, value }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-700">{label}</span>
        <span className="text-zinc-500">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200">
        <div
          className="h-2 rounded-full"
          style={{ width: `${value}%`, background: "var(--accent)" }}
        />
      </div>
    </div>
  );
}

function InterestItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" style={{ color: "var(--accent)" }} />
      <div className="text-sm font-semibold text-zinc-800">{label}</div>
    </div>
  );
}

function ProjectCard({ image, title, description, link, linkLabel }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white/60 shadow-sm transition hover:bg-white/80">
      <div className="aspect-[16/10] w-full bg-white">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="text-sm font-extrabold text-zinc-900">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-zinc-700">{description}</div>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {linkLabel || "Saiba mais"}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function EducationCard({ item, theme }) {
  return (
    <div className="max-w-xl rounded-2xl border bg-white/60 p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {item.logo ? (
            <img
              src={item.logo}
              alt="logo instituição"
              className="mt-1 h-12 w-12 rounded-md object-contain"
              loading="lazy"
            />
          ) : null}
          <div>
            <div className="font-semibold text-zinc-900">{item.curso}</div>
            <div className="text-sm text-zinc-600">{item.detalhe}</div>
          </div>
        </div>

        <span
          className="shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs"
          style={{ background: theme.accentSoft, color: "#111827" }}
        >
          {item.periodo}
        </span>
      </div>
    </div>
  );
}

function ExperienceCard({ xp, theme }) {
  return (
    <div className="max-w-xl rounded-2xl border bg-white/60 p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {xp.logo ? (
            <img
              src={xp.logo}
              alt="logo empresa"
              className="mt-1 h-12 w-12 rounded-md object-contain"
              loading="lazy"
            />
          ) : null}
          <div>
            <div className="font-semibold text-zinc-900">{xp.empresa}</div>
            <div className="text-sm text-zinc-700">{xp.cargo}</div>
          </div>
        </div>

        <span
          className="shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs"
          style={{ background: theme.accentSoft, color: "#111827" }}
        >
          {xp.periodo}
        </span>
      </div>
    </div>
  );
}

function AboutHero({ theme, onGoItau, onGoAbout }) {
  return (
    <div
      className="relative overflow-hidden rounded-[26px] border p-8 sm:p-12"
      style={{
        borderColor: "rgba(0,0,0,.10)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,.65), rgba(255,255,255,.35))",
      }}
    >
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: theme.accentSoft }}
      />
      <div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full"
        style={{ background: theme.accentSoft }}
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="text-sm text-zinc-600">Olá, eu sou</div>
        <h1
          className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: theme.accent }}
        >
          Amanda Geovanna
        </h1>
        
      
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-700 sm:text-base">
          Bem-vindo ao meu portfólio. Aqui você pode conhecer minha trajetória,
          projetos acadêmicos e experiências na área de dados. Use o menu lateral
          ou os botões abaixo para navegar.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={onGoItau}
            className="rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:opacity-90"
            style={{ background: theme.ctaBg, color: theme.ctaText }}
          >
            Trajetória no Itaú
          </button>
          <button
            onClick={onGoAbout}
            className="rounded-xl border bg-white/60 px-4 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-white"
            style={{ borderColor: "rgba(0,0,0,.10)" }}
          >
            Sobre mim
          </button>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item }) {
  return (
    <div className="relative pl-12">
      <div
        className="absolute left-0 top-1 h-4 w-4 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      
      <div className="text-lg font-extrabold text-zinc-900">{item.title}</div>
      {item.subtitle ? (
        <div className="mt-2 text-sm font-semibold text-zinc-800">{item.subtitle}</div>
      ) : null}
      {item.bullets?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          {item.bullets.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Badge({ href, src, alt }) {
  const Img = (
    <img
      src={src}
      alt={alt}
      className="h-32 w-32 object-contain rounded-xl border bg-white p-3 shadow-sm transition hover:scale-105"
      loading="lazy"
    />
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {Img}
    </a>
  ) : (
    Img
  );
}

// -------------------------------
// “Tests” simples (dev checks)
// -------------------------------
(function devChecks() {
  const ids = NAV.map((n) => n.id);
  const unique = new Set(ids);

  // eslint-disable-next-line no-console
  console.assert(unique.size === ids.length, "[Portfolio] NAV possui ids duplicados");

  // eslint-disable-next-line no-console
  console.assert(
    NAV.some((n) => n.id === "itau"),
    "[Portfolio] NAV deveria conter a rota 'itau'"
  );

  // eslint-disable-next-line no-console
  console.assert(typeof ProjectCard === "function", "[Portfolio] ProjectCard deveria ser uma função");

  // eslint-disable-next-line no-console
  console.assert(typeof Badge === "function", "[Portfolio] Badge deveria ser uma função");

  // Extra dev checks
  // eslint-disable-next-line no-console
  console.assert(typeof SkillBar === "function", "[Portfolio] SkillBar deveria ser uma função");
  // eslint-disable-next-line no-console
  console.assert(typeof TimelineItem === "function", "[Portfolio] TimelineItem deveria ser uma função");

  // Badge URLs sanity
  // eslint-disable-next-line no-console
  console.assert(
    "https://www.credly.com/badges/d0121974-6ef7-4e53-8b2c-085d01e0aaf6/linked_in_profile".includes(
      "credly.com/badges/"
    ),
    "[Portfolio] Badge URL (Credly) deveria conter credly.com/badges"
  );
})();

export default function PortfolioBaseLayout() {
  const [active, setActive] = useState("home");
  const [academicoTab, setAcademicoTab] = useState("dados");
  const [themeMode, setThemeMode] = useState("rose");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("amanda-portfolio-theme");
      if (saved === "rose" || saved === "itau") setThemeMode(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("amanda-portfolio-theme", themeMode);
    } catch {
      // ignore
    }
  }, [themeMode]);

  const theme = useMemo(() => {
    if (themeMode === "itau") {
      return {
        bg: "#FFFFFF",
        panel: "rgba(255,255,255,.92)",
        sidebar: "rgba(0,0,0,.04)",
        accent: "#FF6200",
        accentSoft: "rgba(255,98,0,.18)",
        ctaBg: "#FF6200",
        ctaText: "#FFFFFF",
      };
    }

    // Tema atual (rosa) — um pouco mais escuro
    return {
      bg: "#F5F0E6",
      panel: "rgba(255,255,255,.50)",
      sidebar: "rgba(0,0,0,.06)",
      accent: "#F57A8A",
      accentSoft: "rgba(245,122,138,.25)",
      ctaBg: "#FF6200",
      ctaText: "#FFFFFF",
    };
  }, [themeMode]);

  const brand = useMemo(
    () => (
      <>
        <span className="text-zinc-900">A</span>
        <span style={{ color: theme.accent }}>manda </span>
        <span className="text-zinc-900">G</span>
        <span style={{ color: theme.accent }}>.</span>
      </>
    ),
    [theme.accent]
  );

  const educationItems = useMemo(
    () => [     
      {
        curso: "SIS — Impacta Tecnologia",
        logo:
          "https://media.licdn.com/dms/image/v2/C4D0BAQEG8qandFQNjw/company-logo_200_200/company-logo_200_200/0/1630550349647/impacta_tecnologia_logo?e=1773878400&v=beta&t=pBbNqG1bPEK81tbnRrv-OHdTc7mYXqFpCDBtej6lfGY",
        detalhe: "Bacharelado em Sistemas de Informação",
        periodo: "2025–2028",
      },
      {
        curso: "ADS — SPTech",
        logo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaC1HUrJ7tn8-Kthf32n0ooqS8Ls5xxB3i4A&s",
        detalhe: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        periodo: "2023–2025",
      },
      {
        curso: "Enfermagem — UNIP",
        logo:
          "https://media.licdn.com/dms/image/v2/D4D0BAQHBvbGquYuc4w/company-logo_100_100/company-logo_100_100/0/1725888891748?e=1773878400&v=beta&t=ytWWb8zAVid2pFW0qWO7pIGjXw0TcEtIceZVKMqQDVU",
        detalhe: "Graduação — Incompleta",
        periodo: "2020–2022",
      },
    ],
    []
  );

  const experienceItems = useMemo(
    () => [
      {
        empresa: "Estagiária Eng. de Dados",
        cargo: "Itaú",
        periodo: "2025 - Atual",
        logo:
          "https://media.licdn.com/dms/image/v2/D4D0BAQGmyPiGIU-69w/company-logo_200_200/B4DZZFc2k4GgAI-/0/1744921914031/itau_logo?e=1773878400&v=beta&t=azgxleKyTLaic1d3U6qkCfd8VwySvELiFpNAjyGe_7g",
      },
      {
        empresa: "Estagiária Salesforce",
        cargo: "Elera",
        periodo: "2024-2025",
        logo:
          "https://media.licdn.com/dms/image/v2/D4D0BAQF38uJRF4pfog/company-logo_200_200/company-logo_200_200/0/1704829713759/ercic_logo?e=2147483647&v=beta&t=MmO5Gi00iSBrHnTzL4r9gfULxwF5txRMiED6Ot5-iEA",
      },
      {
        empresa: "Operadora de Atendimento",
        cargo: "Hospital BP",
        periodo: "2021-2023",
        logo:
          "https://media.licdn.com/dms/image/v2/C4E0BAQHyz7zwGnYusg/company-logo_200_200/company-logo_200_200/0/1631342193186?e=1773878400&v=beta&t=6z-PFclaXzRKc6E4m1cqB7VrKEAaIvCDIh0I_s5y6go",
      },
      {
        empresa: "Aprendiz",
        cargo: "Hospital Rede D'Or",
        periodo: "2019-2020",
        logo:
          "https://media.licdn.com/dms/image/v2/D4D0BAQHN4dv08rV5TA/company-logo_100_100/B4DZpJGxNBH0AQ-/0/1762163103503/rededor_logo?e=1773878400&v=beta&t=HTDOgNmJ30JDoNoYNV7pMLzmQ9roYz_KLt4B2Y1gUGc",
      },
    ],
    []
  );

  const itauTimeline = useMemo(
    () => [
      {
        title: "Adaptação ao ecossistema de dados",
        subtitle: "Integração à comunidade da Esteira Única de Investimentos",
        bullets: [
          "Onboarding na comunidade da Esteira Única de Investimentos.",
          "Realização das trilhas obrigatórias de formação do estágio.",
          "Introdução à arquitetura de dados do Itaú e às camadas da esteira (SOR, SOT, Spec).",
          "Compreensão do fluxo de dados de posição e movimento de investimentos.",
          "Primeiros contatos com serviços da AWS utilizados no pipeline de dados.",
        ],
      },
      {
        title: "Observabilidade e monitoramento de pipelines",
        subtitle: "Atuação em monitoramento e coleta de logs",
        bullets: [
          "Execução de scripts de coleta utilizando ECS.",
          "Centralização de logs e monitoramento via AWS CloudWatch.",
          "Integração com Datadog para observabilidade e acompanhamento de execução.",
        ],
      },
      {        
        title: "Ingestão e estruturação de dados (PEP)",
        subtitle: "Implementação de ingestão de dados de posição e movimento",
        bullets: [
          "Estruturação da ingestão até a camada SOT / Mesh.",
          "Processamento e organização de dados no pipeline.",
          "Mapeamento e documentação do De/Para de campos entre a camada Mesh e os jobs de processamento em AWS Glue.",
          "Criação de tabelas e validação de campos para garantir consistência nas transformações de dados.",
          "Disponibilização das informações no RDS para consumo downstream.",
        ],
      },
      {
        title: "Data Quality e validação de regras de negócio",
        subtitle: "Aplicação de validações ao longo do pipeline",
        bullets: [
          "Implementação de regras de Data Quality.",
          "Validação de consistência entre cálculos financeiros e indicadores.",
          "Ajustes em processos de qualidade para reduzir inconsistências nos dados.",
        ],
      },
      {        
        title: "Otimização de performance",
        subtitle: "Iniciativa de melhoria de performance e custo",
        bullets: [
          "POC para análise do problema de small files no S3.",
          "Simulação de geração de múltiplos arquivos Parquet em jobs Glue.",
          "Estudo e experimentação sobre compactação de small files no S3.",
        ],
      },
    ],
    []
  );

  // eslint-disable-next-line no-console
  console.assert(itauTimeline.length > 0, "[Portfolio] Timeline do Itaú não deveria estar vazia");

  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.bg,
        "--accent": theme.accent,
        "--accentSoft": theme.accentSoft,
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* SIDEBAR */}
        <aside
          className="hidden w-[280px] flex-col px-8 py-10 sm:flex"
          style={{ background: theme.sidebar }}
        >
          <div className="mb-10">
            <div className="text-3xl font-extrabold tracking-tight">
              {brand}
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,.65)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(0,0,0,.08)"
                      : "1px solid transparent",
                  }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: isActive ? theme.accent : "#3f3f46" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: isActive ? "#111827" : "#3f3f46" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                setThemeMode((m) => (m === "itau" ? "rose" : "itau"))
              }
              className="w-full rounded-xl border bg-white/60 px-4 py-3 text-left text-sm font-semibold text-zinc-900 transition hover:bg-white"
              style={{ borderColor: "rgba(0,0,0,.10)" }}
            >
              {themeMode === "itau"
                ? "Voltar para tema rosa"
                : "Ativar tema Itaú"}
            </button>

            <div className="flex items-center gap-3">
              <a
                className="rounded-xl border bg-white/60 p-3 transition hover:bg-white"
                href="https://www.linkedin.com/in/amandageovanna/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-zinc-700" />
              </a>
              <a
                className="rounded-xl border bg-white/60 p-3 transition hover:bg-white"
                href="https://github.com/amandageovanna"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-zinc-700" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            © {new Date().getFullYear()} Amanda
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-5 sm:p-10">
          <div
            className="rounded-[28px] border p-6 shadow-sm sm:p-10"
            style={{ background: theme.panel, borderColor: "rgba(0,0,0,.08)" }}
          >
            <div className="mb-6 flex items-center justify-between gap-3 sm:hidden">
              <div className="text-lg font-extrabold">{brand}</div>
              <button
                type="button"
                onClick={() =>
                  setThemeMode((m) => (m === "itau" ? "rose" : "itau"))
                }
                className="rounded-xl border bg-white/70 px-3 py-2 text-xs font-semibold text-zinc-900"
                style={{ borderColor: "rgba(0,0,0,.10)" }}
              >
                {themeMode === "itau" ? "Tema rosa" : "Tema Itaú"}
              </button>
              <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="rounded-xl border bg-white/70 px-3 py-2 text-sm"
              >
                {NAV.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            {/* HOME */}
            {active === "home" && (
              <div className="space-y-8">
                <AboutHero
                  theme={theme}
                  onGoItau={() => setActive("itau")}
                  onGoAbout={() => setActive("about")}
                />
              </div>
            )}

            {/* ABOUT */}
            {active === "about" && (
              <div className="space-y-10">
                <div className="text-center">
                  <h1
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: "var(--accent)" }}
                  >
                    Sobre mim
                  </h1>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                  <div className="flex flex-col items-start gap-6">
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 -z-10 h-[332px] w-[332px]">
                        <div
                          className="absolute left-0 top-0 h-full w-[14px]"
                          style={{ background: theme.accent }}
                        />
                        <div
                          className="absolute bottom-0 left-0 h-[14px] w-full"
                          style={{ background: theme.accent }}
                        />
                      </div>

                      <div
                        className="overflow-hidden border bg-white"
                        style={{ borderColor: "rgba(0,0,0,.18)" }}
                      >
                        <img
                          src="https://media.licdn.com/dms/image/v2/D4D22AQHkeiYtNvpflg/feedshare-shrink_1280/B4DZlfMedtJMAs-/0/1758238733106?e=1773878400&v=beta&t=xxFUn9KsQekEpaVhIUaD0oLzGmLsBWG_Yw1piwg0o3Y"
                          alt="Foto"
                          className="h-[320px] w-[320px] object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-3 text-sm italic text-zinc-700">
                        “Porque bom você se torna”.
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-lg font-bold text-zinc-900">
                        Meus Interesses
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <InterestItem icon={Book} label="Livros" />
                        <InterestItem icon={Dumbbell} label="Se exercitar" />
                        <InterestItem
                          icon={Sparkles}
                          label="Descobrir coisas novas"
                        />
                        <InterestItem icon={Puzzle} label="Quebra-cabeças" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <div>
                      <div className="text-xl font-extrabold text-zinc-900">
                        Amanda Geovanna
                      </div>
                      <div
                        className="mt-1 text-sm font-medium"
                        style={{ color: theme.accent }}
                      >
                        Estagiária de Engenharia de Dados
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-base leading-relaxed text-zinc-700">
                        Oi! Eu sou a Amanda e estou construindo minha jornada em{" "}
                        <strong>Engenharia de Dados</strong>. No{" "}
                        <strong>Itaú</strong>, atuo na comunidade{" "}
                        <strong>Esteira Única de Investimentos</strong>, dentro
                        da <strong>Squad PosMov</strong>, trabalhando na
                        modernização da jornada de dados de investimentos.
                      </p>

                      <p className="text-base leading-relaxed text-zinc-700">
                        Durante o estágio, atuei em etapas do pipeline como{" "}
                        <strong>ingestão</strong>,{" "}
                        <strong>processamento</strong> e{" "}
                        <strong>validação de dados</strong>, contribuindo para a
                        qualidade das informações utilizadas pelo negócio.
                      </p>

                      <p className="text-base leading-relaxed text-zinc-700">
                        No dia a dia, trabalho com <strong>AWS</strong> (Glue,
                        Athena, S3, Lambda e CloudWatch), além de{" "}
                        <strong>Python</strong>, <strong>PySpark</strong> e{" "}
                        <strong>SQL</strong>.
                      </p>

                      <p className="text-base leading-relaxed text-zinc-700">
                        Tenho interesse em continuar evoluindo na área de tecnologia explorando soluções em <strong> dados, desenvolvimento e cloud</strong>,
                        e contribuindo com soluçõed que façam a diferença para o time e para o negócio.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap justify-start gap-2">
                        <a
                          href="/Amanda_Baptista_CV.pdf"
                          download
                          className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-900 shadow-sm transition hover:opacity-90"
                          style={{ background: theme.accent }}
                        >
                          Download CV
                        </a>
                        <a
                          href="https://www.linkedin.com/in/amandageovanna/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border bg-white/60 px-4 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-white"
                          style={{ borderColor: "rgba(0,0,0,.10)" }}
                        >
                          Fale comigo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RESUME */}
            {active === "resume" && (
              <div className="space-y-10 text-left">
                <div className="space-y-2 text-center">
                  <h1
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: "var(--accent)" }}
                  >
                    Resumo Profissional
                  </h1>
                  <p className="mx-auto max-w-2xl text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    Uma visão resumida da minha formação e trajetória
                    profissional.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div className="flex items-center justify-start gap-2 text-lg font-extrabold text-zinc-900">
                      <GraduationCap
                        className="h-5 w-5"
                        style={{ color: "var(--accent)" }}
                      />
                      Educação
                    </div>

                    <div className="space-y-4">
                      {educationItems.map((item) => (
                        <EducationCard
                          key={item.curso}
                          item={item}
                          theme={theme}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-start gap-2 text-lg font-extrabold text-zinc-900">
                      <Briefcase
                        className="h-5 w-5"
                        style={{ color: "var(--accent)" }}
                      />
                      Experiências
                    </div>

                    <div className="space-y-4">
                      {experienceItems.map((xp) => (
                        <ExperienceCard
                          key={`${xp.empresa}-${xp.cargo}`}
                          xp={xp}
                          theme={theme}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-left text-lg font-extrabold text-zinc-900">
                      <Code
                        className="h-5 w-5"
                        style={{ color: "var(--accent)" }}
                      />
                      Skills (Dados)
                    </div>

                    <div className="max-w-xl rounded-2xl border bg-white/60 p-5 text-left shadow-sm">
                      <TechPillGroup
                        items={["Python", "SQL", "PySpark", "ETL", "Terraform"]}
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-left text-lg font-extrabold text-zinc-900">
                      <Cloud
                        className="h-5 w-5"
                        style={{ color: "var(--accent)" }}
                      />
                      Cloud / Ferramentas
                    </div>

                    <div className="max-w-xl rounded-2xl border bg-white/60 p-5 text-left shadow-sm">
                      <TechPillGroup
                        items={[
                          "AWS Glue",
                          "S3",
                          "Athena",
                          "Lambda",
                          "Step Functions",
                          "CloudWatch",
                          "Terraform",
                          "ECS",
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEDICAÇÃO */}
            {active === "dedicacao" && (
              <div className="space-y-10">
                <div className="space-y-2 text-center">
                  <h1
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: "var(--accent)" }}
                  >
                    Resumo Acadêmico
                  </h1>
                  <p className="mx-auto max-w-2xl text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    Estudos, projetos e experiências que fazem parte da minha
                    formação.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
                  {[
                    { id: "dados", label: "Dados" },
                    { id: "faculdade", label: "Faculdade" },
                  ].map((t) => {
                    const isActiveTab = academicoTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setAcademicoTab(t.id)}
                        className="relative px-1 pb-2 transition"
                        style={{
                          color: isActiveTab ? theme.accent : "#3f3f46",
                        }}
                      >
                        {t.label}
                        {isActiveTab ? (
                          <span
                            className="absolute left-0 right-0 -bottom-[1px] mx-auto h-[2px] rounded-full"
                            style={{ background: theme.accent }}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {academicoTab === "dados" && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <div className="rounded-2xl border bg-white/60 p-6 shadow-sm">
                        <div className="text-base font-extrabold text-zinc-900">
                          Apache Spark
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                          <li>
                            Configurei o Apache Spark e explorei DataFrames para
                            manipulação de dados em Python.
                          </li>
                          <li>
                            Trabalhei com dados do Cadastro de CNPJs da Receita
                            Federal, realizando transformações, consultas e
                            operações de limpeza.
                          </li>
                          <li>
                            Utilizei Spark SQL e armazenei dados em formatos
                            como CSV e Parquet.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-2xl border bg-white/60 p-6 shadow-sm">
                        <div className="text-base font-extrabold text-zinc-900">
                          Apache Airflow
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                          <li>
                            Criei e automatizei pipelines estruturando DAGs com
                            tasks e operators.
                          </li>
                          <li>
                            Desenvolvi um projeto para agendar um pipeline
                            semanal de previsões meteorológicas.
                          </li>
                        </ul>
                        <a
                          href="https://github.com/amandageovanna/turismo-dados-pipeline"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-sm font-semibold"
                          style={{ color: "var(--accent)" }}
                        >
                          Ver repositório no GitHub
                        </a>
                      </div>

                      <div className="rounded-2xl border bg-white/60 p-6 shadow-sm">
                        <div className="text-base font-extrabold text-zinc-900">
                          Databricks
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                          <li>
                            Configurei clusters e trabalhei com notebooks.
                          </li>
                          <li>
                            Explorei Delta Lake, arquitetura Medallion e DLT.
                          </li>
                          <li>
                            Utilizei Hive e SparkSQL para processamento de
                            dados.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-2xl border bg-white/60 p-6 shadow-sm">
                        <div className="text-base font-extrabold text-zinc-900">
                          AWS Data Lake: Pipeline para Ingestão de Dados
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                          <li>
                            Implementei pipeline de ingestão de dados externos
                            usando S3, IAM e Lake Formation.
                          </li>
                          <li>
                            Utilizei Python e Boto3 para automação da ingestão.
                          </li>
                          <li>
                            Monitorei custos e execução com CloudWatch e AWS
                            Budgets.
                          </li>
                        </ul>
                        <a
                          href="https://github.com/amandageovanna/ingestao-dados-aws-pipeline/tree/main"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-sm font-semibold"
                          style={{ color: "var(--accent)" }}
                        >
                          Ver repositório no GitHub
                        </a>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="text-center">
                        <h2
                          className="text-3xl font-extrabold"
                          style={{ color: "var(--accent)" }}
                        >
                          Badges
                        </h2>
                      </div>

                      <div className="flex flex-wrap justify-center gap-6">
                        <Badge
                          href="https://credentials.databricks.com/02b24b55-e3e4-4be0-8d1b-d18212e99b47"
                          src="https://www.databricks.com/sites/default/files/inline-images/fundamentals-badge-databricks-2x_1.png"
                          alt="Databricks Fundamentals Badge"
                        />
                        <Badge
                          href="https://www.credly.com/badges/ca2e8b00-b44c-4b27-973a-4f781925d5f4/linked_in_profile"
                          src="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
                          alt="AWS Cloud Practitioner Badge"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {academicoTab === "faculdade" && (
                  <div className="space-y-8">
                    <p className="mx-auto max-w-3xl text-center text-sm text-zinc-600">
                      Projetos desenvolvidos durante a graduação em Análise e
                      Desenvolvimento de Sistemas, utilizando práticas de
                      metodologias ágeis, como sprints e dailies. A proposta da
                      faculdade era aproximar os alunos da dinâmica real do
                      mercado de tecnologia desde o início da formação.
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <ProjectCard
                        image="https://aceitosim.com.br/wp-content/uploads/2018/08/casamento-a-tarde-01.jpg"
                        title="bridee. - 3º e 4º Semestre"
                        description="Plataforma para organização de casamentos que conecta noivas e assessores, com gestão financeira, lista de tarefas, convites personalizados e catálogo de fornecedores."
                        link="https://github.com/Bridee-Solutions"
                        linkLabel="Saiba mais"
                      />

                      <ProjectCard
                        image="https://www.csacademy.com.br/wp-content/uploads/2024/07/Call-center.webp"
                        title="CareTech - 2º semestre"
                        description="Sistema em Java para monitorar estações de trabalho em call centers hospitalares, acompanhando CPU, memória e disco, com apoio a práticas de ITIL."
                        link="https://github.com/CareTech0/aplicacao-web"
                        linkLabel="Saiba mais"
                      />

                      <ProjectCard
                        image="https://i0.wp.com/reserva85.com.br/wp-content/uploads/2020/10/V%C3%ADnicola-onde-se-faz-o-vinho.jpg?fit=1119%2C780&ssl=1"
                        title="WineTech - 1º semestre"
                        description="Projeto IoT para monitoramento de adegas com sensores DHT-11 e Arduino, acompanhando temperatura e umidade para manter condições ideais."
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ITAÚ */}
            {active === "itau" && (
              <div className="space-y-10 text-left">
                <div className="space-y-2 text-center">
                  <h1
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: "var(--accent)" }}
                  >
                    Trajetória no Itaú
                  </h1>
                  <p className="mx-auto max-w-2xl text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    Evolução durante o estágio na <strong>squad PosMov2</strong>{" "}
                    da <strong>RT Esteira Única de Investimentos</strong>,
                    participando da modernização da jornada de dados de
                    investimentos.
                  </p>
                </div>

                <div className="relative mx-auto max-w-3xl">
                  <div
                    className="absolute left-4 top-0 h-full w-[2px]"
                    style={{ background: "var(--accentSoft)" }}
                  />
                  <div className="space-y-10">
                    {itauTimeline.map((item, idx) => (
                      <TimelineItem key={idx} item={item} />
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6">
                  <div className="text-center">
                    <h2
                      className="text-2xl font-extrabold"
                      style={{ color: "var(--accent)" }}
                    >
                      Badges
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Reconhecimentos e trilhas concluídas durante o estágio.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6">
                    <Badge
                      href="https://www.credly.com/badges/d0121974-6ef7-4e53-8b2c-085d01e0aaf6/linked_in_profile"
                      src="https://media.licdn.com/dms/image/v2/D4D2DAQG4i4WuwIbHYg/profile-treasury-image-shrink_800_800/B4DZcSKcDgGgAc-/0/1748356416412?e=1773198000&v=beta&t=m-5niTAXuJxeVb7jacgxnGJ2Z4YNvC3dHKw43RYV7wI"
                      alt="Badge Itaú 1"
                    />
                    <Badge
                      href="https://www.credly.com/badges/7d6e0f65-97fa-4d48-9be1-cd5de34760dc/linked_in_profile"
                      src="https://media.licdn.com/dms/image/v2/D4D2DAQHwewmVnzP8Aw/profile-treasury-image-shrink_480_480/B4DZp1pYH_JMAM-/0/1762910372862?e=1773198000&v=beta&t=SRB2XqW31t_rHF95PE7Lsj0kHTYZMmRv6JcJ9NKDMhQ"
                      alt="Badge Itaú 2"
                    />
                    <Badge
                      href="https://www.credly.com/badges/7a56af1e-e460-448a-b8e6-1ae704431a34/linked_in_profile"
                      src="https://media.licdn.com/dms/image/v2/D4D2DAQHJEce7JgA-Aw/profile-treasury-image-shrink_8192_8192/B4DZpuSp18KIAg-/0/1762786983729?e=1773198000&v=beta&t=pRpDFzGxEmmf6JsW2a0mtkTY6Nk-kJfmgIAH0erbdyo"
                      alt="Badge Itaú 3"
                    />
                    {/* Duplicado do Resumo Acadêmico (Cloud Practitioner) */}
                    <Badge
                      href="https://www.credly.com/badges/ca2e8b00-b44c-4b27-973a-4f781925d5f4/linked_in_profile"
                      src="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
                      alt="AWS Cloud Practitioner Badge"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
