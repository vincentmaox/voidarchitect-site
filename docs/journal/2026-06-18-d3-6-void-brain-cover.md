# 2026-06-18 — D3.6 void-brain 产品图

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.6 产品图补强

## 决策

老茅明确：主页设计中不选择有明显核电内容字样的产品作为重点展示，`NuclearPowerAI` 不进入下一批主页视觉强化。下一张产品图选择 `void-brain`。

## 改动

### voidarchitect-site

- 新增 `public/images/projects/void-brain/cover.svg`
- cover 主题：个人 AI 知识库 / 本地记忆 OS
- 视觉语言延续 D2.5：白底、高级蓝、高级黑、少量橙色能量点
- 避免核电、工程、图纸等强行业字样进入主页视觉

### ProjectOS

- `data/public-bios.json` 增加 `void-brain` 公开简介
- `data/public-bios.json` 增加 `void-brain.cover_image`
- 重新导出 `data/public-registry.json`

公开简介：

> 个人 AI 知识库桌面助手。支持本地知识库、RAG 问答、可追溯引用、多轮对话与报告导出。

## 验证

- `npm run build` 通过
- `data/public-registry.json` 已包含 `/images/projects/void-brain/cover.svg`
- `NuclearPowerAI` 保持无 cover，不作为主页视觉重点

## 后续

下一批 cover 优先选择：
1. `docreview-ai`
2. `ai-router-48h`

继续避免用明显核电内容主导主页第一印象。
