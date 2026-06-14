import { defineMiddleware } from "astro:middleware";

// 中文圈：CN 大陆 + 港澳台
const CHINESE_COUNTRIES = new Set(["CN", "HK", "MO", "TW"]);
const COOKIE_NAME = "void_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 年

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, cookies } = context;

  // 构建期 prerender 也会跑 middleware，但 request 是 mock — 直通
  if (!request.headers.get("host")) {
    return next();
  }

  // 仅处理根路径请求；/en/ 显式英文 / 其他静态资源直通
  if (url.pathname !== "/" && url.pathname !== "/en" && url.pathname !== "/en/") {
    return next();
  }

  // 用户曾手动切过语言 → 尊重 cookie，落地后不再 IP 重定向
  const sticky = cookies.get(COOKIE_NAME)?.value;

  // /en/ 路径访问 → 写入 cookie 记住偏好
  if (url.pathname.startsWith("/en")) {
    if (sticky !== "en") {
      cookies.set(COOKIE_NAME, "en", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return next();
  }

  // 根路径
  if (sticky === "zh") {
    return next();
  }
  if (sticky === "en") {
    return Response.redirect(new URL("/en/", url), 302);
  }

  // 没有 cookie → 看 IP 地理（Vercel 注入 header）
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  if (country && !CHINESE_COUNTRIES.has(country.toUpperCase())) {
    return Response.redirect(new URL("/en/", url), 302);
  }

  // 中文圈或无 country header → 中文版 + 写 cookie
  cookies.set(COOKIE_NAME, "zh", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return next();
});
