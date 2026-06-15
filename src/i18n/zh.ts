export const zh = {
  meta: {
    title: "Void Architect — 茅弘毅 / 双世界译员 / 频域决策",
    description: "虚空建筑师工作室。AI 与现实交界处的频域决策与非对称风险套利。",
  },
  nav: {
    studio: "Void Architect",
    person: "茅弘毅 · 弘毅 · 双世界译员",
    contact: "hi@voidarchitect.studio",
  },
  hero: {
    eyebrow: "/ Studio · 频域决策 · 非对称风险套利",
    title1: "Void",
    title2: "Architect",
    body: [
      "身处虚空世界与现实世界的缝隙间。",
      "与 AI 共同用频域思维构筑虚空世界，",
      "为客户做非对称风险套利与跨界交流。",
    ],
    scroll: "查看项目",
    location: "2026 · Shenzhen",
  },
  projects: {
    eyebrow: "/ Projects · 来自 ProjectOS 实时数据",
    title: "在建工程",
    subtitle: "由 ProjectOS 自动同步 · 按 stage / 最新动作排序",
    empty: "暂无可公开项目（数据接入中）。",
    freqLabel: "三频",
    repoLabel: "GitHub",
    lastActionLabel: "最近",
    stageLabels: {
      "All-in": "All-in",
      "活跃": "活跃",
      "野化": "野化",
      "Watch": "Watch",
      "停滞": "停滞",
      "已归档": "已归档",
      "Kill": "Kill",
    } as Record<string, string>,
    fallbackDescription: "（项目简介尚未公开）",
  },
  footer: {
    rights: "© 2026 Void Architect Studio",
    poweredBy: "由 ProjectOS 自动驱动",
  },
  langSwitch: { other: "EN", otherHref: "/en/" },
};

export type Dict = typeof zh;
