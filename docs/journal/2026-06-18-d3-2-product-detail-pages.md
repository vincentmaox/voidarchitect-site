# 2026-06-18 — D3.2 精选产品详情页

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.2 精选产品详情页

## 决策

详情页只服务首页 5 个精选产品：

1. `voidarchitect-site` — Studio OS
2. `void-brain` — Knowledge OS
3. `hermes-desktop` — Agent Cockpit
4. `AI-Screen-Record` — Memory Recorder
5. `TexasPhilosopher` — Training Game

`NuclearPowerAI`、`ai-router-48h` 和其它非精选项目不生成产品详情页，访问会回到首页。

## 改动

- 新增 `src/lib/product-details.ts`
  - 定义 5 个白名单 slug
  - 为每个精选产品补产品化详情文案
  - 提供 `productSlug()` 和 `isFeaturedProductSlug()`
- 新增 `/projects/[slug]` 动态详情页
  - App 产品页式首屏
  - 使用场景、产品承诺、核心界面、产品信号、Roadmap
  - 底部关联其它精选产品
  - 继续使用 ProjectOS public registry 的公开字段
- 更新 `ProjectCard.astro`
  - 首页卡片封面链接到详情页
  - GitHub 保留为底部二级出口

## 设计判断

详情页不做 repo README，也不展开内部工程细节；每一页都像一个正在成形的 App 产品页：一句话承诺、使用场景、界面感觉、产品信号和下一步路线。

公开边界保持在当前站点可公开表达范围内，详情页只使用 public registry 字段和本仓产品化文案，不额外抓取 ProjectOS 私有数据。

## 验证

- `npm run build` 通过
- 本地路由验证：
  - `/projects/void-brain` → 200
  - `/projects/texas-philosopher` → 200
  - `/projects/ai-screen-record` → 200
  - `/projects/nuclearpowerai` → 302 `/`
  - `/projects/ai-router-48h` → 302 `/`

## 后续建议

下一步 D3.6 继续把 5 个产品 cover 从概念图替换成真实界面截图或半真实 mockup；详情页的视觉冲击会随着真实界面资产显著增强。
