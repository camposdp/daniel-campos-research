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
import { useMemo, useState, useSyncExternalStore } from "react";
import { AreaId, areas, publications } from "@/data/publications";

type Lang = "en" | "pt" | "ja";
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
    areaLink: "View publications",
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
    aboutTitle: "Engineering and data science working together to improve quality of life.",
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
    aboutTag: "Biomedical signal intelligence",
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
    areaLink: "Ver publicações",
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
    aboutTitle: "Engenharia e ciência de dados aliados para melhorar a qualidade de vida.",
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
    aboutTag: "Inteligência de sinais biomédicos",
    connectEyebrow: "Colabore",
    connectTitle: "Interesse em sensoriamento wearable, sistemas assistivos ou inteligência para sEMG?",
    connectBody:
      "Estou aberto a conversas com grupos de pesquisa e estudantes que atuem em instrumentação biomédica, reabilitação, monitoramento animal e aprendizagem de máquina aplicada.",
    email: "Enviar e-mail",
    footer: "Engenharia Biomédica · UTFPR · Apucarana, Brasil",
    updated: "Dados conferidos com o currículo Lattes · maio de 2026",
  },
  ja: {
    nav: [
      ["研究", "#research"],
      ["研究業績", "#publications"],
      ["プロジェクト", "#projects"],
      ["プロフィール", "#about"],
    ],
    role: "生体医工学研究者 · UTFPR准教授",
    titleA: "生体信号を、",
    titleB: "人を動かすシステムへ。",
    intro:
      "ウェアラブル生体医用計測と知的手法を開発し、生体信号を実用的な情報へ変換しています。神経リハビリテーションや支援機器から、動物の健康モニタリングまでを対象としています。",
    explore: "研究を見る",
    contact: "お問い合わせ",
    availability: "共同研究を歓迎しています",
    location: "ブラジル · パラナ州アプカラナ",
    stats: [
      ["30", "査読付き論文"],
      ["17", "書籍分担執筆"],
      ["01", "特許出願"],
      ["02", "ソフトウェア成果"],
    ],
    researchEyebrow: "研究ポートフォリオ",
    researchTitle: "一つの信号、多様な応用。",
    researchLead:
      "センサ、信号処理、機械学習、人間中心設計を結びつけるトランスレーショナル研究です。",
    areaLink: "関連論文を見る",
    areas: {
      semg: {
        title: "ウェアラブルsEMGと神経リハビリテーション",
        body: "筋電インタフェース、FES、装具に向けた非侵襲計測、信号品質評価、リアルタイムパターン認識に取り組んでいます。",
        meta: "学術論文 15編",
      },
      livestock: {
        title: "精密畜産と動物の健康",
        body: "咬筋sEMGと組込み知能を用いて摂食行動を認識し、迅速なアニマルウェルフェア判断を支援します。",
        meta: "学術論文 5編 · 特許 1件",
      },
      imaging: {
        title: "医用画像とサーモグラフィ",
        body: "骨、血管、代謝の評価に向けた非侵襲的な熱画像プロトコルと定量画像解析を研究しています。",
        meta: "学術論文 8編",
      },
      movement: {
        title: "身体運動とエルゴノミクス",
        body: "臨床・産業環境における協調運動、外骨格、支援システムをデータに基づいて評価します。",
        meta: "学術論文 2編",
      },
    },
    selectedEyebrow: "主要研究",
    selectedTitle: "社会実装につながる近年の研究。",
    selectedLead:
      "堅牢なsEMG処理、オープンなウェアラブル機器、ヒトと動物を横断する非侵襲センシングの成果を紹介します。",
    features: [
      {
        kicker: "信号インテリジェンス · 2026",
        title: "臨床sEMGの品質を自動的に見極める",
        body: "教師なし学習により、神経障害を有する人から取得したsEMGのうち解析に適した記録を特定します。主観的な確認を減らし、臨床データ収集の信頼性を高めます。",
        metric: "p < .001",
        metricLabel: "周波数領域での群間差",
        href: "https://doi.org/10.1109/ACCESS.2026.3673239",
        link: "IEEE Accessで読む",
      },
      {
        kicker: "医用サーモグラフィ · 2025",
        title: "骨代謝評価のための座位脊椎プロトコル",
        body: "熱分布を骨密度測定と比較し、高齢者や身体機能に制約のある人にも適用しやすい撮影プロトコルを提案した前向き研究です。",
        metric: "270",
        metricLabel: "研究参加者",
        href: "https://doi.org/10.1038/s41598-025-01798-2",
        link: "Scientific Reportsで読む",
      },
      {
        kicker: "オープンウェアラブル · 2024",
        title: "研究室の外で使える筋–機械インタフェース",
        body: "MES–FES前腕装具は残存筋活動を検出し、機能的電気刺激を作動させます。低コスト回路、無線通信、3Dプリント装具を統合したオープンソース設計です。",
        metric: "326 g",
        metricLabel: "ウェアラブル試作機",
        href: "https://doi.org/10.1080/10400435.2024.2382857",
        link: "論文を読む",
      },
      {
        kicker: "精密畜産 · 2024",
        title: "同じ生体信号を動物の健康へ展開する",
        body: "イベント駆動型および固定窓型のsEMG特徴量により、咬筋に装着したウェアラブル装置から採食と反芻を識別します。",
        metric: "87.85%",
        metricLabel: "分類精度",
        href: "https://doi.org/10.1109/LSENS.2024.3424949",
        link: "論文を読む",
      },
    ],
    pubEyebrow: "研究業績",
    pubTitle: "研究分野別の学術論文。",
    pubLead:
      "最新のLattes CVに基づく学術論文一覧です。原題を保持し、利用可能な場合はDOIへリンクしています。",
    all: "すべての分野",
    publication: "論文",
    code: "コード／データ",
    showAll: "全30編を表示",
    showLess: "主要論文のみ表示",
    outputsEyebrow: "研究成果",
    outputsTitle: "学術論文を超えた成果。",
    outputs: [
      {
        label: "特許",
        title: "摂食行動と動物の健康を評価する電子システム",
        body: "ブラジル発明特許出願 BR10202000079 · 2020年1月14日出願。",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "登録ソフトウェア",
        title: "CigarrinhaWeb",
        body: "INPI登録番号 512026002565-6 のコンピュータプログラム。",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
      {
        label: "オープンソース",
        title: "生体信号取得のためのPythonフレームワーク",
        body: "計測、データ取得、信号処理実験に再利用できる基盤です。",
        href: "https://github.com/camposdp",
      },
      {
        label: "書籍分担執筆",
        title: "生体医工学と計測に関する17章",
        body: "sEMGによるジェスチャ認識、バイオニックハンド、ロボット義手、EEG、作業支援システムなどを扱っています。",
        href: "http://lattes.cnpq.br/2260564602839139",
      },
    ],
    projectsEyebrow: "プロジェクトと教育実践",
    projectsTitle: "研究・教育・社会連携を一つのエコシステムに。",
    projects: [
      {
        kind: "研究・イノベーション",
        title: "ウェアラブル筋電支援技術",
        body: "sEMG、機械学習、FES、フィードバック、3Dプリント装具を統合し、リハビリテーションと日常生活を支えるオープンなインタフェースを開発します。",
        tags: ["sEMG", "FES", "オープンハードウェア"],
      },
      {
        kind: "研究",
        title: "Project Maria · 自動遠隔医療キャビン",
        body: "UTFPR、ICI、Loughboroughによる学際共同研究として、医療アクセスが限られた地域に向けた包摂的な遠隔医療キャビンを検討しています。",
        tags: ["遠隔医療", "組込みシステム", "インクルーシブデザイン"],
      },
      {
        kind: "社会連携",
        title: "教育・支援技術のための3Dモデリング",
        body: "地域の社会機関と協働し、低コストの個別装具、支援機器、アクセシブルな教材を共創しています。",
        tags: ["3Dプリント", "アクセシビリティ", "共創"],
      },
      {
        kind: "教育",
        title: "EngComp Starter KitとIC2D Data Talks",
        body: "コンピュータ工学初年次教育でハードウェア、ソフトウェア、設計を結ぶプロジェクト型学習を実践し、技術者との対話も促進しています。",
        tags: ["アクティブラーニング", "ハードウェア＋ソフトウェア", "コミュニティ"],
      },
    ],
    aboutEyebrow: "プロフィール",
    aboutTitle: "生活の質を高めるために、工学とデータサイエンスを融合する。",
    aboutP1:
      "ブラジル連邦工科大学パラナ校（UTFPR）アプカラナキャンパスの准教授であり、生体医工学大学院プログラム（PPGEB）の常任教員です。計算知能・データサイエンス研究グループ（IC2D）を主宰しています。",
    aboutP2:
      "電子計測と生体信号処理の接点で研究しています。特に、非侵襲・ウェアラブル・オープンで、管理された実験室の外でも役立つシステムに関心があります。",
    timeline: [
      ["2020–22", "博士研究員 · 神経・リハビリテーション工学 · UEL"],
      ["2019", "博士（生体医工学）· UTFPR"],
      ["2016", "修士（電気工学）· UTFPR"],
      ["2014", "学士（電気工学）· UTFPR"],
    ],
    group: "研究グループ",
    groupName: "IC2D · 計算知能・データサイエンス",
    aboutTag: "生体信号インテリジェンス",
    connectEyebrow: "共同研究",
    connectTitle: "ウェアラブルセンシング、支援システム、sEMG解析で協働しませんか。",
    connectBody:
      "生体医用計測、リハビリテーション、動物モニタリング、応用機械学習に取り組む研究グループや学生との交流を歓迎します。",
    email: "メールを送る",
    footer: "生体医工学 · UTFPR · ブラジル・アプカラナ",
    updated: "Lattes CVに基づき2026年5月に確認",
  },
} as const;

const researchIcons = {
  semg: Radio,
  livestock: Cpu,
  imaging: ScanLine,
  movement: BrainCircuit,
};

const featureOrder = [
  "https://doi.org/10.1109/ACCESS.2026.3673239",
  "https://doi.org/10.1038/s41598-025-01798-2",
  "https://doi.org/10.1080/10400435.2024.2382857",
  "https://doi.org/10.1109/LSENS.2024.3424949",
];

const featureImages: Record<string, { src: string; alt: string }> = {
  "https://doi.org/10.1109/ACCESS.2026.3673239": {
    src: "/daniel-campos-research/images/semg-clustering-workflow.jpg",
    alt: "Unsupervised sEMG quality-control and clustering workflow",
  },
  "https://doi.org/10.1038/s41598-025-01798-2": {
    src: "/daniel-campos-research/images/spine-thermography-comparison.jpg",
    alt: "Visible and thermal images of the spine in standing and seated positions",
  },
  "https://doi.org/10.1080/10400435.2024.2382857": {
    src: "/daniel-campos-research/images/mes-fes-application.png",
    alt: "MES-FES wearable orthosis operation and mobile control",
  },
  "https://doi.org/10.1109/LSENS.2024.3424949": {
    src: "/daniel-campos-research/images/ruminant-sem.jpg",
    alt: "Wearable sEMG electrodes on a cow masseter",
  },
};

const languageOptions: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "ja", label: "日本語" },
];

const subscribeToUrl = () => () => undefined;
const getUrlLanguage = (): Lang => {
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  return requestedLanguage === "pt" || requestedLanguage === "ja" ? requestedLanguage : "en";
};
const getServerLanguage = (): Lang => "en";

function SignalMark() {
  return (
    <svg className="signal-mark" viewBox="0 0 110 30" aria-hidden="true">
      <path d="M1 15h12l4-7 6 15 7-21 8 26 8-19 7 9 6-6 7 3h43" />
    </svg>
  );
}

export function ResearchSite() {
  const urlLanguage = useSyncExternalStore(subscribeToUrl, getUrlLanguage, getServerLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState<Lang | null>(null);
  const lang = selectedLanguage ?? urlLanguage;
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  const filtered = useMemo(
    () => publications.filter((item) => filter === "all" || item.area === filter),
    [filter],
  );
  const visiblePublications = showAll || filter !== "all" ? filtered : filtered.slice(0, 8);
  const selectedFeatures = [...t.features].sort(
    (a, b) => featureOrder.indexOf(a.href) - featureOrder.indexOf(b.href),
  );

  const selectLanguage = (next: Lang) => {
    setSelectedLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="site-root" lang={lang === "pt" ? "pt-BR" : lang}>
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
          <div className="language-switcher mobile-language" role="group" aria-label="Language · Idioma · 言語">
            <Languages size={15} aria-hidden="true" />
            {languageOptions.map((option) => (
              <button className={lang === option.code ? "active" : ""} type="button" onClick={() => selectLanguage(option.code)} key={option.code}>
                {option.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label="Language · Idioma · 言語">
            <Languages size={15} aria-hidden="true" />
            {languageOptions.map((option) => (
              <button className={lang === option.code ? "active" : ""} type="button" onClick={() => selectLanguage(option.code)} key={option.code}>
                {option.label}
              </button>
            ))}
          </div>
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
              <Image src="/daniel-campos-research/images/daniel-campos-speaking.jpg" alt="Daniel Prado de Campos presenting his research" fill priority sizes="(max-width: 800px) 88vw, 42vw" />
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
                  <a
                    className={`research-card ${areas[id].color}`}
                    href="#publications"
                    onClick={() => { setFilter(id); setShowAll(true); }}
                    aria-label={`${area.title}: ${t.areaLink}`}
                    key={id}
                  >
                    <div className="card-top"><span>0{index + 1}</span><Icon size={28} strokeWidth={1.6} /></div>
                    <h3>{area.title}</h3><p>{area.body}</p><small>{area.meta}</small>
                    <span className="card-link">{t.areaLink} <ArrowUpRight size={15} /></span>
                  </a>
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
              {selectedFeatures.map((feature, index) => (
                <article className={`feature ${index % 2 ? "feature-reverse" : ""}`} key={feature.title}>
                  <a className={`feature-image feature-image-${index + 1}`} href={feature.href} target="_blank" rel="noreferrer" aria-label={`${feature.link}: ${feature.title}`}>
                    <Image src={featureImages[feature.href].src} alt={featureImages[feature.href].alt} fill sizes="(max-width: 800px) 92vw, 48vw" />
                    <div className="feature-number">0{index + 1}</div>
                    <ArrowUpRight className="feature-image-link" size={20} />
                  </a>
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
                    <h3><a href={publication.url} target="_blank" rel="noreferrer">{publication.title}</a></h3><p>{publication.authors}</p><small>{publication.venue}</small>
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
              <Image src="/daniel-campos-research/images/daniel-campos-speaking.jpg" alt="Daniel Prado de Campos presenting his research" fill sizes="(max-width: 800px) 90vw, 36vw" />
              <div className="about-label"><SignalMark /><span>{t.aboutTag}</span></div>
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
    </div>
  );
}
