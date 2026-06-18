# 2026-06-18 — D3.16 生产发布验收

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.16 生产验收

## 结论

D3.10-D3.13 已在生产环境收敛完成，精选产品展示收口版本可用。

## 验收项

### 生产部署收敛

- `https://www.voidarchitect.studio/` 返回 200
- `X-Vercel-Cache: MISS`，确认仍按 server output / middleware 路径工作
- 新版详情页 HTML 已包含 D3.12 CTA / D3.13 OG / canonical
- 新版 SVG 截图资产已上线

### 英文详情页

浏览器验证 `https://www.voidarchitect.studio/en/projects/void-brain`：

- 页面标题：`void-brain — Knowledge OS | Void Architect`
- CTA 文案存在：`Make your knowledge base answer, cite, and write.`
- `mailto:hi@voidarchitect.studio` 转化入口存在
- 3 张截图 SVG 全部加载完成
- 图片自然尺寸均为 1600×1000
- canonical：`https://www.voidarchitect.studio/en/projects/void-brain`
- OG 图：`https://www.voidarchitect.studio/images/projects/void-brain/cover.svg`

### 移动端截图轮播

390×844 视口验证：

- `.screenshot-rail` 横向 overflow 正常
- 截图卡数量为 3
- 首卡宽度约 336px，适配移动端横滑

### 中文详情页

浏览器验证 `https://www.voidarchitect.studio/projects/void-brain`：

- `lang="zh-CN"`
- 中文标题存在：`知识从检索变成可操作记忆`
- 中文 CTA 存在：`让你的资料库开始回答、引用和产出。`

### 非白名单项目

- `https://www.voidarchitect.studio/en/projects/nuclearpowerai` 重定向到 `/en/`
- 核电相关项目继续不进入精选详情页

## 备注

`curl` 中文详情页时可能受 cookie / IP 语言路由影响返回不同语言或入口，但浏览器直接访问 `/projects/void-brain` 验证中文内容正常。

## 后续

D3.14 开始实现轻量咨询入口页：`/contact` 与 `/en/contact`，继续使用 `mailto:`，不接数据库。
