"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Database,
  Github,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  Microscope,
  Radio,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AreaId, areas, publications } from "@/data/publications";

type Lang = "en" | "pt";
type Filter = "all" | AreaId;

const profiles = [
  { label: "ORCID", href: "https://orcid.org/0000-0001-6233-6077" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=61qEu1AAAAAJ" },
  { label: "Lattes", href: "http://lattes.cnpq.br/2260564602839139" },
  { label: "GitHub", href: "https://github.com/camposdp" },
];

const copy = {
  en: {
    nav: [
      ["Research", "#research"],
      ["Publications", "#publications"],
      ["Projects", "#projects"],
      ["About", "#about"],
    ],
    role: "Biomedical engineer · Associate Professor at UTFPR",
    titleA: "Signals into",
    titleB: "systems that move.",
    intro:
      "I develop wearable biomedical instrumentation and intelligent methods that turn biosignals into actionable information—from neurorehabilitation and assistive devices to animal health monitoring.",
    explore: "Explore the research",
    contact: "Start a conversation",
    availability: "Open to research collaboration",
    location: "Apucarana, Paraná · Brazil",
    stats: [
      ["30", "peer-reviewed articles"],
      ["17", "book chapters"],
      ["01", "patent filing"],
      ["02", "software outputs"],
    ],
    researchEyebrow: "Research portfolio",
    researchTitle: "One signal. Multiple contexts.",
    researchLead:
      "A translational program connecting sensors, signal processing, machine learning and human-centered design.",
    areas: {
      semg: {
        title: "Wearable sEMG & neurorehabilitation",
        body: "Non-invasive acquisition, signal-quality assessment and real-time pattern recognition for myoelectric interfaces, FES and orthoses.",
        meta: "15 journal articles",
      },
      livestock: {
        title: "Precision livestock & animal health",
        body: "Wearable masseter sEMG and embedded intelligence to recognize ingestive behavior and support timely welfare decisions.",
        meta: "5 journal articles · 1 patent",
      },
      imaging: {
        title: "Medical imaging & thermography",
        body: "Non-invasive thermal protocols and quantitative image analysis for bone, vascular and metabolic assessment.",
        meta: "8 journal articles",
      },
      movement: {
        title: "Human movement & ergonomics",
        body: "Data-driven evaluation of coordination, exoskeletons and assistive systems in clinical and industrial settings.",
        meta: "2 journal articles",
      },
    },
    selectedEyebrow: "Selected work",
    selectedTitle: "Recent research with a clear path to use.",
    selectedLead:
      "The latest contributions span robust sEMG pipelines, open wearable hardware and non-invasive sensing across species.",
    features: [
      {
        kicker: "Open wearable · 2024",
        title: "A muscle–machine interface designed to leave the lab",
        body: "The MES–FES forearm orthosis detects residual muscle activity and triggers functional electrical stimulation. Its open-source, wireless architecture integrates low-cost electronics with a 3D-printed wearable.",
        metric: "326 g",
        metricLabel: "wearable prototype",
        href: "https://doi.org/10.1080/10400435.2024.2382857",
        link: "Read the paper",
      },
      {
        kicker: "Signal intelligence · 2026",
        title: "Quality control for challenging neurological sEMG",
        body: "An unsupervised learning workflow identifies usable recordings before downstream analysis—reducing subjective inspection and protecting clinical data collection.",
        metric: "p < .001",
        metricLabel: "frequency-domain separation",
        href: "https://doi.org/10.1109/ACCESS.2026.3673239",
        link: "Read in IEEE Access",
      },
      {
        kicker: "Precision livestock · 2024",
        title: "The same biosignal, translated to animal health",
        body: "Event-driven and fixed-window sEMG features distinguish eating from rumination using a wearable masseter setup—toward real-time, low-burden monitoring.",
        metric: "87.85%",
        metricLabel: "classification accuracy",
        href: "https://doi.org/10.1109/LSENS.2024.3424949",
        link: "Read the paper",
      },
      {
        kicker: "Medical thermography · 2025",
        title: "A seated spine protocol for metabolic bone assessment",
        body: "A prospective study compared thermal profiles with bone densitometry and proposed a practical acquisition protocol for older and physically debilitated people.",
        metric: "270",
        metricLabel: "participants",
        href: "https://doi.org/10.1038/s41598-025-01798-2",
        link: "Read in Scientific Reports",
      },
    ],
    pubEyebrow: "Publications",
    pubTitle: "Journal articles, organized by research area.",
    pubLead:
      "A complete journal record from the current Lattes CV. Original titles are preserved; DOI links are used whenever available.",
    all: "All areas",
    publication: "Publication",
    code: "Code / data",
    showAll: "Show all 30 articles",
    showLess: "Show selected articles",
    outputsEyebrow: "Research outputs",
    outputsTitle: "Beyond journal articles.",
    outputs: [
      {
        label: "Patent",
        title: "Electronic system for evaluating ingestive behavior and animal health",
        body: "Brazilian invention patent filing BR10202000079 · deposited 14 January 2020.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "Registered software",
        title: "CigarrinhaWeb",
        body: "Computer program registered with INPI under no. 512026002565-6.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "Open-source software",
        title: "Python framework for biosignal acquisition",
        body: "A reusable foundation for instrumentation, acquisition and signal-processing experiments.",
        href: "https://github.com/camposdp",
      },
      {
        label: "Book chapters",
        title: "17 chapters in biomedical engineering and instrumentation",
        body: "Including sEMG gesture recognition, bionic hands, robotic prostheses, EEG and ergonomic assistive systems.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
    ],
    projectsEyebrow: "Projects & academic practice",
    projectsTitle: "Research, teaching and extension as one ecosystem.",
    projects: [
      {
        kind: "Research & innovation",
        title: "Wearable myoelectric assistive technologies",
        body: "Open interfaces that connect sEMG, machine learning, FES, feedback and 3D-printed orthoses for rehabilitation and daily-life support.",
        tags: ["sEMG", "FES", "open hardware"],
      },
      {
        kind: "Research",
        title: "Project Maria · automated telemedicine cabin",
        body: "A multidisciplinary UTFPR–ICI–Loughborough collaboration exploring an inclusive medical cabin for remote and underserved settings.",
        tags: ["telemedicine", "embedded systems", "inclusive design"],
      },
      {
        kind: "Extension",
        title: "3D modeling for education and assistive technology",
        body: "Co-creation of low-cost personalized orthoses, assistive solutions and adapted learning materials with social institutions.",
        tags: ["3D printing", "accessibility", "co-design"],
      },
      {
        kind: "Teaching",
        title: "EngComp Starter Kit & IC2D Data Talks",
        body: "Project-based learning connects hardware, software and design for first-year Computer Engineering students, alongside conversations with technical professionals.",
        tags: ["active learning", "hardware + software", "community"],
      },
    ],
    aboutEyebrow: "About",
    aboutTitle: "Engineering that listens before it acts.",
    aboutP1:
      "I am an Associate Professor at the Federal University of Technology—Paraná (UTFPR), Apucarana campus, and permanent faculty in the Graduate Program in Biomedical Engineering (PPGEB). I lead the Computational Intelligence and Data Science research group (IC2D).",
    aboutP2:
      "My work sits between electronic instrumentation and biological signal processing. I am particularly interested in systems that are non-invasive, wearable, open and useful outside controlled laboratory conditions.",
    timeline: [
      ["2020–22", "Postdoctoral research · Neural and Rehabilitation Engineering · UEL"],
      ["2019", "PhD · Biomedical Engineering · UTFPR"],
      ["2016", "MSc · Electrical Engineering · UTFPR"],
      ["2014", "BEng · Electrical Engineering · UTFPR"],
    ],
    group: "Research group",
    groupName: "IC2D · Computational Intelligence & Data Science",
    connectEyebrow: "Collaborate",
    connectTitle: "Interested in wearable sensing, assistive systems or sEMG intelligence?",
    connectBody:
      "I welcome conversations with research groups and students working across biomedical instrumentation, rehabilitation, animal monitoring and applied machine learning.",
    email: "Email Daniel",
    footer: "Biomedical Engineering · UTFPR · Apucarana, Brazil",
    updated: "Portfolio data reviewed against Lattes CV · May 2026",
  },
  pt: {
    nav: [
      ["Pesquisa", "#research"],
      ["Publicações", "#publications"],
      ["Projetos", "#projects"],
      ["Sobre", "#about"],
    ],
    role: "Engenheiro biomédico · Professor Adjunto na UTFPR",
    titleA: "Sinais em",
    titleB: "sistemas que movem.",
    intro:
      "Desenvolvo instrumentação biomédica wearable e métodos inteligentes que transformam biossinais em informação útil — da neurorreabilitação e tecnologias assistivas ao monitoramento da saúde animal.",
    explore: "Conheça a pesquisa",
    contact: "Inicie uma conversa",
    availability: "Aberto a colaborações em pesquisa",
    location: "Apucarana, Paraná · Brasil",
    stats: [
      ["30", "artigos em periódicos"],
      ["17", "capítulos de livro"],
      ["01", "depósito de patente"],
      ["02", "produções de software"],
    ],
    researchEyebrow: "Portfólio de pesquisa",
    researchTitle: "Um sinal. Múltiplos contextos.",
    researchLead:
      "Um programa translacional que conecta sensores, processamento de sinais, aprendizagem de máquina e design centrado nas pessoas.",
    areas: {
      semg: {
        title: "sEMG wearable e neurorreabilitação",
        body: "Aquisição não invasiva, avaliação da qualidade do sinal e reconhecimento de padrões em tempo real para interfaces mioelétricas, FES e órteses.",
        meta: "15 artigos em periódicos",
      },
      livestock: {
        title: "Pecuária de precisão e saúde animal",
        body: "sEMG wearable do masseter e inteligência embarcada para reconhecer o comportamento ingestivo e apoiar decisões de bem-estar.",
        meta: "5 artigos · 1 patente",
      },
      imaging: {
        title: "Imagem médica e termografia",
        body: "Protocolos térmicos não invasivos e análise quantitativa de imagens para avaliação óssea, vascular e metabólica.",
        meta: "8 artigos em periódicos",
      },
      movement: {
        title: "Movimento humano e ergonomia",
        body: "Avaliação orientada por dados da coordenação, de exoesqueletos e de sistemas assistivos em contextos clínicos e industriais.",
        meta: "2 artigos em periódicos",
      },
    },
    selectedEyebrow: "Trabalhos selecionados",
    selectedTitle: "Pesquisa recente com um caminho claro para o uso.",
    selectedLead:
      "As contribuições mais recentes integram pipelines robustos de sEMG, hardware wearable aberto e sensoriamento não invasivo em diferentes espécies.",
    features: [
      {
        kicker: "Wearable aberto · 2024",
        title: "Uma interface músculo–máquina pensada para sair do laboratório",
        body: "A órtese de antebraço MES–FES detecta atividade muscular residual e dispara estimulação elétrica funcional. A arquitetura aberta e sem fio integra eletrônica de baixo custo a um wearable impresso em 3D.",
        metric: "326 g",
        metricLabel: "protótipo wearable",
        href: "https://doi.org/10.1080/10400435.2024.2382857",
        link: "Leia o artigo",
      },
      {
        kicker: "Inteligência de sinais · 2026",
        title: "Controle de qualidade para sEMG neurológico desafiador",
        body: "Um fluxo de aprendizagem não supervisionada identifica registros utilizáveis antes das análises posteriores, reduzindo a inspeção subjetiva e protegendo a coleta clínica.",
        metric: "p < 0,001",
        metricLabel: "separação no domínio da frequência",
        href: "https://doi.org/10.1109/ACCESS.2026.3673239",
        link: "Leia na IEEE Access",
      },
      {
        kicker: "Pecuária de precisão · 2024",
        title: "O mesmo biossinal, traduzido para a saúde animal",
        body: "Atributos de sEMG orientados a eventos e por janelas fixas distinguem alimentação e ruminação com um sistema wearable no masseter.",
        metric: "87,85%",
        metricLabel: "acurácia de classificação",
        href: "https://doi.org/10.1109/LSENS.2024.3424949",
        link: "Leia o artigo",
      },
      {
        kicker: "Termografia médica · 2025",
        title: "Um protocolo sentado para avaliação metabólica da coluna",
        body: "O estudo prospectivo comparou perfis térmicos à densitometria óssea e propôs uma aquisição prática para pessoas idosas ou com limitações físicas.",
        metric: "270",
        metricLabel: "participantes",
        href: "https://doi.org/10.1038/s41598-025-01798-2",
        link: "Leia na Scientific Reports",
      },
    ],
    pubEyebrow: "Publicações",
    pubTitle: "Artigos organizados por área de pesquisa.",
    pubLead:
      "Relação completa dos periódicos no currículo Lattes atual. Os títulos originais foram preservados e os links DOI usados quando disponíveis.",
    all: "Todas as áreas",
    publication: "Publicação",
    code: "Código / dados",
    showAll: "Mostrar todos os 30 artigos",
    showLess: "Mostrar artigos selecionados",
    outputsEyebrow: "Produções de pesquisa",
    outputsTitle: "Além dos artigos científicos.",
    outputs: [
      {
        label: "Patente",
        title: "Sistema eletrônico para avaliar comportamento ingestivo e saúde animal",
        body: "Pedido de patente de invenção BR10202000079 · depósito em 14 de janeiro de 2020.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "Software registrado",
        title: "CigarrinhaWeb",
        body: "Programa de computador registrado no INPI sob o nº 512026002565-6.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "Software aberto",
        title: "Framework em Python para aquisição de biossinais",
        body: "Uma base reutilizável para experimentos de instrumentação, aquisição e processamento de sinais.",
        href: "https://github.com/camposdp",
      },
      {
        label: "Capítulos de livro",
        title: "17 capítulos em engenharia biomédica e instrumentação",
        body: "Incluindo gestos por sEMG, mãos biônicas, próteses robóticas, EEG e sistemas assistivos ergonômicos.",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
    ],
    projectsEyebrow: "Projetos e prática acadêmica",
    projectsTitle: "Pesquisa, ensino e extensão como um só ecossistema.",
    projects: [
      {
        kind: "Pesquisa e inovação",
        title: "Tecnologias assistivas mioelétricas wearable",
        body: "Interfaces abertas que conectam sEMG, aprendizagem de máquina, FES, feedback e órteses impressas em 3D para reabilitação e apoio à vida diária.",
        tags: ["sEMG", "FES", "hardware aberto"],
      },
      {
        kind: "Pesquisa",
        title: "Projeto Maria · cabine automatizada de telemedicina",
        body: "Colaboração multidisciplinar UTFPR–ICI–Loughborough que explora uma cabine médica inclusiva para regiões remotas e com menor acesso.",
        tags: ["telemedicina", "sistemas embarcados", "design inclusivo"],
      },
      {
        kind: "Extensão",
        title: "Modelagem 3D para educação e tecnologia assistiva",
        body: "Cocriação de órteses personalizadas de baixo custo, soluções assistivas e materiais didáticos adaptados com instituições sociais.",
        tags: ["impressão 3D", "acessibilidade", "codesign"],
      },
      {
        kind: "Ensino",
        title: "EngComp Starter Kit e IC2D Data Talks",
        body: "Aprendizagem por projetos conecta hardware, software e design para ingressantes de Engenharia de Computação, além de conversas com profissionais técnicos.",
        tags: ["aprendizagem ativa", "hardware + software", "comunidade"],
      },
    ],
    aboutEyebrow: "Sobre",
    aboutTitle: "Engenharia que escuta antes de agir.",
    aboutP1:
      "Sou Professor Adjunto da Universidade Tecnológica Federal do Paraná (UTFPR), campus Apucarana, e docente permanente do Programa de Pós-Graduação em Engenharia Biomédica (PPGEB). Lidero o grupo Inteligência Computacional e Ciência de Dados (IC2D).",
    aboutP2:
      "Minha pesquisa fica na interface entre instrumentação eletrônica e processamento de sinais biológicos. Tenho interesse especial por sistemas não invasivos, wearable, abertos e úteis fora das condições controladas de laboratório.",
    timeline: [
      ["2020–22", "Pós-doutorado · Engenharia Neural e de Reabilitação · UEL"],
      ["2019", "Doutorado · Engenharia Biomédica · UTFPR"],
      ["2016", "Mestrado · Engenharia Elétrica · UTFPR"],
      ["2014", "Graduação · Engenharia Elétrica · UTFPR"],
    ],
    group: "Grupo de pesquisa",
    groupName: "IC2D · Inteligência Computacional e Ciência de Dados",
    connectEyebrow: "Colabore",
    connectTitle: "Interesse em sensoriamento wearable, sistemas assistivos ou inteligência para sEMG?",
    connectBody:
      "Estou aberto a conversas com grupos de pesquisa e estudantes que atuem em instrumentação biomédica, reabilitação, monitoramento animal e aprendizagem de máquina aplicada.",
    email: "Enviar e-mail",
    footer: "Engenharia Biomédica · UTFPR · Apucarana, Brasil",
    updated: "Dados conferidos com o currículo Lattes · maio de 2026",
  },
} as const;

const researchIcons = {
  semg: Radio,
  livestock: Cpu,
  imaging: ScanLine,
  movement: BrainCircuit,
};

const featureImages = [
  { src: "/images/mes-fes-system.png", alt: "MES-FES wearable system architecture" },
  { src: "/images/semg-quality.png", alt: "sEMG quality assessment results" },
  { src: "/images/ruminant-sem.jpg", alt: "Wearable sEMG electrodes on a cow masseter" },
  { src: "/images/spine-thermography.png", alt: "Spine thermography acquisition and regions of interest" },
];

function SignalMark() {
  return (
    <svg className="signal-mark" viewBox="0 0 110 30" aria-hidden="true">
      <path d="M1 15h12l4-7 6 15 7-21 8 26 8-19 7 9 6-6 7 3h43" />
    </svg>
  );
}

export function ResearchSite() {
  const [lang, setLang] = useState<Lang>("en");
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  const filtered = useMemo(
    () => publications.filter((item) => filter === "all" || item.area === filter),
    [filter],
  );
  const visiblePublications = showAll || filter !== "all" ? filtered : filtered.slice(0, 8);

  const toggleLang = () => {
    const next = lang === "en" ? "pt" : "en";
    setLang(next);
    document.documentElement.lang = next === "en" ? "en" : "pt-BR";
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Daniel Prado de Campos — home">
          <span className="brand-dot">D</span>
          <span className="brand-name">Daniel Prado de Campos</span>
          <SignalMark />
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {t.nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="lang-button mobile-lang" type="button" onClick={toggleLang}>
            <Languages size={16} /> {lang === "en" ? "PT" : "EN"}
          </button>
        </nav>
        <div className="header-actions">
          <button className="lang-button" type="button" onClick={toggleLang} aria-label="Switch language">
            <Languages size={16} /> {lang === "en" ? "PT" : "EN"}
          </button>
          <a className="header-contact" href="mailto:danielcampos@utfpr.edu.br">
            {t.contact} <ArrowUpRight size={15} />
          </a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> {t.role}</p>
            <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">{t.explore} <ArrowDown size={17} /></a>
              <a className="button button-quiet" href="mailto:danielcampos@utfpr.edu.br"><Mail size={17} /> {t.contact}</a>
            </div>
            <div className="profile-links" aria-label="Academic profiles">
              {profiles.map((profile) => (
                <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-wrap">
              <Image src="/images/daniel-campos.jpg" alt="Daniel Prado de Campos" fill priority sizes="(max-width: 800px) 88vw, 42vw" />
              <div className="portrait-grid" />
              <div className="signal-card">
                <span>sEMG</span>
                <SignalMark />
                <small>biosignal → decision</small>
              </div>
            </div>
            <div className="status-card">
              <span className="pulse" />
              <div><strong>{t.availability}</strong><small>{t.location}</small></div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="Academic output summary">
          <div className="section-shell stats-grid">
            {t.stats.map(([value, label]) => (
              <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
            <span className="stats-note">Lattes · 05/2026</span>
          </div>
        </section>

        <section className="research section-pad" id="research">
          <div className="section-shell">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">{t.researchEyebrow}</p><h2>{t.researchTitle}</h2></div>
              <p>{t.researchLead}</p>
            </div>
            <div className="research-grid">
              {(Object.keys(t.areas) as AreaId[]).map((id, index) => {
                const Icon = researchIcons[id];
                const area = t.areas[id];
                return (
                  <article className={`research-card ${areas[id].color}`} key={id}>
                    <div className="card-top"><span>0{index + 1}</span><Icon size={28} strokeWidth={1.6} /></div>
                    <h3>{area.title}</h3><p>{area.body}</p><small>{area.meta}</small>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="selected section-pad">
          <div className="section-shell">
            <div className="section-heading split-heading light-heading">
              <div><p className="eyebrow">{t.selectedEyebrow}</p><h2>{t.selectedTitle}</h2></div>
              <p>{t.selectedLead}</p>
            </div>
            <div className="feature-list">
              {t.features.map((feature, index) => (
                <article className={`feature ${index % 2 ? "feature-reverse" : ""}`} key={feature.title}>
                  <div className="feature-image">
                    <Image src={featureImages[index].src} alt={featureImages[index].alt} fill sizes="(max-width: 800px) 92vw, 48vw" />
                    <div className="feature-number">0{index + 1}</div>
                  </div>
                  <div className="feature-copy">
                    <p className="kicker">{feature.kicker}</p>
                    <h3>{feature.title}</h3><p>{feature.body}</p>
                    <div className="metric"><strong>{feature.metric}</strong><span>{feature.metricLabel}</span></div>
                    <a href={feature.href} target="_blank" rel="noreferrer">{feature.link} <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="publications section-pad" id="publications">
          <div className="section-shell">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">{t.pubEyebrow}</p><h2>{t.pubTitle}</h2></div>
              <p>{t.pubLead}</p>
            </div>
            <div className="filter-row" role="group" aria-label="Filter publications by area">
              <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>{t.all} <span>{publications.length}</span></button>
              {(Object.keys(areas) as AreaId[]).map((id) => (
                <button className={filter === id ? "active" : ""} onClick={() => setFilter(id)} key={id}>
                  {areas[id][lang]} <span>{publications.filter((p) => p.area === id).length}</span>
                </button>
              ))}
            </div>
            <div className="publication-list">
              {visiblePublications.map((publication, index) => (
                <article className="publication-row" key={publication.title}>
                  <div className="pub-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="pub-main">
                    <div className="pub-meta"><span>{publication.year}</span><span className={`area-pill ${areas[publication.area].color}`}>{areas[publication.area][lang]}</span></div>
                    <h3>{publication.title}</h3><p>{publication.authors}</p><small>{publication.venue}</small>
                  </div>
                  <div className="pub-links">
                    <a href={publication.url} target="_blank" rel="noreferrer" aria-label={`${t.publication}: ${publication.title}`}><BookOpen size={18} /> {t.publication}</a>
                    {publication.code && <a href={publication.code} target="_blank" rel="noreferrer"><Github size={18} /> {t.code}</a>}
                  </div>
                </article>
              ))}
            </div>
            {filter === "all" && (
              <button className="show-all" onClick={() => setShowAll(!showAll)}>
                {showAll ? t.showLess : t.showAll} <ChevronDown className={showAll ? "rotated" : ""} size={18} />
              </button>
            )}
          </div>
        </section>

        <section className="outputs section-pad">
          <div className="section-shell">
            <div className="section-heading"><p className="eyebrow">{t.outputsEyebrow}</p><h2>{t.outputsTitle}</h2></div>
            <div className="outputs-grid">
              {t.outputs.map((output, index) => (
                <a className="output-card" href={output.href} target="_blank" rel="noreferrer" key={output.title}>
                  <div className="output-icon">{index === 0 ? <Sparkles /> : index === 1 ? <Boxes /> : index === 2 ? <Database /> : <BookOpen />}</div>
                  <p>{output.label}</p><h3>{output.title}</h3><span>{output.body}</span><ArrowUpRight className="output-arrow" size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-shell">
            <div className="section-heading split-heading light-heading">
              <div><p className="eyebrow">{t.projectsEyebrow}</p><h2>{t.projectsTitle}</h2></div>
              <div className="mini-diagram"><Microscope /><span /><GraduationCap /><span /><Cpu /></div>
            </div>
            <div className="project-grid">
              {t.projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className="project-number">0{index + 1}</div><p className="kicker">{project.kind}</p>
                  <h3>{project.title}</h3><p>{project.body}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-shell about-grid">
            <div className="about-portrait">
              <Image src="/images/daniel-campos.jpg" alt="Daniel Prado de Campos" fill sizes="(max-width: 800px) 90vw, 36vw" />
              <div className="about-label"><SignalMark /><span>Biomedical<br />signal intelligence</span></div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p className="about-lead">{t.aboutP1}</p><p>{t.aboutP2}</p>
              <div className="timeline">
                {t.timeline.map(([year, text]) => <div key={year}><strong>{year}</strong><span>{text}</span></div>)}
              </div>
              <div className="group-card"><BrainCircuit size={28} /><div><small>{t.group}</small><strong>{t.groupName}</strong></div></div>
            </div>
          </div>
        </section>

        <section className="connect section-pad">
          <div className="section-shell connect-inner">
            <p className="eyebrow">{t.connectEyebrow}</p><h2>{t.connectTitle}</h2><p>{t.connectBody}</p>
            <div className="connect-actions">
              <a className="button button-light" href="mailto:danielcampos@utfpr.edu.br"><Mail size={18} /> {t.email}</a>
              <a className="button button-outline-light" href="https://github.com/camposdp" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
            </div>
            <div className="connect-profiles">{profiles.slice(0, 3).map((p) => <a href={p.href} target="_blank" rel="noreferrer" key={p.label}>{p.label} <ArrowUpRight size={13} /></a>)}</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-shell footer-inner">
          <div><strong>Daniel Prado de Campos</strong><span>{t.footer}</span></div>
          <div><span>{t.updated}</span><a href="#top">↑ Top</a></div>
        </div>
      </footer>
    </>
  );
}
