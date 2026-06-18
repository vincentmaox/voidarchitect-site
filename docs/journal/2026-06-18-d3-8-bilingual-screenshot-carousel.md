# 2026-06-18 — D3.8 双语 App Store 截图轮播

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.8 精选产品 App Store 化

## 决策

D3.8 在 D3.7 独立主题和 View Transition 基础上，补齐产品详情页的 App Store 截图展示区，并把英文版同步补上，避免中英体验断层。

## 改动

### 双语详情数据

重构 `src/lib/product-details.ts`：

- `ProductDetail` 保留产品主题和 slug
- 新增 `ProductLocale = "zh" | "en"`
- 每个产品新增 `copy.zh` / `copy.en`
- 每个语言都包含：
  - headline / subhead
  - scenario / promise
  - interface notes / signals / roadmap
  - screenshot carousel 文案

### App Store 截图轮播

新增 `ProductScreenshot` 数据结构，每个产品 3 张半真实截图卡：

1. `voidarchitect-site`
   - 空间首页
   - 精选产品橱窗
   - ProjectOS 数据通道

2. `void-brain`
   - 本地知识库
   - 可追溯 RAG 回答
   - 报告导出

3. `hermes-desktop`
   - 语音控制入口
   - 任务队列
   - Agent 运行态

4. `AI-Screen-Record`
   - 屏幕回放
   - 操作时间线
   - AI 摘要

5. `TexasPhilosopher`
   - 策略牌桌
   - AI 性格对手
   - Roguelike 成长

### 路由和组件

- 新增 `src/components/ProductDetailPage.astro`
  - 中英共用同一视觉组件
  - 根据 `locale` 选择 `copy.zh` 或 `copy.en`
  - 保留 D3.7 View Transition 和独立主题
- 中文路由：`/projects/[slug]`
- 英文路由：`/en/projects/[slug]`
- 英文首页卡片跳 `/en/projects/[slug]`
- 中文首页卡片跳 `/projects/[slug]`

## 边界

- 仍然只服务 5 个精选产品
- 非白名单项目重定向回对应语言首页
- 不暴露 ProjectOS 私有数据
- 截图是半真实产品表达，不伪装成已完成真实截图
- 核电相关内容不进入主页和详情页精选

## 验证

- `npm run build` 通过
- 本地验证：
  - `/projects/void-brain` 包含中文截图标题「知识从检索变成可操作记忆」
  - `/en/projects/void-brain` 包含英文截图标题 `Knowledge becomes operational memory`
  - `/en/` 首页卡片包含 `/en/projects/void-brain`
  - `/` 首页卡片包含 `/projects/void-brain`
  - `/en/projects/nuclearpowerai` 重定向回英文首页

## 后续建议

D3.9 可以做真实截图资产位：把当前 screenshot card 从纯 CSS mockup 升级为每个产品 3 张独立 SVG/PNG 视觉资产，进入真正的 App Store screenshot carousel 阶段。
