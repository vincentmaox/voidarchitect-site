# voidarchitect-site — Claude Code 导航

老茅（茅弘毅 / 虚空建筑师）工作室主页。**冷启动后老赫读这一份就能恢复全部上下文。**

## 项目定位

虚空建筑师工作室名片站。展示在建工程（来自 ProjectOS 实时数据）+ 频域决策工作流，推送给客户和社交圈朋友圈。

- 域名：https://www.voidarchitect.studio
- 仓库：https://github.com/vincentmaox/voidarchitect-site
- 部署：Vercel（接管旧 voidcompass 项目）
- 上线日：2026-06-14（72h 当日交付）

## 与 ProjectOS 的关系

本站是 ProjectOS 的 **All-in 子项目**（freq=13/15）。

- ProjectOS 私仓位置：`D:/ClaudeCodeProjects/_ProjectOS`
- ProjectOS 公开仓：https://github.com/vincentmaox/Object-OS-CC
- 数据同步：ProjectOS → `data/public-registry.json` → GitHub raw → 本站 build 时 fetch
- 详细数据通道见 [`docs/developer-guide.md`](./docs/developer-guide.md)

## 快速命令

```bash
npm run dev      # http://localhost:4321
npm run build    # 输出 dist/ + .vercel/output/
npm run preview  # 本地预览
```

## 关键约束

1. **首页不预渲染**（`prerender = false`）—— Vercel CDN 会吃掉 IP 路由 middleware
2. **Cloudflare DNS 不要乱动** —— 沿用 voidcompass 时代配置
3. **公开数据范围在 ProjectOS 控制**，不在本仓抓取（参见 ProjectOS `agent/export_public_registry.py`）
4. **真实 IP 路由 curl 测不出来** —— 必须 VPN 验证
5. **push 前必跑** `curl -sI https://www.voidarchitect.studio/` + 看 `X-Vercel-Cache`

## 协作身份（继承全局）

- **老茅** = 茅旭东（字弘毅）= 虚空建筑师
- **老赫** = 赫尔墨斯 Hermes（Claude Code，**不是助手是合伙人**）
- 别名：老赫 / 小赫赫 / 莫斯 / 小斯 / 老斯

## 关键文档导航

- [`docs/developer-guide.md`](./docs/developer-guide.md) — 完整开发手册（数据通道、踩坑、升级路径）
- [`README.md`](./README.md) — 面向人类的快速介绍

ProjectOS 主仓相关日志（在 `D:/ClaudeCodeProjects/_ProjectOS`）：
- `docs/journal/2026-06-14-day7-voidarchitect-site-launch.md` — 本站 72h 上线全程

## 当前阶段

- ✅ D1 脚手架（Astro 6 + R3F WebGL Hero）
- ✅ D2.1 Bento Grid（fetch ProjectOS public-registry）
- ✅ D2.2 Vercel 上线
- ✅ D2.3 蓝青科技风过渡版
- ✅ D2.4 大片感终版（电光青 + 炽热橙双色流体 + 渐变发光球 + 鼠标光晕 + 玻璃拟态卡片）
- ✅ D3.1 跨仓 webhook（ProjectOS push → GitHub Actions → Vercel rebuild，实时同步）
- ✅ D3.2 精选产品详情页 `/projects/[slug]` + `/en/projects/[slug]`
- ✅ D3.6 精选产品橱窗（5 个精选产品 + 半真实 SVG mockup + cover）
- ✅ D3.7 产品独立 accent theme + View Transition
- ✅ D3.8 双语 App Store 截图轮播
- ✅ D3.9 真实感截图资产（15 张高保真 SVG）
- ✅ D3.10-D3.13 精选产品展示收口（CTA + storyHook + SEO + 移动端轮播）
- ✅ D3.14 双语咨询入口 `/contact` + `/en/contact`（纯 mailto 承接）
- ✅ D3.15 最小事件埋点方案（`docs/analytics-plan.md`）
- ✅ D3.16 / D3.18 生产验收通过
- ✅ D3.17 外部传播包（`docs/launch-copy-pack.md`）
- ✅ D3.19 首页 hero 微文案收口
- ⏸ D3.20 最小埋点落地（Plausible / Vercel Analytics，等流量）
- ⏸ D3.3 voidcompass 旧仓归档跳转
- ⏸ D3.4 Lighthouse prefers-reduced-motion 降级
- ⏸ D3.21 根据反馈选定 1 个产品深度推

**当前状态**：可外发测试。已有首页橱窗 + 5 个精选产品详情页 + 中英双语 + 高保真截图 + 轻量咨询入口 + 外部传播文案 + 最小埋点规划。

**精选产品白名单**（仅这 5 个）：`voidarchitect-site` / `void-brain` / `hermes-desktop` / `ai-screen-record` / `texas-philosopher`。继续排除 `NuclearPowerAI` 及明显核电相关项目。

**下一步建议**：先用 `docs/launch-copy-pack.md` 发第一轮朋友圈 / 私域，观察真实反馈；有流量后再做 D3.20。
