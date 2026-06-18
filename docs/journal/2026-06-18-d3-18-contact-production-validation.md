# 2026-06-18 — D3.18 联系页生产验收

**日期：** 2026-06-18  
**主体：** 老茅 + 老赫  
**阶段：** D3.18 转化入口验收

## 结论

D3.14 轻量咨询入口页已在生产环境收敛完成。

## 验收项

### 英文联系页

`https://www.voidarchitect.studio/en/contact`：

- 标题文案存在：`Start with a high-signal product conversation.`
- 预填邮件选项存在：`Product Diagnosis`
- canonical 正确：`https://www.voidarchitect.studio/en/contact`

### 中文联系页

浏览器验证 `https://www.voidarchitect.studio/contact`：

- `lang="zh-CN"`
- 标题文案存在：`先从一次高信号产品对话开始。`
- 页面含 4 个 `mailto:` 入口：一个直接邮件 + 三个预填咨询方向
- canonical 正确：`https://www.voidarchitect.studio/contact`

### 产品页 CTA

`https://www.voidarchitect.studio/en/projects/void-brain`：

- CTA 已指向 `/en/contact?product=void-brain`
- 旧的产品页直连 mailto 已移除

## 边界

- 不接数据库
- 不接表单后端
- 不引入第三方 analytics
- 仍使用 `mailto:` 承接真实咨询意图
