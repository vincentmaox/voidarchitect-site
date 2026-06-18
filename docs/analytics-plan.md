# Void Architect — D3.15 最小事件埋点方案

## 目标

网站已经完成产品橱窗、详情页和轻量咨询入口。下一步需要回答一个问题：

> 外部用户到底对哪个产品、哪个动作有兴趣？

D3.15 只做事件设计，不立即接平台，避免过早引入复杂 analytics、cookie banner、数据库或隐私负担。

## 原则

1. **只看行为，不看个人**  
   不采集姓名、邮箱、IP、设备指纹或输入内容。

2. **只保留高信号动作**  
   不记录滚动、停留时长、鼠标轨迹等低频噪音。

3. **先规划，再接平台**  
   推荐后续优先接 Plausible；如果只想留在 Vercel 生态，可选 Vercel Analytics。

4. **中英一致**  
   所有事件都带 `locale`，便于区分中文传播和英文传播效果。

## 事件清单

### 1. `homepage_product_click`

用户从首页点击某个产品卡进入详情页。

**触发位置：**

- `src/components/ProjectCard.astro`
- 点击 `Product →`
- 点击卡片封面

**参数：**

```json
{
  "product": "void-brain",
  "locale": "zh | en",
  "surface": "cover | product_button"
}
```

**回答的问题：**

- 哪个产品最吸引第一次访问者？
- 中文和英文用户关注的产品是否不同？

---

### 2. `product_cta_click`

用户在产品详情页点击咨询 CTA，进入 `/contact` 或 `/en/contact`。

**触发位置：**

- `src/components/ProductDetailPage.astro`
- hero CTA
- bottom CTA

**参数：**

```json
{
  "product": "void-brain",
  "locale": "zh | en",
  "surface": "hero | bottom"
}
```

**回答的问题：**

- 哪个产品最能转化为咨询意图？
- 顶部 CTA 和底部 CTA 哪个更有效？

---

### 3. `github_click`

用户点击 GitHub 链接。

**触发位置：**

- 首页卡片 GitHub 按钮
- 产品详情页 GitHub 按钮

**参数：**

```json
{
  "product": "void-brain",
  "locale": "zh | en",
  "surface": "homepage | detail"
}
```

**回答的问题：**

- 用户是想看产品展示，还是想看代码可信度？
- 哪些项目适合继续开放源码背书？

---

### 4. `language_switch_click`

用户点击中英文切换。

**触发位置：**

- `src/components/HomePage.astro`
- 顶部语言切换链接

**参数：**

```json
{
  "from": "zh | en",
  "to": "zh | en",
  "path": "/ | /en/ | /projects/void-brain"
}
```

**回答的问题：**

- 外部访问者是否需要英文入口？
- 英文页是否服务真实传播，而不只是装饰？

## 推荐接入方案

### 首选：Plausible

优点：

- 轻量
- 隐私友好
- 自定义事件简单
- 不需要复杂 cookie 同意流

适合 Void Architect 当前阶段：验证传播和产品兴趣，不做用户画像。

### 备选：Vercel Analytics

优点：

- 与 Vercel 集成简单
- 页面访问数据开箱即用

限制：

- 自定义事件能力不如 Plausible 直观
- 更适合看页面级访问，不适合精细产品兴趣验证

## 不做什么

D3.15 暂不做：

- 数据库记录
- 表单提交追踪
- 用户级画像
- 热力图
- session replay
- 广告像素
- 跨站追踪

## 何时真正接入

满足任一条件即可接入 Plausible：

1. 老茅准备把站点发朋友圈 / X / LinkedIn
2. 预计单次传播访问量超过 50
3. 想比较 `void-brain` / `hermes-desktop` / `AI-Screen-Record` 哪个更有市场信号
4. contact 页开始收到真实邮件，需要判断来源

## 接入时的最小代码形态

未来接 Plausible 时，事件函数可保持极小：

```ts
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(eventName: string, props: Record<string, string>) {
  window.plausible?.(eventName, { props });
}
```

Astro 组件里只在点击事件上调用，不影响无 JS 基础跳转。

## 下一步

先做 D3.17 外部传播包。真正接 analytics 前，先用一轮外发文案测试有没有自然访问和咨询邮件。