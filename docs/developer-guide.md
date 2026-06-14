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
| 样式 | Tailwind CSS 4 | `@theme` directive 定义暗色 token |
| 3D Hero | three.js + R3F + drei | GLSL fragment shader 自写 |
| 动效 | framer-motion + lenis | 暂未深度使用，预留 |
| 部署 | @astrojs/vercel | Edge middleware 跑 IP 路由 |

## 目录结构

```
voidarchitect-site/
├─ src/
│  ├─ pages/
│  │  ├─ index.astro          # 中文版根（prerender=false）
│  │  └─ en/index.astro       # 英文版（prerender=false）
│  ├─ components/
│  │  ├─ HomePage.astro       # 共享布局 — Hero + ProjectGrid + Footer
│  │  ├─ FluidHero.tsx        # WebGL 流体 — GLSL shader
│  │  ├─ ProjectGrid.astro    # Bento Grid — 调 loadRegistry()
│  │  └─ ProjectCard.astro    # 单卡 — stage 配色 + freq + last_action
│  ├─ layouts/
│  │  └─ Layout.astro         # html shell + 字体 + noise overlay
│  ├─ lib/
│  │  └─ registry.ts          # 构建期 fetch + sort
│  ├─ i18n/
│  │  ├─ zh.ts                # Dict 类型源（中文）
│  │  └─ en.ts                # 英文版（typed Dict）
│  ├─ styles/
│  │  └─ global.css           # @theme + .noise + .text-display
│  └─ middleware.ts           # IP 路由 + cookie sticky
├─ astro.config.mjs           # output:'server' + react + vercel adapter
├─ package.json
└─ public/
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

GLSL fragment shader 自写。3 色板：暗墨（`#0a0a0c`）/ 烟青（`#3a4a5a`）/ 暗金（`vec3(0.98, 0.75, 0.14)`）。

调参点（如未来要继续打磨）：
```glsl
vec2 warp = (p - mouse) / max(md, 0.001) * exp(-md * 1.6) * 0.45;
//                                              ^^^^^^^^^^^^^^^^ 跟手范围/强度
col += exp(-md * 2.0) * 0.22;
//                       ^^^^ 鼠标周围发光强度
```
TS 里 lerp：`mouse.current.lerp(target.current, 0.18);`（0.18 = 当前值，越大跟手越紧）

### `src/components/ProjectGrid.astro` + `ProjectCard.astro`

- featured = `stage === "All-in"` 或 `freq_total >= 12`，最多 2 张，2x2 大卡
- 其他都是小卡
- 配色 stage-driven（All-in 暗金光晕 / 活跃翠绿 / 野化紫红 / Watch 天蓝 / 停滞灰 / 已归档暗）

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

**目前不是实时同步**：每次 ProjectOS push 后需要在 voidarchitect-site Vercel Dashboard 点一次 Redeploy（或推一个空 commit）。D3 候选做 GitHub Action 跨仓 webhook 自动化。

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

- **D3.1** GitHub Action：ProjectOS push → repository_dispatch → voidarchitect-site rebuild（实时同步公开 registry）
- **D3.2** 详情页 `/projects/[slug]`：每个项目详情 + view transitions
- **D3.3** voidcompass 旧仓 README 加 deprecation notice + 指向新仓
- **D3.4** Lighthouse 优化：当前 Hero shader 较重，可加 `@media (prefers-reduced-motion)` 降级到静态背景
- **D3.5** RSS / Atom feed of last_action（社交圈想订阅老茅近期活动）

## 协作约定

- 老赫推 push 前必须**自己 curl 验证一遍**（200 + cache header + 渲染语言）
- 涉及缓存/SSR 改动**必须改 Vary 或 Cache-Control 一起**
- 公开数据范围调整需先在 ProjectOS `export_public_registry.py` 改，不在站点仓自由抓取
- 任何对 Cloudflare DNS / Vercel domain 的改动**必须先问老茅**
