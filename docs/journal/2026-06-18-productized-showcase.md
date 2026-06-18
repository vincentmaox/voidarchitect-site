# 2026-06-18 — 精选作品产品化

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.6 精选橱窗 → 产品化表达

## 决策

老茅决定：将首页精选中的 `ai-router-48h` 替换为 `TexasPhilosopher`，继续避免核电相关项目进入主页。首页要像产品橱窗，而不是项目目录。

## 当前精选产品

1. `voidarchitect-site` — Studio OS
2. `void-brain` — Knowledge OS
3. `hermes-desktop` — Agent Cockpit
4. `AI-Screen-Record` — Memory Recorder
5. `TexasPhilosopher` — Training Game

`NuclearPowerAI` 和 `ai-router-48h` 均不进入主页精选。

## 改动

### ProjectOS

- `TexasPhilosopher` 从 public export 隐藏名单中移出
- `public-bios.json`：
  - 去掉 `ai-router-48h.featured`
  - 增加 `TexasPhilosopher.featured`
  - 为 5 个精选项目增加 `product_label`
- `export_public_registry.py`：公开导出 `product_label`
- 重新导出 `public-registry.json`

### voidarchitect-site

- `PublicProject` 增加 `product_label?: string | null`
- `ProjectCard.astro`：
  - 顶部 cover overlay 显示具体产品标签，不再统一写 `Independent App`
  - 卡片内容区增加产品标签 pill
- `zh.ts` / `en.ts`：项目区文案从“在建工程 / ProjectOS 实时数据”改为“精选产品 / 产品橱窗”
- 新增 `TexasPhilosopher` cover：`public/images/projects/texas-philosopher/cover.svg`

## 设计判断

`TexasPhilosopher` 是游戏化训练产品，和虚空建筑师的“把抽象思维做成可玩的系统”很贴合。它比 `ai-router-48h` 更有视觉和故事张力，适合首页橱窗第五张卡。

## 验证

- `npm run build` 通过
- featured 集合为 5 项：站点 / 大脑 / Hermes / 录屏 / TexasPhilosopher
- `NuclearPowerAI.featured === false`
- `ai-router-48h.featured === false`

## 后续建议

下一步做 D3.2 项目详情页时，只服务这 5 个精选产品。详情页应该像 App 产品页，而不是 repo README：

1. 产品一句话
2. 使用场景
3. 核心界面图
4. 当前进展
5. 下一步 Roadmap
