# 2026-06-18 — 首页精选橱窗

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.6 产品图补强 → 首页从项目清单升级为精选作品橱窗

## 决策

老茅明确：后续主页不需要展示所有项目，而要展示有吸引力的项目；带有明显核电内容字样的项目不作为主页重点展示。下一批推送 `hermes-desktop` 和 `AI-Screen-Record`。

## 设计判断

首页不是 ProjectOS 的全量公开索引，而是 Void Architect 的商业名片和作品橱窗。全量项目会稀释品牌气质，尤其是行业属性过强、容易让第一印象偏离“高级 AI 产品工作室”的项目。

因此站点改为：

- ProjectOS 仍可公开导出全量 registry
- 首页只渲染 `featured === true` 的项目
- 首页排序由 `showcase_rank` 控制
- 明显核电内容项目保持 registry 可见但不进入主页精选

## 当前精选名单

1. `voidarchitect-site` — 工作室主页本体
2. `void-brain` — 个人 AI 知识库桌面助手
3. `hermes-desktop` — 桌面端 AI 伙伴控制台
4. `AI-Screen-Record` — AI 屏幕记录与复盘工具
5. `ai-router-48h` — 跨模型路由 SaaS

`NuclearPowerAI` 不配置 `featured`，不进入主页。

## 改动

### ProjectOS

- `agent/export_public_registry.py`
  - 增加公开字段 `featured`
  - 增加公开字段 `showcase_rank`
- `data/public-bios.json`
  - 为精选项目配置简介、cover、featured、showcase_rank
  - 不给 `NuclearPowerAI` 配 featured
- `data/public-registry.json`
  - 重新导出

### voidarchitect-site

- `src/lib/registry.ts`
  - `PublicProject` 增加 `featured?: boolean`
  - `PublicProject` 增加 `showcase_rank?: number | null`
- `src/components/ProjectGrid.astro`
  - 只渲染 `featured` 项目
  - 按 `showcase_rank` 排序
- 新增 cover：
  - `public/images/projects/hermes-desktop/cover.svg`
  - `public/images/projects/ai-screen-record/cover.svg`

## 建议

下一步不要扩充到十几个项目，而是把 5 个精选项目做深：

1. 每个精选项目补真实截图或更接近产品界面的 cover
2. 做 `/projects/[slug]` 详情页，只服务精选项目
3. 首页底部可以加一个很轻的 “More experiments” 链接，但不要让实验项目进入第一屏作品墙

这样首页会更像 Apple Store 的精选橱窗，而不是 GitHub 项目目录。
