# 2026-06-18 — 高级亮色质感改版

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D2.5 视觉气质校准 → D3 转化资产准备

## 背景

老茅看完 D2.4 暗色大片感版后反馈：主页仍然缺少做项目时的热情，虚空建筑师不应该是灰暗、压抑、赛博废土，而应该是高级、极简、质感极高、科技但温暖，像打开苹果手机界面、Apple Store 装修、Apple Vision Pro 空间界面那种身临其境感。

明确偏好：
- 主色调：白色、高级蓝、橙色、高级灰、高级黑
- 气质：高级、明亮、极简、科技感、内涵丰富
- 项目表达：每个项目像一个独立 App，有简介、有产品图/产品图占位
- 背景：Vision Pro 式空间深度，而不是黑暗流体

## 设计判断

这次不是继续加强“暗色电影感”，而是切换品牌母题：

> 虚空不是黑暗，虚空是高维空间。建筑师不是赛博游民，而是空间界面里的产品创造者。

因此视觉方向从 **Dark Cinematic Cyber** 切到 **Premium Spatial App Gallery**：
- 白色和浅灰做主舞台，承接 Apple Store 的干净、材料感、留白
- 高级黑只用于标题、CTA、关键锚点，形成精密感
- Apple 蓝作为理性、科技、AI、空间计算的主能量
- 橙色作为老茅做项目的热情、行动力和非对称风险凸性
- 项目卡不再像工程状态卡，而像 App Store 里的独立产品瓷砖

## 已完成改动

### 全局视觉系统

文件：`src/styles/global.css`

- 背景从 `#0D1117` 暗底切成亮色空间底：白色、浅灰、柔和径向蓝橙光
- token 改为：
  - `--color-void-bg: #f7f8fa`
  - `--color-void-fg: #111318`
  - `--color-void-accent: #007aff`
  - `--color-void-hot: #ff6b35`
  - `--color-void-ink: #05070a`
- `.glass` / `.glass-strong` 改成亮底空间玻璃材质
- 新增 `.spatial-panel`，用于 VisionOS 式空间面板
- 字体切换为 `Instrument Sans` + `IBM Plex Mono`

### Hero 空间界面

文件：`src/components/HomePage.astro`、`src/components/FluidHero.tsx`

- WebGL shader 从深色流体改成亮色空间膜
- 首屏加大面积白色空间玻璃外框
- 顶部导航改成胶囊浮层
- 标题使用高级黑，`Architect` 用蓝橙渐变
- CTA 改为黑色胶囊按钮，蓝色 hover
- 右侧增加空间 OS 面板：蓝色 App block、黑色 statement card、橙色行动点
- 鼠标光晕改成亮底蓝橙混合光，不再是暗色 cyan glow

### 项目 App Gallery

文件：`src/components/ProjectGrid.astro`、`src/components/ProjectCard.astro`

- 项目区从暗色 Bento Matrix 改成亮色 App Gallery
- 每个项目卡上半部变成 App 宣传图/产品图占位
- 下半部保留：stage、三频、简介、tech stack、last action、GitHub 链接
- stage 色彩收敛为黑/蓝/橙/灰，不再出现紫色赛博感
- hover 从轻微上浮改为更像 iOS 卡片的抬升和柔影

## 验证

- `npm run build` 通过
- 中文首页 `/` 本地打开正常
- 英文页 `/en/` 本地打开正常
- 移动端 390px 宽度检查无横向溢出
- 控制台无页面错误；仅 three dev warning：`THREE.Clock` deprecated，不影响当前上线
- push 前生产站 header 检查：`200 OK`，`X-Vercel-Cache: MISS`，`Vary: x-vercel-ip-country, Cookie`

## 下一步推荐方案

### 推荐 1：D3.6 真实产品图优先，而不是继续调色

当前卡片已经有 App 感，但仍是“高级占位”。下一步最能提升可信度的是给每个公开项目补真实产品图/截图。

建议结构：
- `public/images/projects/<slug>/cover.webp`
- public registry 增加 `cover_image` 白名单字段
- `ProjectCard.astro` 优先显示真实图，无图再 fallback 到当前渐变 App 面板

**收益：** 从“概念站”升级为“产品作品集”。  
**风险：** 公开边界需要在 ProjectOS 控制，不能本站自由扫描本地截图。

### 推荐 2：D3.2 项目详情页承接转化

首页负责高级感和入口，详情页负责解释“这个项目为什么值得信任”。

建议 `/projects/[slug]` 页面结构：
1. App Hero：大产品图 + 项目一句话
2. What it does：解决什么问题
3. Why now：为什么现在做
4. Current stage：ProjectOS stage / freq / last action
5. Proof：截图、repo、demo、日志节选

**收益：** 客户/朋友圈点进去后不会停在表层审美。  
**风险：** 需要 public registry 增加 slug、long_description、cover_image 等字段。

### 推荐 3：Hero 继续保留克制，不再堆特效

现在最有价值的不是继续加动画，而是打磨产品图和内容叙事。Hero 只需后续做两点：
- `prefers-reduced-motion` 降级，保护移动端性能
- 右侧空间面板未来接真实“当前 All-in 项目”数据

### 推荐 4：品牌文案需要更像“高级应用”而不是“玄学宣言”

当前文案仍偏理论宣言。建议下一轮改成：
- 首屏一句话讲“我把想法做成可运行的 AI 产品/系统”
- 保留频域/非对称风险作为二层解释
- 项目卡标题下强调 outcome，而不是 internal stage

## 当前结论

D2.5 已经把主观气质从“灰暗赛博”扳到“明亮高级”。下一步不要陷入无限调色，应该进入 **真实资产填充**：产品图、详情页、项目叙事。这三项会比继续改 shader 更能产生客户信任和社交转化。
