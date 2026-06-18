import type { PublicProject } from "./registry";

export const FEATURED_PRODUCT_SLUGS = [
  "voidarchitect-site",
  "void-brain",
  "hermes-desktop",
  "ai-screen-record",
  "texas-philosopher",
] as const;

export type FeaturedProductSlug = (typeof FEATURED_PRODUCT_SLUGS)[number];

export interface ProductDetail {
  slug: FeaturedProductSlug;
  projectName: string;
  headline: string;
  subhead: string;
  accent: "blue" | "orange" | "ink";
  scenario: string;
  promise: string;
  interfaceNotes: string[];
  productSignals: string[];
  roadmap: string[];
}

export const PRODUCT_DETAILS: Record<FeaturedProductSlug, ProductDetail> = {
  "voidarchitect-site": {
    slug: "voidarchitect-site",
    projectName: "voidarchitect-site",
    headline: "把虚空建筑师的工作流，做成一间可进入的数字 Apple Store。",
    subhead: "Studio OS 是工作室主页、产品橱窗和频域决策入口，负责把正在形成的 AI 产品以高级、清晰、可转化的方式呈现给外部世界。",
    accent: "blue",
    scenario: "当客户、合伙人或朋友第一次搜索 Void Architect，他们不需要读一份项目目录，而是进入一个有质感、有叙事、有产品重心的空间界面。",
    promise: "让抽象的频域决策能力变成可被理解、可被信任、可被转发的第一印象。",
    interfaceNotes: ["亮色 VisionOS 空间背景", "精选产品橱窗", "ProjectOS 自动数据通道", "中英双语入口"],
    productSignals: ["首页只展示高吸引力产品", "公开数据边界由 ProjectOS 控制", "Vercel 自动部署", "IP 语言路由"],
    roadmap: ["继续替换真实产品截图", "补齐精选产品长页", "把访问行为接回产品决策", "沉淀成工作室获客入口"],
  },
  "void-brain": {
    slug: "void-brain",
    projectName: "void-brain",
    headline: "让个人知识库从文件夹，进化成会回答、会引用、会生成报告的第二大脑。",
    subhead: "Knowledge OS 把本地资料、RAG 问答、多轮对话和可追溯引用整合成一个桌面知识助手。",
    accent: "blue",
    scenario: "面对论文、方案、日志和项目资料时，不再靠人脑硬搜，而是让知识系统主动组织上下文、给出引用、输出可复用材料。",
    promise: "把长期积累的文本资产转化为随时可调用的认知杠杆。",
    interfaceNotes: ["本地知识库索引", "RAG 可追溯问答", "多轮研究对话", "报告导出工作流"],
    productSignals: ["适合高密度知识工作", "强调本地资料控制", "从检索走向写作输出", "服务个人 OS 而非单次聊天"],
    roadmap: ["强化引用质量", "完善桌面交互", "增加专题知识包", "连接更多个人工作流"],
  },
  "hermes-desktop": {
    slug: "hermes-desktop",
    projectName: "hermes-desktop",
    headline: "把 AI 伙伴从聊天窗口里解放出来，放进一个可驾驶的桌面控制舱。",
    subhead: "Agent Cockpit 聚合语音、任务、运行态和多模型协作，让 Hermes 不只是回答，而是参与执行。",
    accent: "orange",
    scenario: "当 AI 协作从一次性问答变成持续工作流，需要一个能看见状态、切换模型、追踪任务、承接语音的操作界面。",
    promise: "把 AI 伙伴变成可观察、可调度、可复盘的桌面系统。",
    interfaceNotes: ["桌面端伙伴控制台", "语音与任务入口", "运行态可视化", "多模型协作面板"],
    productSignals: ["更接近 cockpit 而非 chat", "适合长任务协作", "面向个人 AI 工作站", "强化人与 agent 的共同驾驶感"],
    roadmap: ["打磨实时状态面板", "增强语音链路", "接入任务历史", "形成日常 AI 控制中枢"],
  },
  "ai-screen-record": {
    slug: "ai-screen-record",
    projectName: "AI-Screen-Record",
    headline: "让屏幕操作不再消失，把每一次工作过程变成可检索的行动记忆。",
    subhead: "Memory Recorder 捕捉操作过程，把屏幕行为转化为可总结、可追踪、可复盘的工作上下文。",
    accent: "ink",
    scenario: "调试、研究、演示和操作教学常常发生在屏幕上，但完成后只剩模糊记忆。这个产品把过程本身变成资产。",
    promise: "把看不见的操作经验，沉淀成 AI 能理解和复用的工作记忆。",
    interfaceNotes: ["屏幕过程记录", "操作片段复盘", "AI 摘要生成", "可检索工作记忆"],
    productSignals: ["适合调试与教学", "把行为转为上下文", "补足传统笔记盲区", "可作为 agent 记忆入口"],
    roadmap: ["提高事件识别精度", "优化时间线界面", "增加导出模板", "与个人知识库联动"],
  },
  "texas-philosopher": {
    slug: "texas-philosopher",
    projectName: "TexasPhilosopher",
    headline: "把德州扑克策略、哲学人格和 Roguelike 成长，做成一款高粘性的思维训练游戏。",
    subhead: "Training Game 不是牌局模拟器，而是用游戏化反馈训练风险、概率、性格识别和长期决策。",
    accent: "orange",
    scenario: "策略训练如果只是读书和复盘，很难形成高频反馈。游戏机制可以把抽象思维变成一次次可玩的选择。",
    promise: "让概率判断、对手建模和心智纪律在可玩系统里被反复锻造。",
    interfaceNotes: ["AI 性格对手", "策略训练回合", "Roguelike 成长曲线", "哲学化反馈文本"],
    productSignals: ["视觉和故事张力强", "适合产品化传播", "游戏化承载抽象训练", "与频域决策气质一致"],
    roadmap: ["完善核心循环", "扩展 AI 人格牌桌", "增强成长系统", "打磨可分享战报"],
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
