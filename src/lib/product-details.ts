import type { PublicProject } from "./registry";

export const FEATURED_PRODUCT_SLUGS = [
  "voidarchitect-site",
  "void-brain",
  "hermes-desktop",
  "ai-screen-record",
  "texas-philosopher",
] as const;

export type FeaturedProductSlug = (typeof FEATURED_PRODUCT_SLUGS)[number];
export type ProductLocale = "zh" | "en";

export interface ProductTheme {
  text: string;
  softText: string;
  gradient: string;
  halo: string;
  haloSecondary: string;
  promise: string;
}

export interface ProductScreenshot {
  title: string;
  caption: string;
  eyebrow: string;
  metric: string;
  asset: string;
}

export interface ProductCopy {
  headline: string;
  subhead: string;
  scenarioTitle: string;
  scenario: string;
  promiseLabel: string;
  promise: string;
  interfaceLabel: string;
  signalLabel: string;
  roadmapLabel: string;
  moreLabel: string;
  moreTitle: string;
  screenshotsLabel: string;
  screenshotsTitle: string;
  screenshotsSubtitle: string;
  interfaceNotes: string[];
  productSignals: string[];
  roadmap: string[];
  screenshots: ProductScreenshot[];
}

export interface ProductDetail {
  slug: FeaturedProductSlug;
  projectName: string;
  accent: "blue" | "orange" | "ink";
  theme: ProductTheme;
  copy: Record<ProductLocale, ProductCopy>;
}

const studio: Record<ProductLocale, ProductCopy> = {
  zh: {
    headline: "把虚空建筑师的工作流，做成一间可进入的数字 Apple Store。",
    subhead: "Studio OS 是工作室主页、产品橱窗和频域决策入口，负责把正在形成的 AI 产品以高级、清晰、可转化的方式呈现给外部世界。",
    scenarioTitle: "它解决什么场景",
    scenario: "当客户、合伙人或朋友第一次搜索 Void Architect，他们不需要读一份项目目录，而是进入一个有质感、有叙事、有产品重心的空间界面。",
    promiseLabel: "Product Promise",
    promise: "让抽象的频域决策能力变成可被理解、可被信任、可被转发的第一印象。",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "继续逛产品橱窗",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "从工作室名片进入产品橱窗",
    screenshotsSubtitle: "三张半真实界面图展示首页、产品详情和数据同步状态。",
    interfaceNotes: ["亮色 VisionOS 空间背景", "精选产品橱窗", "ProjectOS 自动数据通道", "中英双语入口"],
    productSignals: ["首页只展示高吸引力产品", "公开数据边界由 ProjectOS 控制", "Vercel 自动部署", "IP 语言路由"],
    roadmap: ["继续替换真实产品截图", "补齐精选产品长页", "把访问行为接回产品决策", "沉淀成工作室获客入口"],
    screenshots: [
      { eyebrow: "HOME", title: "空间首页", caption: "用亮色玻璃、双色流体和极简排版建立第一印象。", metric: "5 curated apps", asset: "/images/projects/voidarchitect-site/screens/home.svg" },
      { eyebrow: "GALLERY", title: "精选产品橱窗", caption: "只展示最有吸引力的产品，不把主页做成项目目录。", metric: "signal first", asset: "/images/projects/voidarchitect-site/screens/gallery.svg" },
      { eyebrow: "SYNC", title: "ProjectOS 数据通道", caption: "公开字段由 ProjectOS 输出，站点只消费安全边界内的数据。", metric: "live registry", asset: "/images/projects/voidarchitect-site/screens/sync.svg" },
    ],
  },
  en: {
    headline: "A digital Apple Store for the Void Architect workflow.",
    subhead: "Studio OS turns the studio homepage, product gallery, and frequency-domain decision workflow into a polished public storefront.",
    scenarioTitle: "What it is for",
    scenario: "When a client, partner, or friend first lands on Void Architect, they should enter a spatial product experience instead of scanning a repository list.",
    promiseLabel: "Product Promise",
    promise: "Turn abstract decision craft into a first impression people can understand, trust, and share.",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "Keep browsing the gallery",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "From studio identity to product storefront",
    screenshotsSubtitle: "Three semi-real screens show the homepage, product gallery, and data-sync layer.",
    interfaceNotes: ["Bright VisionOS spatial background", "Curated product gallery", "ProjectOS data pipeline", "Bilingual entry points"],
    productSignals: ["Only high-signal products on homepage", "Public boundary controlled by ProjectOS", "Vercel auto deployment", "IP-aware language routing"],
    roadmap: ["Replace mockups with real screenshots", "Complete selected product pages", "Feed traffic signals back into product decisions", "Grow into the studio acquisition surface"],
    screenshots: [
      { eyebrow: "HOME", title: "Spatial homepage", caption: "Bright glass, dual-color fluid energy, and minimal typography shape the first impression.", metric: "5 curated apps", asset: "/images/projects/voidarchitect-site/screens/home.svg" },
      { eyebrow: "GALLERY", title: "Selected product gallery", caption: "The homepage shows the strongest products, not the entire project inventory.", metric: "signal first", asset: "/images/projects/voidarchitect-site/screens/gallery.svg" },
      { eyebrow: "SYNC", title: "ProjectOS data channel", caption: "Public fields are exported by ProjectOS and consumed inside a safe data boundary.", metric: "live registry", asset: "/images/projects/voidarchitect-site/screens/sync.svg" },
    ],
  },
};

const brain: Record<ProductLocale, ProductCopy> = {
  zh: {
    headline: "让个人知识库从文件夹，进化成会回答、会引用、会生成报告的第二大脑。",
    subhead: "Knowledge OS 把本地资料、RAG 问答、多轮对话和可追溯引用整合成一个桌面知识助手。",
    scenarioTitle: "它解决什么场景",
    scenario: "面对论文、方案、日志和项目资料时，不再靠人脑硬搜，而是让知识系统主动组织上下文、给出引用、输出可复用材料。",
    promiseLabel: "Product Promise",
    promise: "把长期积累的文本资产转化为随时可调用的认知杠杆。",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "继续逛产品橱窗",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "知识从检索变成可操作记忆",
    screenshotsSubtitle: "展示知识库、RAG 引用和报告导出三段核心体验。",
    interfaceNotes: ["本地知识库索引", "RAG 可追溯问答", "多轮研究对话", "报告导出工作流"],
    productSignals: ["适合高密度知识工作", "强调本地资料控制", "从检索走向写作输出", "服务个人 OS 而非单次聊天"],
    roadmap: ["强化引用质量", "完善桌面交互", "增加专题知识包", "连接更多个人工作流"],
    screenshots: [
      { eyebrow: "LIBRARY", title: "本地知识库", caption: "资料按主题组织，索引状态和来源边界一眼可见。", metric: "local first", asset: "/images/projects/void-brain/screens/library.svg" },
      { eyebrow: "RAG", title: "可追溯回答", caption: "答案不是黑盒生成，而是带引用、带上下文、可回查。", metric: "6 citations", asset: "/images/projects/void-brain/screens/rag.svg" },
      { eyebrow: "EXPORT", title: "报告导出", caption: "把多轮研究对话收束成可交付的 brief 或方案。", metric: "brief ready", asset: "/images/projects/void-brain/screens/export.svg" },
    ],
  },
  en: {
    headline: "Turn a personal knowledge folder into a second brain that answers, cites, and writes.",
    subhead: "Knowledge OS combines local documents, RAG Q&A, multi-turn research, traceable citations, and report export into a desktop knowledge assistant.",
    scenarioTitle: "What it is for",
    scenario: "When papers, plans, journals, and project notes pile up, the system organizes context, cites sources, and turns knowledge into reusable output.",
    promiseLabel: "Product Promise",
    promise: "Convert long-term text assets into cognitive leverage that can be called on demand.",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "Keep browsing the gallery",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "Knowledge becomes operational memory",
    screenshotsSubtitle: "Three screens show the library, cited RAG answer, and export workflow.",
    interfaceNotes: ["Local knowledge indexing", "Traceable RAG answers", "Multi-turn research dialogue", "Report export workflow"],
    productSignals: ["Built for dense knowledge work", "Keeps local material in focus", "Moves from search to writing", "Serves a personal OS, not one-off chat"],
    roadmap: ["Improve citation quality", "Refine desktop interactions", "Add topic knowledge packs", "Connect more personal workflows"],
    screenshots: [
      { eyebrow: "LIBRARY", title: "Local library", caption: "Sources are organized by topic with visible index and boundary states.", metric: "local first", asset: "/images/projects/void-brain/screens/library.svg" },
      { eyebrow: "RAG", title: "Traceable answer", caption: "Answers are grounded with citations, context, and a path back to source.", metric: "6 citations", asset: "/images/projects/void-brain/screens/rag.svg" },
      { eyebrow: "EXPORT", title: "Report export", caption: "Research dialogue collapses into a deliverable brief or plan.", metric: "brief ready", asset: "/images/projects/void-brain/screens/export.svg" },
    ],
  },
};

const hermes: Record<ProductLocale, ProductCopy> = {
  zh: {
    headline: "把 AI 伙伴从聊天窗口里解放出来，放进一个可驾驶的桌面控制舱。",
    subhead: "Agent Cockpit 聚合语音、任务、运行态和多模型协作，让 Hermes 不只是回答，而是参与执行。",
    scenarioTitle: "它解决什么场景",
    scenario: "当 AI 协作从一次性问答变成持续工作流，需要一个能看见状态、切换模型、追踪任务、承接语音的操作界面。",
    promiseLabel: "Product Promise",
    promise: "把 AI 伙伴变成可观察、可调度、可复盘的桌面系统。",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "继续逛产品橱窗",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "从聊天窗口进入 AI 驾驶舱",
    screenshotsSubtitle: "展示语音控制、任务队列和 agent 运行态。",
    interfaceNotes: ["桌面端伙伴控制台", "语音与任务入口", "运行态可视化", "多模型协作面板"],
    productSignals: ["更接近 cockpit 而非 chat", "适合长任务协作", "面向个人 AI 工作站", "强化人与 agent 的共同驾驶感"],
    roadmap: ["打磨实时状态面板", "增强语音链路", "接入任务历史", "形成日常 AI 控制中枢"],
    screenshots: [
      { eyebrow: "VOICE", title: "语音控制入口", caption: "用自然语言发起任务，把 AI 从输入框里释放出来。", metric: "hands free", asset: "/images/projects/hermes-desktop/screens/voice.svg" },
      { eyebrow: "TASKS", title: "任务队列", caption: "长任务有状态、有阶段、有下一步，不再丢在聊天记录里。", metric: "live queue", asset: "/images/projects/hermes-desktop/screens/tasks.svg" },
      { eyebrow: "STATE", title: "Agent 运行态", caption: "模型、工具、执行状态和结果都在一个 cockpit 内可观察。", metric: "observable", asset: "/images/projects/hermes-desktop/screens/state.svg" },
    ],
  },
  en: {
    headline: "Move the AI partner out of the chat box and into a drivable desktop cockpit.",
    subhead: "Agent Cockpit brings voice, tasks, runtime state, and multi-model collaboration into one operational surface for Hermes.",
    scenarioTitle: "What it is for",
    scenario: "When AI collaboration becomes a continuous workflow, you need an interface that shows state, switches models, tracks tasks, and supports voice.",
    promiseLabel: "Product Promise",
    promise: "Turn an AI partner into an observable, schedulable, and reviewable desktop system.",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "Keep browsing the gallery",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "From chat window to AI cockpit",
    screenshotsSubtitle: "Three screens show voice control, task queue, and agent runtime state.",
    interfaceNotes: ["Desktop partner console", "Voice and task entry", "Runtime state visualization", "Multi-model collaboration panel"],
    productSignals: ["Closer to cockpit than chat", "Designed for long-running collaboration", "A personal AI workstation surface", "Strengthens human-agent co-driving"],
    roadmap: ["Refine real-time status panel", "Strengthen voice pipeline", "Connect task history", "Become the daily AI control center"],
    screenshots: [
      { eyebrow: "VOICE", title: "Voice control", caption: "Start work through natural language and move beyond the text box.", metric: "hands free", asset: "/images/projects/hermes-desktop/screens/voice.svg" },
      { eyebrow: "TASKS", title: "Task queue", caption: "Long-running work has state, phases, and visible next actions.", metric: "live queue", asset: "/images/projects/hermes-desktop/screens/tasks.svg" },
      { eyebrow: "STATE", title: "Agent state", caption: "Models, tools, execution state, and output are observable in one cockpit.", metric: "observable", asset: "/images/projects/hermes-desktop/screens/state.svg" },
    ],
  },
};

const recorder: Record<ProductLocale, ProductCopy> = {
  zh: {
    headline: "让屏幕操作不再消失，把每一次工作过程变成可检索的行动记忆。",
    subhead: "Memory Recorder 捕捉操作过程，把屏幕行为转化为可总结、可追踪、可复盘的工作上下文。",
    scenarioTitle: "它解决什么场景",
    scenario: "调试、研究、演示和操作教学常常发生在屏幕上，但完成后只剩模糊记忆。这个产品把过程本身变成资产。",
    promiseLabel: "Product Promise",
    promise: "把看不见的操作经验，沉淀成 AI 能理解和复用的工作记忆。",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "继续逛产品橱窗",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "把屏幕过程变成可检索记忆",
    screenshotsSubtitle: "展示屏幕播放、操作时间线和 AI 摘要三个核心画面。",
    interfaceNotes: ["屏幕过程记录", "操作片段复盘", "AI 摘要生成", "可检索工作记忆"],
    productSignals: ["适合调试与教学", "把行为转为上下文", "补足传统笔记盲区", "可作为 agent 记忆入口"],
    roadmap: ["提高事件识别精度", "优化时间线界面", "增加导出模板", "与个人知识库联动"],
    screenshots: [
      { eyebrow: "PLAYER", title: "屏幕回放", caption: "把工作过程以播放器方式重看，定位关键动作。", metric: "timeline", asset: "/images/projects/ai-screen-record/screens/player.svg" },
      { eyebrow: "EVENTS", title: "操作时间线", caption: "点击、切换、输入和页面变化被整理成可读事件。", metric: "action map", asset: "/images/projects/ai-screen-record/screens/events.svg" },
      { eyebrow: "SUMMARY", title: "AI 摘要", caption: "把一段屏幕过程压缩成可检索、可复盘的工作记忆。", metric: "memory card", asset: "/images/projects/ai-screen-record/screens/summary.svg" },
    ],
  },
  en: {
    headline: "Stop losing screen work. Turn every session into searchable action memory.",
    subhead: "Memory Recorder captures screen activity and turns it into traceable, summarizable, reviewable work context.",
    scenarioTitle: "What it is for",
    scenario: "Debugging, research, demos, and operational teaching often happen on screen. Afterward, only fuzzy memory remains unless the process itself becomes an asset.",
    promiseLabel: "Product Promise",
    promise: "Turn invisible operational experience into work memory that AI can understand and reuse.",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "Keep browsing the gallery",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "Screen work becomes searchable memory",
    screenshotsSubtitle: "Three screens show playback, action timeline, and AI summary.",
    interfaceNotes: ["Screen process recording", "Action segment review", "AI summary generation", "Searchable work memory"],
    productSignals: ["Useful for debugging and teaching", "Turns behavior into context", "Covers what notes miss", "Can become an agent memory inlet"],
    roadmap: ["Improve event recognition", "Refine timeline UI", "Add export templates", "Connect with personal knowledge base"],
    screenshots: [
      { eyebrow: "PLAYER", title: "Screen playback", caption: "Replay the work process and jump to key actions.", metric: "timeline", asset: "/images/projects/ai-screen-record/screens/player.svg" },
      { eyebrow: "EVENTS", title: "Action timeline", caption: "Clicks, switches, typing, and page changes become readable events.", metric: "action map", asset: "/images/projects/ai-screen-record/screens/events.svg" },
      { eyebrow: "SUMMARY", title: "AI summary", caption: "Compress a screen session into searchable, reviewable work memory.", metric: "memory card", asset: "/images/projects/ai-screen-record/screens/summary.svg" },
    ],
  },
};

const texas: Record<ProductLocale, ProductCopy> = {
  zh: {
    headline: "把德州扑克策略、哲学人格和 Roguelike 成长，做成一款高粘性的思维训练游戏。",
    subhead: "Training Game 不是牌局模拟器，而是用游戏化反馈训练风险、概率、性格识别和长期决策。",
    scenarioTitle: "它解决什么场景",
    scenario: "策略训练如果只是读书和复盘，很难形成高频反馈。游戏机制可以把抽象思维变成一次次可玩的选择。",
    promiseLabel: "Product Promise",
    promise: "让概率判断、对手建模和心智纪律在可玩系统里被反复锻造。",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "继续逛产品橱窗",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "把策略训练做成可玩的成长系统",
    screenshotsSubtitle: "展示牌桌训练、AI Persona 和 Roguelike 成长三段体验。",
    interfaceNotes: ["AI 性格对手", "策略训练回合", "Roguelike 成长曲线", "哲学化反馈文本"],
    productSignals: ["视觉和故事张力强", "适合产品化传播", "游戏化承载抽象训练", "与频域决策气质一致"],
    roadmap: ["完善核心循环", "扩展 AI 人格牌桌", "增强成长系统", "打磨可分享战报"],
    screenshots: [
      { eyebrow: "TABLE", title: "策略牌桌", caption: "每一手牌都是概率、风险和纪律的训练回合。", metric: "decision loop", asset: "/images/projects/texas-philosopher/screens/table.svg" },
      { eyebrow: "PERSONA", title: "AI 性格对手", caption: "不同人格迫使玩家识别模式，而不是机械背策略。", metric: "6 personas", asset: "/images/projects/texas-philosopher/screens/persona.svg" },
      { eyebrow: "RUN", title: "Roguelike 成长", caption: "训练反馈沉淀为成长路径，让策略学习有长期粘性。", metric: "level 7", asset: "/images/projects/texas-philosopher/screens/run.svg" },
    ],
  },
  en: {
    headline: "Poker strategy, philosophical personas, and Roguelike growth as a sticky training game.",
    subhead: "Training Game is not just a poker simulator. It trains risk, probability, personality reading, and long-horizon decision discipline through playable feedback.",
    scenarioTitle: "What it is for",
    scenario: "Strategy training through reading and review lacks fast feedback. Game mechanics turn abstract thinking into repeated playable choices.",
    promiseLabel: "Product Promise",
    promise: "Forge probability judgment, opponent modeling, and mental discipline inside a playable system.",
    interfaceLabel: "Core Interface",
    signalLabel: "Product Signals",
    roadmapLabel: "Roadmap",
    moreLabel: "More Selected Products",
    moreTitle: "Keep browsing the gallery",
    screenshotsLabel: "App Store Screens",
    screenshotsTitle: "Strategy training as a playable growth system",
    screenshotsSubtitle: "Three screens show table training, AI personas, and Roguelike progression.",
    interfaceNotes: ["AI personality opponents", "Strategy training rounds", "Roguelike growth curve", "Philosophical feedback text"],
    productSignals: ["Strong visual and story tension", "Easy to communicate as a product", "Games carry abstract training", "Matches frequency-domain decision taste"],
    roadmap: ["Complete core loop", "Expand AI persona tables", "Strengthen growth system", "Polish shareable battle reports"],
    screenshots: [
      { eyebrow: "TABLE", title: "Strategy table", caption: "Every hand becomes a training round for probability, risk, and discipline.", metric: "decision loop", asset: "/images/projects/texas-philosopher/screens/table.svg" },
      { eyebrow: "PERSONA", title: "AI personas", caption: "Different personalities force pattern reading instead of rote strategy.", metric: "6 personas", asset: "/images/projects/texas-philosopher/screens/persona.svg" },
      { eyebrow: "RUN", title: "Roguelike growth", caption: "Training feedback becomes a progression path with long-term pull.", metric: "level 7", asset: "/images/projects/texas-philosopher/screens/run.svg" },
    ],
  },
};

export const PRODUCT_DETAILS: Record<FeaturedProductSlug, ProductDetail> = {
  "voidarchitect-site": {
    slug: "voidarchitect-site",
    projectName: "voidarchitect-site",
    accent: "blue",
    theme: {
      text: "text-[#007AFF]",
      softText: "text-[#0B6FE8]",
      gradient: "from-[#05070A] via-[#007AFF] to-[#FF6B35]",
      halo: "bg-[#007AFF]/18",
      haloSecondary: "bg-[#FF6B35]/14",
      promise: "bg-[#05070A]",
    },
    copy: studio,
  },
  "void-brain": {
    slug: "void-brain",
    projectName: "void-brain",
    accent: "blue",
    theme: {
      text: "text-[#007AFF]",
      softText: "text-[#2563EB]",
      gradient: "from-[#55C7FF] via-[#007AFF] to-[#05070A]",
      halo: "bg-[#007AFF]/20",
      haloSecondary: "bg-[#55C7FF]/16",
      promise: "bg-[#071A2E]",
    },
    copy: brain,
  },
  "hermes-desktop": {
    slug: "hermes-desktop",
    projectName: "hermes-desktop",
    accent: "orange",
    theme: {
      text: "text-[#FF6B35]",
      softText: "text-[#D95A2C]",
      gradient: "from-[#111318] via-[#FF6B35] to-[#55C7FF]",
      halo: "bg-[#FF6B35]/20",
      haloSecondary: "bg-[#55C7FF]/14",
      promise: "bg-[#111318]",
    },
    copy: hermes,
  },
  "ai-screen-record": {
    slug: "ai-screen-record",
    projectName: "AI-Screen-Record",
    accent: "ink",
    theme: {
      text: "text-[#223047]",
      softText: "text-[#4B5565]",
      gradient: "from-[#05070A] via-[#143766] to-[#007AFF]",
      halo: "bg-[#05070A]/14",
      haloSecondary: "bg-[#007AFF]/14",
      promise: "bg-[#05070A]",
    },
    copy: recorder,
  },
  "texas-philosopher": {
    slug: "texas-philosopher",
    projectName: "TexasPhilosopher",
    accent: "orange",
    theme: {
      text: "text-[#FF6B35]",
      softText: "text-[#C94F24]",
      gradient: "from-[#052E2A] via-[#FF6B35] to-[#007AFF]",
      halo: "bg-[#FF6B35]/20",
      haloSecondary: "bg-[#007AFF]/14",
      promise: "bg-[#052E2A]",
    },
    copy: texas,
  },
};

const SLUG_BY_NAME: Record<string, FeaturedProductSlug> = {
  "voidarchitect-site": "voidarchitect-site",
  "void-brain": "void-brain",
  "hermes-desktop": "hermes-desktop",
  "AI-Screen-Record": "ai-screen-record",
  TexasPhilosopher: "texas-philosopher",
};

export function productSlug(project: PublicProject): FeaturedProductSlug | null {
  return SLUG_BY_NAME[project.name] ?? null;
}

export function isFeaturedProductSlug(slug: string): slug is FeaturedProductSlug {
  return FEATURED_PRODUCT_SLUGS.includes(slug as FeaturedProductSlug);
}
