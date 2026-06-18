# 2026-06-18 — D3.9 真实感截图资产升级

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.9 精选产品 App Store 化

## 决策

D3.9 在 D3.8 双语 App Store 截图轮播基础上，把纯 CSS mockup 卡片升级为每个产品独立 SVG 视觉资产，让详情页更接近真实产品商店截图，而不是临时占位。

## 改动

### 独立截图资产

为 5 个精选产品各新增 3 张 1600×1000 SVG 截图资产：

1. `voidarchitect-site`
   - `home.svg`
   - `gallery.svg`
   - `sync.svg`

2. `void-brain`
   - `library.svg`
   - `rag.svg`
   - `export.svg`

3. `hermes-desktop`
   - `voice.svg`
   - `tasks.svg`
   - `state.svg`

4. `AI-Screen-Record`
   - `player.svg`
   - `events.svg`
   - `summary.svg`

5. `TexasPhilosopher`
   - `table.svg`
   - `persona.svg`
   - `run.svg`

### 数据结构

更新 `src/lib/product-details.ts`：

- `ProductScreenshot` 新增 `asset`
- 中英文截图文案共享同一组视觉资产
- 每个产品的 3 张截图都显式绑定 `/images/projects/.../screens/*.svg`

### 页面渲染

更新 `src/components/ProductDetailPage.astro`：

- 移除截图轮播里的 CSS 假 UI 骨架
- 改为直接渲染 `<img src={screen.asset}>`
- 保留中英文标题、说明、eyebrow、metric
- 增加轻微 hover scale，让截图像 App Store 产品资产

## 边界

- 仍然只服务 5 个精选产品
- 英文详情页继续使用 `/en/projects/[slug]`
- 非白名单项目继续重定向回对应语言首页
- 不引入 ProjectOS 私有数据
- 核电相关项目不进入精选详情页

## 验证

- `npm run build` 通过
- 本地浏览器验证：
  - `/projects/void-brain` 3 张截图 SVG 均加载成功，尺寸为 1600×1000
  - `/en/projects/void-brain` 保留英文标题 `Knowledge becomes operational memory`
  - `/en/projects/void-brain` 相关产品链接保持 `/en/projects/` 前缀
  - `/en/projects/nuclearpowerai` 重定向回 `/en/`

## 后续建议

D3.10 可以进入真正截图生产线：把当前 SVG 资产继续替换为来自真实应用窗口的 PNG/WebP 截图，并为每个产品补 1 张横向 hero screenshot，形成完整 App Store 展示组合。
