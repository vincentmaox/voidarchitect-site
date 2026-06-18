# 2026-06-18 — D3.14 轻量咨询入口页

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.14 转化闭环

## 决策

在 D3.16 生产验收通过后，新增轻量咨询入口页，而不是直接接数据库或复杂表单。目标是先验证真实咨询意图，保持下行有限。

## 改动

### 双语入口页

新增：

- `/contact`
- `/en/contact`

共用组件：

- `src/components/ContactPage.astro`

### 三个咨询方向

中文：

1. 产品诊断
2. 知识库 / Agent 系统
3. 网站 / 产品页改造

英文：

1. Product Diagnosis
2. Knowledge / Agent System
3. Website / Product Page

### 转化方式

仍然使用 `mailto:hi@voidarchitect.studio`：

- 不接数据库
- 不做复杂表单
- 不新增隐私数据采集
- 点击选项后生成带 subject/body 的预填邮件

### CTA 接线

更新 `src/components/ProductDetailPage.astro`：

- 产品详情页 hero CTA 和底部 CTA 从直接 mailto 改为 `/contact?product=[slug]` 或 `/en/contact?product=[slug]`
- Contact 页内再引导用户选择具体咨询方向

## 边界

- 不改变 ProjectOS 数据边界
- 不引入第三方表单服务
- 不引入 analytics 或数据库
- 核电相关项目仍不进入精选展示

## 后续建议

D3.15 可以做最小事件埋点规划：只规划首页产品卡、详情页 CTA、GitHub、语言切换，不急着接平台。若要接，优先 Plausible 或 Vercel Analytics。
