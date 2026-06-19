# voidarchitect-site 开发手册

老茅（虚空建筑师）工作室主页。**这份手册写给冷启动后的老赫**——不需要读代码就能恢复全部上下文。

## 项目定位

- **域名：** https://www.voidarchitect.studio
- **角色：** 工作室名片 + 在建工程展示 + 客户/朋友圈推送介质
- **数据源：** 构建期 fetch ProjectOS 公开 registry（GitHub raw）
- **从属关系：** 注册为 ProjectOS 的 All-in 子项目（freq=13/15）

## 仓库与部署

- GitHub: https://github.com/vincentmaox/voidarchitect-site
- Vercel: 接管旧 voidcompass 项目（同 Vercel 项目，切换 git 来源到本仓）
- DNS: Cloudflare（沿用 voidcompass 时代配置，**不要乱动**）
- 部署触发: push to `main` → Vercel 自动 build

## 技术栈

| 层 | 技术 | 备注 |
|---|---|---|
| 框架 | Astro 6 | `output: 'server'`，根页 `prerender = false` |
| UI | React 19 | 仅 Hero 一处用 islands（`client:only="react"`） |
| 样式 | Tailwind CSS 4 | `@theme` 定义 token：#0D1117 / #00D4FF / #FF6B35 |
| 3D Hero | three.js + R3F + drei | GLSL fragment shader（电光青 + 炽热橙双色域） |
| 动效 | framer-motion + CSS | 鼠标光晕 + 发光球 + glass hover |
| 部署 | @astrojs/vercel | Edge middleware + 跨仓 webhook 自动 rebuild |

## 目录结构

```
voidarchitect-site/
├─ src/
│  ├─ pages/
│  │  ├─ index.astro                # 中文根（prerender=false）
│  │  ├─ en/index.astro             # 英文根（prerender=false）
│  │  ├─ projects/[slug].astro      # 中文精选产品详情页
│  │  ├─ en/projects/[slug].astro   # 英文精选产品详情页
│  │  ├─ contact.astro              # 中文咨询入口
│  │  └─ en/contact.astro           # 英文咨询入口
│  ├─ components/
│  │  ├─ HomePage.astro             # 共享布局 — Hero + ProjectGrid + Footer
│  │  ├─ FluidHero.tsx              # WebGL 流体 — GLSL shader
│  │  ├─ ProjectGrid.astro          # Bento Grid — 调 loadRegistry()
│  │  ├─ ProjectCard.astro          # 单卡 — stage 配色 + freq + storyHook
│  │  ├─ ProductDetailPage.astro    # 双语产品详情页（含截图轮播 + CTA）
│  │  └─ ContactPage.astro          # 双语咨询页（mailto 承接）
│  ├─ layouts/
│  │  └─ Layout.astro               # html shell + 字体 + canonical/OG/Twitter
│  ├─ lib/
│  │  ├─ registry.ts                # 构建期 fetch + sort
│  │  └─ product-details.ts         # 精选产品数据模型 + 双语文案 + 截图清单
│  ├─ i18n/
│  │  ├─ zh.ts                      # Dict 类型源（中文）
│  │  └─ en.ts                      # 英文版（typed Dict）
│  ├─ styles/
│  │  └─ global.css                 # @theme + .noise + .text-display + .glass + .gradient-border
│  ├─ docs/
│  │  └─ journal/                   # 项目日志（按日期）
│  └─ middleware.ts                 # IP 路由 + cookie sticky
├─ conversation_log/                # 老茅/老赫对话归档（按日期）
├─ scripts/
│  └─ generate-product-screenshots.py  # 复现 15 张高保真产品截图 SVG
├─ astro.config.mjs                 # output:'server' + react + vercel adapter
├─ package.json
└─ public/
   └─ images/projects/*/screens/*.svg   # 5 个精选产品 × 3 张 = 15 张截图
```

## 关键文件速读

### `src/middleware.ts`

IP 路由核心。逻辑：
1. 构建期 mock 请求（无 host header）→ 直通
2. 仅处理 `/` 和 `/en/`（其他路径直通）
3. 看 cookie `void_lang` — 用户手动切语言后**永远尊重 cookie**（1 年）
4. 没 cookie → 看 `x-vercel-ip-country` header（Vercel Edge 自动注入）
5. 非中文圈（CN/HK/MO/TW）→ 302 `/en/`
6. 中文圈或 header 缺失 → 中文版 + 写 cookie
7. 响应加 `Vary: x-vercel-ip-country, Cookie` + `s-maxage=300, stale-while-revalidate=3600` 让 Vercel CDN 按地区+偏好分桶

### `src/lib/registry.ts`

```ts
const REGISTRY_URL = "https://raw.githubusercontent.com/vincentmaox/Object-OS-CC/main/data/public-registry.json";
```

构建期 fetch（`cache: "no-store"`），按 stage rank 排序（All-in→活跃→野化→Watch→停滞→已归档）。

**fetch 失败兜底**：返回空数组，页面显示 `dict.projects.empty` 文案，不会 build 崩。

### `src/components/FluidHero.tsx`

GLSL fragment shader 自写。当前配色：**电光青 + 炽热橙 + 深海蓝** 三色域（大片感）。

```glsl
vec3 c0 = vec3(0.05, 0.07, 0.12);  // 深底
vec3 c1 = vec3(0.00, 0.83, 1.00);  // #00D4FF 电光青
vec3 c2 = vec3(1.00, 0.42, 0.21);  // #FF6B35 炽热橙
vec3 c3 = vec3(0.04, 0.12, 0.25);  // 深海蓝
```

调参点：
```glsl
vec2 warp = (p - mouse) / max(md, 0.001) * exp(-md * 1.6) * 0.45;  // 跟手范围
col += exp(-md * 2.0) * 0.25 * c1;  // 鼠标周围发光（青）
```
TS 里 lerp：`mouse.current.lerp(target.current, 0.18);`

### `src/components/HomePage.astro`

Hero 结构：
1. **FluidHero**（底层，全屏 R3F WebGL）
2. **渐变发光球**（CSS `animation: orbFloat1/2/3`，零 JS，3 个不同颜色/速度的 radial-gradient blur 球）
3. **渐变遮罩**（`from-void-bg/40 via-transparent to-void-bg/90`，保证文字可读）
4. **内容层**（header + h1 text-glow + body + footer）
5. **鼠标跟随光晕**（`#cursor-glow`，300px radial-gradient，纯 CSS transition + JS RAF）

```css
.text-glow {
  text-shadow: 0 0 60px rgba(0,212,255,0.3),
               0 0 120px rgba(0,212,255,0.15),
               0 0 180px rgba(0,212,255,0.08);
}
```

### `src/components/ProjectGrid.astro` + `ProjectCard.astro`

- featured = `stage === "All-in"` 或 `freq_total >= 12`，最多 2 张，2x2 大卡
- 其他都是小卡
- **卡片结构**：渐变顶部色带（图片占位区，项目名首字母大图标）+ glass 拟态主体 + tech_stack 标签 + footer
- 配色 stage-driven（badge 胶囊样式）
- **Glass 效果**：`background: rgba(22,27,34,0.5); backdrop-filter: blur(20px); border: 1px solid rgba(48,54,61,0.6)`
- 悬停：`translateY(-3px)` + cyan shadow + border 高亮
- **白名单映射**：卡片只链接到 5 个精选产品详情页（见 `FEATURED_PRODUCT_SLUGS`），其他项目卡片不展示「查看详情」入口
- **storyHook**：若产品在白名单内，卡片正文上方渲染 `copy[locale].storyHook`（一句话产品钩子）

### `src/lib/product-details.ts` — 精选产品数据模型

```ts
export const FEATURED_PRODUCT_SLUGS = [
  "voidarchitect-site",
  "void-brain",
  "hermes-desktop",
  "ai-screen-record",
  "texas-philosopher",
] as const;
```

- **白名单 5 个产品**，由 `productSlug(p)` 通过 `SLUG_BY_NAME` 把 registry 项目名映射到 slug
- 非 5 个之一时返回 `null`，详情页和卡片都不会渲染入口
- `ProductCopy` 是单语文案包：headline / subhead / scenario / promise / interfaceNotes / productSignals / roadmap / screenshots（含 `asset` SVG 路径）/ storyHook / CTA 系列
- `PRODUCT_DETAILS: Record<FeaturedProductSlug, ProductDetail>` 是单一真值表，中英文都在同一文件，缺一就会 type-check 报错
- 每个产品有独立 `accent: "blue" | "orange" | "ink"` 和 `theme`（文字色 / 渐变 / halo）

### `src/components/ProductDetailPage.astro` — 精选产品详情页

- 接收 `slug / project / related / dict / locale`，中英路由共用一份组件
- 关键路径常量：
  - `basePath = locale === "en" ? "/en" : ""`
  - `canonicalPath = ${basePath}/projects/${slug}`
  - `contactHref = ${basePath}/contact?product=${slug}` （CTA 跳咨询页，不直接 mailto）
  - `ogImage = coverImage || /images/projects/${slug}/cover.svg`
- Layout 调用传入 `canonicalPath` / `ogImage` / `lang`
- 截图轮播：每张 `screen.asset` 是真实 SVG，首张 `loading="eager" fetchpriority="high"`，其余 lazy
- 底部 CTA 双按钮：主按钮跳 contact（带 product 参数），次按钮回产品橱窗锚点

### `src/components/ContactPage.astro` — 双语咨询入口

- 接收 `dict / locale`
- 三个咨询方向（中英对等）：产品诊断 / 知识库 · Agent 系统 / 网站 · 产品页改造
- 不接数据库、不接表单后端、不接第三方表单服务
- 每个方向生成预填 `mailto:`，subject + body 用 `encodeURIComponent` 安全编码
- `?product=xxx` 参数会注入到 subject，便于邮件分流

### `src/layouts/Layout.astro` — SEO / 分享元数据

- 新增 props：`canonicalPath` / `ogImage`
- `siteUrl = "https://www.voidarchitect.studio"`，URL 由 `new URL(path, siteUrl)` 拼装
- 输出：`<link rel="canonical">`、`og:url`、`og:image`、`twitter:card=summary_large_image`、`twitter:title/description/image`
- 首页、产品详情页、contact 页都传各自的 canonical 和 OG image

### `scripts/generate-product-screenshots.py` — 截图资产复现

- 纯 Python 字符串生成 SVG（无外部依赖），可重复执行覆盖输出
- 覆盖 5 个产品 × 3 张截图 = 15 张，输出到 `public/images/projects/*/screens/*.svg`
- 视觉目标是「像 App Store 高保真截图」，而非 CSS 假 UI
- 修改截图视觉时直接改脚本，再 `python scripts/generate-product-screenshots.py` 重新生成

## 数据通道

```
ProjectOS 私仓
    └─ data/registry.json (真值)
         │
         ├─ agent/export_public_registry.py
         │   ├─ HIDDEN 黑名单：_ProjectOS / Private-Wealth-AI-Steward 等
         │   └─ 字段白名单：name/description/stage/freq_total/last_action/github_url
         ↓
    └─ data/public-registry.json (入 git 白名单例外)
         │
         ↓ git push
GitHub: vincentmaox/Object-OS-CC/main/data/public-registry.json
         │
         ↓ Vercel build 时 fetch
voidarchitect-site Static Generation 注入 ProjectGrid
```

**实时同步**：ProjectOS `daily_projectos_report.py` 每天 9:07 跑完后自动 `git commit + push` → GitHub Actions webhook 触发 → Vercel Deploy Hook → voidarchitect-site 自动 rebuild。零人工。

webhook 配置：
- ProjectOS 侧：`.github/workflows/trigger-site-rebuild.yml`，监听 `data/public-*.json` 变更
- secret：`VERCEL_DEPLOY_HOOK`（在 ProjectOS GitHub repo settings → Secrets → Actions）
- Vercel 侧：Dashboard → voidarchitect-site → Settings → Git → Deploy Hook（branch: main）

## 公开 / 私有边界（重要）

**入公开 registry 的字段：**
- `name` / `description`（来自 ProjectOS `data/public-bios.json`，老茅手填）
- `stage` / `freq_total` / `freq_suggestion`
- `last_action.message[:120]` + `last_action.date[:10]`
- `github_url`（仅 github.com，HTTPS 或 git@ 都接受）
- `tech_stack[:6]`

**HIDDEN（不出现在公开版）：**
- `_ProjectOS`、`ProjectOS-Projects`（基础设施）
- `Private-Wealth-AI-Steward`、`TexasPhilosopher`（私密）
- `obsidian manager`（基础设施）

**绝不入公开版：**
- 本地路径（含 `D:\` `C:\` 等）
- blocker、todos、内心 OS
- 三频原始评分细节（lo/mid/hi，只放 total 和 suggestion）
- 任何 .env / 凭据

## 本地开发

```bash
cd D:/ClaudeCodeProjects/voidarchitect-site
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/ + .vercel/output/
npm run preview  # 本地预览 build 产物
```

**dev 模式 middleware 行为：** 没 country header，会落到默认中文版分支，cookie 也会写。本地测英文：访问 `/en/`。

## 部署排查清单

push 完后必跑：
1. `curl -sI https://www.voidarchitect.studio/` 看 200 OK
2. 看 `X-Vercel-Cache` —— 应该是 `MISS` 或 `STALE`，**不应该是 prerender 那种全量 HIT**（说明 middleware 在跑）
3. `curl -s ... | grep -oE 'lang="[^"]*"'` 看渲染语言对不对
4. 切真实 VPN 验证 IP 路由（curl 加 header 不生效，Vercel 屏蔽客户端伪造）

## 常见踩坑

### 1. middleware 在 build 时也会跑

prerender 阶段 Astro 用 mock 请求 prerender 页面。mock 请求**没有 host header**——这是判定构建期的最简单信号。
```ts
if (!request.headers.get("host")) return next();
```

### 2. Vercel CDN 缓存吞掉 IP 路由

如果给页面打 `prerender = true`，HTML 进 Vercel 静态 CDN，所有 IP 拿到同一份。
**当前方案：** 关掉 prerender，用 Edge function + `Vary: x-vercel-ip-country, Cookie`。性能损失可接受（Hero 是 client-rendered React island，没多少服务端工作）。

### 3. Astro CLI 创建子目录

`npm create astro` 在非空目录会新建 `pink-plasma/` 等随机命名的子目录。要么先空目录、要么把内容上移。

### 4. `git pull --rebase` 冲突时 ours/theirs 反转

rebase 中 `-X ours` 的 "ours" 是远端 base（不是你本地）。如果想保留本地版本用 `-X theirs`。
**血泪教训：** README 被 rebase 反向覆盖一次，手动重写。

### 5. data/*.json gitignore 拦截

ProjectOS `.gitignore` 屏蔽全部 `data/*.json`，公开导出文件需要加白名单：
```gitignore
data/*.json
data/registry.json
data/feishu-base-config.json
!data/public-registry.json
!data/public-bios.json
```

## 升级路径（D3+）

### 已完成

- ✅ **D3.1** 跨仓 webhook（ProjectOS push → GitHub Actions → Vercel rebuild）
- ✅ **D3.2** 精选产品详情页 `/projects/[slug]` + `/en/projects/[slug]`
- ✅ **D3.6** 精选作品产品化（替换 5 个精选产品 + TexasPhilosopher 入选 + 半真实 mockup）
- ✅ **D3.6+** 真实 SVG 截图资产（5 × 3 = 15 张高保真 App Store 风截图）
- ✅ **D3.7** 产品独立 accent theme + 首页 → 详情页 View Transition
- ✅ **D3.8** 双语 App Store 截图轮播
- ✅ **D3.9** 截图卡升级为独立真实感视觉资产
- ✅ **D3.10-D3.13** 精选产品展示收口：截图生成脚本、双语 CTA、首页 storyHook、SEO canonical/OG/Twitter、移动端轮播优化
- ✅ **D3.14** 双语轻量咨询入口 `/contact` + `/en/contact`（纯 `mailto:` 承接）
- ✅ **D3.15** 最小事件埋点方案（`docs/analytics-plan.md`，未接平台）
- ✅ **D3.16** D3.10-D3.13 生产验收通过
- ✅ **D3.17** 外部传播包（`docs/launch-copy-pack.md`，3 组中英文案）
- ✅ **D3.18** D3.14 contact 生产验收通过
- ✅ **D3.19** 首页 hero 首屏微文案收口（中英双语）

### 待办（按真实传播反馈决定优先级）

- ⏸ **D3.20** 最小事件埋点落地（Plausible 优先，其次 Vercel Analytics）—— 等流量上来再做
- ⏸ **D3.3** voidcompass 旧仓 README 加 deprecation notice + 指向新仓
- ⏸ **D3.4** Lighthouse 优化：Hero shader 加 `@media (prefers-reduced-motion)` 降级
- ⏸ **D3.5** RSS / Atom feed of last_action
- ⏸ **D3.21** 根据反馈选定 1 个产品深度推（候选：`void-brain` / `hermes-desktop` / `AI-Screen-Record`）

## 协作约定

- 老赫推 push 前必须**自己 curl 验证一遍**（200 + cache header + 渲染语言）
- 涉及缓存/SSR 改动**必须改 Vary 或 Cache-Control 一起**
- 公开数据范围调整需先在 ProjectOS `export_public_registry.py` 改，不在站点仓自由抓取
- 任何对 Cloudflare DNS / Vercel domain 的改动**必须先问老茅**
