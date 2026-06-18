# 2026-06-18 — D3.7 产品独立主题 + View Transition

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.7 产品详情页体验增强

## 决策

D3.7 在 D3.2 详情页和 D3.6 半真实 mockup 的基础上，继续增强“App 产品页”感觉：

1. 每个精选产品拥有独立 accent theme
2. 首页卡片到详情页使用 Astro View Transitions
3. 详情页进入时有轻微空间上浮和 blur 解除效果

目标是让产品详情页不只是信息页，而像从首页橱窗进入一个独立 App 展示空间。

## 改动

### 独立产品主题

在 `src/lib/product-details.ts` 为每个产品新增 `theme`：

- `voidarchitect-site`：黑 / Apple 蓝 / 炽热橙
- `void-brain`：知识蓝 / 冷光蓝 / 深夜蓝
- `hermes-desktop`：深黑 / Hermes 橙 / 电光蓝
- `AI-Screen-Record`：高级黑灰 / 深蓝 / 记录蓝
- `TexasPhilosopher`：牌桌绿 / 炽热橙 / 策略蓝

详情页使用这些主题控制：

- hero 光晕
- cover 渐变底色
- section eyebrow 文案色
- promise 深色卡片

### View Transitions

- `Layout.astro` 引入 `ClientRouter`
- 首页 `ProjectCard.astro`：
  - cover image 使用 `transition:name="product-cover-{slug}"`
  - title 使用 `transition:name="product-title-{slug}"`
- `/projects/[slug].astro`：
  - hero cover 与 title 使用同名 transition
  - 页面整体增加 `page-rise` 进入动画
  - root view transition 使用 520ms Apple-like 缓动

## 设计判断

D3.7 的重点不是加更多内容，而是让“进入产品”的动作更有仪式感：从卡片封面扩展为详情页大图，从卡片标题延展为页面主标题。这样首页不再只是列表，而是产品橱窗。

## 验证

- `npm run build` 通过
- 本地 HTML 检查通过：
  - 首页包含 Astro View Transition runtime
  - `/projects/hermes-desktop` 包含 `product-cover-hermes-desktop`
  - `/projects/texas-philosopher` 包含独立主题色 `bg-[#052E2A]`

## 后续建议

D3.8 可以做两件事之一：

1. 为英文 `/en/` 接入产品详情页国际化路由
2. 给详情页增加一组真实/半真实界面图片区，让每个产品像 App Store 的 screenshot carousel
