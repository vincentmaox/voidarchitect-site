# 2026-06-18 — D3.6 产品图通道

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.6 真实产品图占位 → 公开 cover 通道

## 背景

D2.5 高级亮色改版后，首页已经具备 Apple-like / VisionOS 式空间质感，但项目卡仍然只是高级渐变占位。下一步最高杠杆不是继续调色，而是让每个项目拥有真实产品图/cover，让站点从“概念名片”升级成“可信作品集”。

## 原则

- 公开图片入口仍由 ProjectOS 控制，不在站点仓扫描本地项目资产
- `cover_image` 只作为手动维护的公开字段进入 `data/public-registry.json`
- 站点只消费公开 registry；没有 cover 时保持 D2.5 的 App 风格渐变 fallback
- 首批使用轻量 SVG cover，避免二进制截图、压缩链路和隐私误带入

## 改动

### voidarchitect-site

- `src/lib/registry.ts`：`PublicProject` 增加可选 `cover_image?: string | null`
- `src/components/ProjectCard.astro`：
  - 有 `cover_image` 时显示真实图片层
  - 加底部暗渐变，保证项目名和 App 标签可读
  - 无图时保留原来的高级渐变 App 面板
- `public/images/projects/voidarchitect-site/cover.svg`：新增首张公开产品 cover

### ProjectOS

- `agent/export_public_registry.py`：公开字段白名单增加 `cover_image`
- `data/public-bios.json`：为 `voidarchitect-site` 配置站内 cover 路径
- `data/public-registry.json`：重新导出，首个项目带 `cover_image`

## 验证

- `npm run build` 通过
- `cover_image` 已出现在 ProjectOS `data/public-registry.json`
- 站点兼容旧数据：所有未配置项目显示 fallback，不影响上线

## 后续

1. 为 3 个最有转化价值的项目补真实截图：`docreview-ai`、`ai-router-48h`、`voidarchitect-site`
2. 将 SVG cover 逐步替换为压缩后的 `.webp` 产品截图
3. 进入 D3.2 项目详情页，复用同一套 `cover_image` 做详情 Hero
