# 2026-06-18 — D3 产品化与发布准备总日志

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.8-D3.19 产品化收口

## 总结

本轮把 `voidarchitect-site` 从“高级视觉主页 + 精选产品详情页”推进到“可外发、可咨询、可测量、可传播”的产品橱窗系统。

核心方向没有继续堆 UI，而是完成四件事：

1. 精选产品详情页 App Store 化
2. 产品截图资产真实感升级
3. 轻量咨询入口与生产验收
4. 外部传播与最小数据反馈准备

## 已完成阶段

### D3.8 — 双语 App Store 截图轮播

- 中文 `/projects/[slug]`
- 英文 `/en/projects/[slug]`
- 5 个精选产品均有中英详情文案
- 英文首页卡片跳 `/en/projects/[slug]`
- 非白名单项目重定向回对应语言首页

日志：

- `docs/journal/2026-06-18-d3-8-bilingual-screenshot-carousel.md`

### D3.9 — 独立真实感截图资产

- 为 5 个精选产品新增 15 张 SVG 截图资产
- `ProductScreenshot` 新增 `asset`
- 详情页截图轮播从 CSS 假 UI 改为真实 SVG 图像

提交：

- `001691b D3.9: 升级精选产品真实感截图资产`

日志：

- `docs/journal/2026-06-18-d3-9-realistic-screenshot-assets.md`

### D3.10-D3.13 — 精选产品展示收口

- 新增 `scripts/generate-product-screenshots.py`
- 15 张截图重绘为更像真实 App 窗口的高保真 SVG
- 每个产品新增双语 CTA 文案
- 详情页 hero / bottom CTA 接入咨询动作
- 首页卡片新增 `storyHook`
- Layout 支持动态 canonical / OG image / Twitter card
- 移动端截图轮播优化
- `.playwright-mcp/` 加入 `.gitignore`

提交：

- `baf1560 D3.10-D3.13: 精选产品展示收口`

日志：

- `docs/journal/2026-06-18-d3-10-to-d3-13-productization-closeout.md`

### D3.14 — 双语轻量咨询入口

- 新增 `/contact`
- 新增 `/en/contact`
- 三个咨询方向：
  - 产品诊断
  - 知识库 / Agent 系统
  - 网站 / 产品页改造
- 不接数据库，不接表单后端
- 通过预填 `mailto:` 承接真实咨询意图
- 产品详情页 CTA 改为跳 contact 页

提交：

- `ce96789 D3.14: 新增双语轻量咨询入口`

日志：

- `docs/journal/2026-06-18-d3-14-contact-entry-pages.md`

### D3.15 — 最小事件埋点方案

- 新增 `docs/analytics-plan.md`
- 规划 4 个高信号事件：
  - 首页产品卡点击
  - 产品详情 CTA 点击
  - GitHub 点击
  - 语言切换
- 暂不接平台
- 后续推荐 Plausible，其次 Vercel Analytics

日志：

- `docs/journal/2026-06-18-d3-15-minimal-analytics-plan.md`

### D3.16 — D3.10-D3.13 生产验收

生产验证通过：

- 英文详情页 CTA / OG / canonical 正常
- 3 张截图 SVG 全部加载，尺寸 1600×1000
- 移动端截图轮播可横滑
- 中文详情页正文和 CTA 正常
- 非白名单核电项目重定向正常

日志：

- `docs/journal/2026-06-18-d3-16-production-release-validation.md`

### D3.17 — 外部传播包

- 新增 `docs/launch-copy-pack.md`
- 输出 3 组中英传播文案：
  - 工作室主页
  - `void-brain`
  - `hermes-desktop`
- 每组含短版、长版、英文短版、英文长版

日志：

- `docs/journal/2026-06-18-d3-17-launch-copy-pack.md`

### D3.18 — D3.14 生产验收

生产验证通过：

- `/contact` 中文联系页上线
- `/en/contact` 英文联系页上线
- 产品页 CTA 已指向 contact 页
- contact 页保留 `mailto:` 承接，不引入数据库

日志：

- `docs/journal/2026-06-18-d3-18-contact-production-validation.md`

### D3.19 — 首页首屏微文案

- 中文 hero 更明确表达：
  - 产品化入口
  - 个人知识系统
  - Agent 工作流
- 英文 hero 更明确表达：
  - AI product storefronts
  - personal knowledge systems
  - agent workflows
- 不改视觉，只提升陌生人理解速度

提交：

- `4abc70c D3.15-D3.19: 完成传播反馈准备`

日志：

- `docs/journal/2026-06-18-d3-19-hero-microcopy-polish.md`

## 当前精选产品边界

仍只服务 5 个精选产品：

1. `voidarchitect-site`
2. `void-brain`
3. `hermes-desktop`
4. `AI-Screen-Record`
5. `TexasPhilosopher`

继续排除：

- `NuclearPowerAI`
- 明显核电相关项目
- ProjectOS 私有数据

## 关键验证

- 多次 `npm run build` 通过
- push 前检查生产首页 header 与 `X-Vercel-Cache`
- D3.14、D3.16、D3.18 均做了生产验证
- 当前仓库最新提交：`4abc70c D3.15-D3.19: 完成传播反馈准备`

## 当前状态

站点已经进入“可外发测试”状态：

- 有首页产品橱窗
- 有 5 个精选产品详情页
- 有中英双语
- 有高保真截图资产
- 有轻量咨询入口
- 有外部传播文案
- 有最小埋点规划

## 下一步建议

短期不要继续大改视觉。建议进入真实传播测试：

1. 用 `docs/launch-copy-pack.md` 发第一轮朋友圈 / 私域
2. 观察是否有人私聊、点击 contact、询问产品
3. 若访问量开始增加，再接 Plausible 做 D3.20 最小事件埋点实现
4. 根据反馈决定优先推进 `void-brain`、`hermes-desktop` 或 `AI-Screen-Record`
