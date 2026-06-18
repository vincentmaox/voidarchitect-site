# 2026-06-18 — D3.10-D3.13 精选产品展示收口

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.10-D3.13 App Store 化收口

## 决策

按 D3.10 → D3.12 → D3.11 → D3.13 的顺序一次性推进：先把截图资产做得更像真实产品窗口，再补转化 CTA，然后加强首页产品故事钩子，最后做 SEO / 分享 / 移动端体验和构建告警收口。

## D3.10 — 截图生产线

新增 `scripts/generate-product-screenshots.py`，把 5 个精选产品的 15 张 SVG 截图资产变成可重复生成的产品截图生产线。

重绘后的截图资产包含：

- macOS 风格窗口外壳
- 具体产品界面结构
- 侧边栏、卡片、时间线、状态板、牌桌等产品化元素
- 每个产品独立色彩气质

仍保留当前安全边界：这些是高保真产品表达资产，不伪装成已上线的真实应用截图。

## D3.12 — 转化 CTA

更新 `src/lib/product-details.ts`：

- 每个产品双语新增：
  - `ctaLabel`
  - `ctaTitle`
  - `ctaBody`
  - `ctaPrimary`
  - `ctaSecondary`
- 详情页 hero 主按钮改为产品咨询入口
- 详情页底部新增深色 CTA 区块
- CTA 使用 `mailto:hi@voidarchitect.studio`，不接入外部表单，不引入隐私数据采集

## D3.11 — 首页故事钩子

新增 `storyHook` 字段，并在首页项目卡片展示：

- `void-brain`：个人知识第二大脑
- `hermes-desktop`：AI 桌面驾驶舱
- `AI-Screen-Record`：屏幕行动记忆
- `TexasPhilosopher`：策略训练游戏
- `voidarchitect-site`：工作室产品橱窗

首页继续只展示精选产品，不回退成项目清单。

## D3.13 — 性能、分享和移动端

更新 `src/layouts/Layout.astro`：

- 支持动态 `canonicalPath`
- 支持动态 `ogImage`
- 补充 Open Graph / Twitter card 元信息

更新页面：

- 首页传入语言对应 canonical
- 详情页传入产品详情 canonical 和产品 cover 作为 OG 图
- 截图轮播移动端高度优化
- 首张截图 `loading="eager"` + `fetchpriority="high"`
- `.playwright-mcp/` 加入 `.gitignore`
- Astro/Vite chunk warning 通过合理提高阈值收口；不做与 Vercel server build 冲突的手动分包

## 验证

- `npm run build` 通过
- 最终构建无 chunk size warning
- 远端 ProjectOS public registry 可取到 17 个公开项目，其中 5 个 featured：
  - `voidarchitect-site`
  - `void-brain`
  - `hermes-desktop`
  - `AI-Screen-Record`
  - `TexasPhilosopher`

## 本地验证说明

本地 Astro dev 的 Node `fetch` 直连 GitHub raw 出现 `UND_ERR_CONNECT_TIMEOUT` / `ECONNRESET`，导致本地 `/en/` 项目区临时为空。Python `urllib` 能成功取到同一 public registry，说明数据源本身正常。

本次不把 ProjectOS public registry 复制进本站做 fallback，避免破坏“公开数据范围由 ProjectOS 控制”的边界。生产环境仍依赖 Vercel 网络访问 GitHub raw。

## 后续建议

下一步可以做 D3.14：增加轻量站内诊断页或表单前端，但仍建议先用 `mailto:` 验证真实咨询意图，避免过早接入表单、数据库和反垃圾系统。
