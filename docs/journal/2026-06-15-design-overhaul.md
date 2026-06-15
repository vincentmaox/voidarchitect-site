# 2026-06-15 — 大片感设计改版

**日期：** 2026-06-15
**主体：** 老茅 + 老赫
**MVA 阶段：** Day2（市场介质迭代）→ Day3 组织验证（推朋友圈/客户）

## 背景

上线后老茅反馈：
- 整体色调不够高级，不够时尚
- 色调偏暗沉，主流客户吸引力不足
- 流体孤零零在文字下方，不融合
- 每个项目需要简单一句话介绍 + 产品图
- 需要大片感（cinematic / blockbuster feel）

## 调研（并行三路 agent）

- awwwards SOTD 2025-2026 趋势：暗+爆炸色双色调、超大排版、玻璃拟态、鼠标光晕
- Magic UI 60+ 组件清单：Particles / Animated Beam / Dock / Blur Fade / Border Beam / Shimmer Button 等
- 高级配色：#0D1117 背景 + #00D4FF 电光青 + #FF6B35 炽热橙（CTA 爆炸色）

**决策：不引入新依赖**（framer-motion 已装，其余纯 CSS/Tailwind），避免包膨胀。

## 改动清单

### D2.3 蓝青科技风（过渡版）

- 背景 #060b18 → #060b18（深蓝黑）
- accent 暗金 → 电青 #22d3ee / 蓝 #3b82f6
- 流体改为全屏背景，文字直接浮上
- 项目卡加产品图标占位 + tech_stack 标签
- commit: bc8524c

### D2.4 大片感终版（当前）

| 项 | 旧 | 新 |
|---|---|---|
| 背景 | #060b18 | **#0D1117**（更透气，暗而不闷） |
| 主 accent | #22d3ee | **#00D4FF**（更亮更电） |
| 辅 accent | 无 | **#FF6B35 炽热橙**（CTA/高亮爆炸色） |
| 文字 | #f4f4f5 | **#E6EDF3 柔白**，更大更突出 |
| surface | 无定义 | **#161B22**（卡片底色） |
| border | 无定义 | **#30363D**（分隔线） |

**Hero 区：**
- R3F WebGL 流体：暗金/烟青/暗黑 → **电光青/炽热橙/深海蓝** 三色域
- 加 **3 个缓慢移动渐变发光球**（CSS animation，零 JS）
- 标题 text-glow 增强：3 层 cyan shadow（60px/120px/180px）
- "Architect" 用 accent 色，-0.04em 字间距
- **鼠标跟随光晕**：300px 柔光球（纯 CSS transition + JS RAF）
- 渐变遮罩 from-void-bg/40 → to-void-bg/90 保证文字可读

**项目卡：**
- 每张加 **渐变顶部色带**（图片占位区）+ 项目名首字母大图标
- **玻璃拟态**主体：rgba(22,27,34,0.5) + backdrop-blur(20px) + border
- 悬停时 cyan shadow + border 高亮
- tech_stack 标签改为 subtle 风格
- stage 标签改为 **badge 胶囊**样式
- auto-rows 从 180px 提升到 240px（更大更舒展）

**新增 CSS utilities：**
- `.text-glow` / `.text-glow-hot`
- `.glass` / `.glass-strong`
- `.gradient-border`

## 技术决策

| 决策 | 选项 | 拍板 | 理由 |
|---|---|---|---|
| Magic UI 组件 | 装 / 不装 | **不装** | shadcn CLI 引入量太大，已有 framer-motion + Tailwind 足够 |
| GSAP ScrollTrigger | 装 / 不装 | **不装** | framer-motion useInView 已够用 |
| 发光球实现 | WebGL / CSS | **CSS** | 性能更好，零 JS overhead |
| 鼠标光晕 | Canvas / CSS | **CSS radial-gradient** | 最简单，300px 柔光足够 |

## 踩坑

### 1. 网络搜索受限
国内网络访问 awwwards.com / magicui.design / ui.aceternity.com / github.com 全部被拦截或返回空。只能靠 Playwright 浏览器实地访问 + agent 后台调研。

### 2. Agent 模型不兼容
三路 agent 中有两路因 "Model only support text input" 报错。最终只有 Magic UI + Framer 的 agent 成功返回完整报告。

### 3. Vercel CDN 缓存又一次被 prerender 坑
D2.3 蓝青版 push 后，`curl` 验证内容还是旧的。因为 `prerender=false` 的页面 HTML 由 Edge function 渲染，curl 带 random query param 才能 bypass cache。确认了 `X-Vercel-Cache: MISS` 才是正确信号。

## 当前状态

- ✅ voidarchitect.studio 已更新（D2.4 大片感版）
- ✅ 跨仓 webhook（ProjectOS push → Vercel rebuild）
- ✅ 每日脚本 auto-commit + push
- ⏸ 朋友圈推送（文案已写好，待老茅发）
- ⏸ 真实客户反馈收集（Day3 组织验证）

## 下次冷启动需知

- 配色 token 在 `src/styles/global.css` 的 `@theme` 里
- 鼠标光晕是 `HomePage.astro` 底部的 `<script is:inline>`
- 发光球是纯 CSS `@keyframes`（orbFloat1/2/3）
- 流体 shader 在 `FluidHero.tsx`，三色域改颜色只需改 vec3 c0/c1/c2/c3
