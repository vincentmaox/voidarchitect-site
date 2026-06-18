# 2026-06-18 — D3.6 半真实产品界面 Mockup

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.6 产品图升级

## 决策

在 D3.2 产品详情页完成后，继续把 5 个精选产品的 cover 从“概念海报”推进到“半真实 App 界面截图感”。目标不是伪造真实已完成界面，而是让首页和详情页更接近 Apple Store 产品橱窗：每个产品都像一个正在成形、可被想象使用的 App。

## 改动

升级 5 张 SVG cover：

1. `voidarchitect-site` — Studio OS
   - 从空间海报改为站点橱窗界面
   - 加入浏览器窗口栏、精选产品卡、进度条

2. `void-brain` — Knowledge OS
   - 从知识网络概念图改为桌面知识库界面
   - 加入侧栏、RAG 回答、引用/导出模块、知识图谱

3. `hermes-desktop` — Agent Cockpit
   - 从控制台概念图改为 AI 伙伴驾驶舱
   - 加入语音/任务/运行态模块、实时 agent state 卡片

4. `AI-Screen-Record` — Memory Recorder
   - 从播放器概念图改为屏幕记录 + 时间线 + AI 摘要界面
   - 加入播放窗口、时间线、事件标签、摘要卡片

5. `TexasPhilosopher` — Training Game
   - 从牌桌概念图改为训练游戏界面
   - 加入侧栏、风险纪律标签、AI Persona、Roguelike 进度

## 设计判断

保持高级亮色 Apple-like / VisionOS 风格，但每张 cover 必须更有“产品功能感”：

- 不再只是好看的封面
- 必须能一眼看出产品在干什么
- 仍然是公开、安全、产品化表达，不暴露内部项目细节

## 验证

- `npm run build` 通过
- 本地 5 张 SVG 资产均返回 200 且为有效 `<svg>`：
  - `/images/projects/voidarchitect-site/cover.svg`
  - `/images/projects/void-brain/cover.svg`
  - `/images/projects/hermes-desktop/cover.svg`
  - `/images/projects/ai-screen-record/cover.svg`
  - `/images/projects/texas-philosopher/cover.svg`

## 后续建议

下一轮可以做 D3.7：给详情页增加更强的视觉结构，例如每个产品独立 accent theme、真实界面图片区、以及首页到详情页的 View Transition 动效。
