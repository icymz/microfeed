let schemaEnsured = false;

export const onRequest = async (ctx: any) => {
  const { request, env, next } = ctx;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 排除后台、接口、静态资源；仅记录 GET
  const skip =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_worker") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|txt|xml|json|webmanifest|mp3|mp4|webm|wav|ogg|pdf)$/i.test(pathname);

  const isPageView = request.method === "GET" && !skip;

  if (isPageView && env.FEED_DB) {
    const pathOnly = url.pathname + url.search; // 不带域名
    const query = url.search;

    // 解析 Referer（拆分 host + 无域名路径）
    const referer = request.headers.get("referer") || "";
    let referer_host = "";
    let referer_path = "";
    try {
      if (referer) {
        const r = new URL(referer);
        referer_host = r.host || "";
        referer_path = r.pathname + r.search;
      }
    } catch (_) {}

    const ip = request.headers.get("cf-connecting-ip") || "";
    const ua = request.headers.get("user-agent") || "";
    const accept_language = request.headers.get("accept-language") || "";

    const cf = request.cf || {};
    const country = cf.country || "";
    const region = cf.region || cf.regionCode || "";
    const city = cf.city || "";
    const latitude = cf.latitude ? Number(cf.latitude) : null;
    const longitude = cf.longitude ? Number(cf.longitude) : null;
    const asn = cf.asn ? Number(cf.asn) : null;
    const as_org = cf.asOrganization || "";
    const timezone = cf.timezone || "";

    // 轻量 UA 解析
    function parseUA(uaStr: any) {
      let browser = "Other";
      let os = "Other";
      if (/Edg\//.test(uaStr)) browser = "Edge";
      else if (/Chrome\/\d+/.test(uaStr) && !/Chromium/.test(uaStr)) browser = "Chrome";
      else if (/Firefox\/\d+/.test(uaStr)) browser = "Firefox";
      else if (/Safari\/\d+/.test(uaStr) && /Version\/\d+/.test(uaStr)) browser = "Safari";

      if (/Windows NT/.test(uaStr)) os = "Windows";
      else if (/Mac OS X/.test(uaStr)) os = "macOS";
      else if (/Android/.test(uaStr)) os = "Android";
      else if (/iPhone|iPad|iPod/.test(uaStr)) os = "iOS";
      else if (/Linux/.test(uaStr)) os = "Linux";

      return { browser, os };
    }
    const { browser: ua_browser, os: ua_os } = parseUA(ua);

    // 首次确保表与索引
    try {
      if (!schemaEnsured) {
        await env.FEED_DB.prepare(
          `CREATE TABLE IF NOT EXISTS visit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ts INTEGER NOT NULL,
            method TEXT,
            path TEXT,
            query TEXT,
            referer_host TEXT,
            referer_path TEXT,
            ip TEXT,
            country TEXT,
            region TEXT,
            city TEXT,
            latitude REAL,
            longitude REAL,
            asn INTEGER,
            as_org TEXT,
            timezone TEXT,
            ua TEXT,
            ua_browser TEXT,
            ua_os TEXT,
            accept_language TEXT
          )`
        ).run();
        await env.FEED_DB.prepare(`CREATE INDEX IF NOT EXISTS idx_visit_logs_ts ON visit_logs (ts DESC)`).run();
        await env.FEED_DB.prepare(`CREATE INDEX IF NOT EXISTS idx_visit_logs_path ON visit_logs (path)`).run();
        await env.FEED_DB.prepare(`CREATE INDEX IF NOT EXISTS idx_visit_logs_country ON visit_logs (country)`).run();
        await env.FEED_DB.prepare(`CREATE INDEX IF NOT EXISTS idx_visit_logs_ua_browser ON visit_logs (ua_browser)`).run();
        schemaEnsured = true;
      }
    } catch (e) {
      console.error("ensure schema failed", e);
    }

    // 写入
    try {
      await env.FEED_DB.prepare(
        `INSERT INTO visit_logs
         (ts, method, path, query, referer_host, referer_path, ip, country, region, city, latitude, longitude, asn, as_org, timezone, ua, ua_browser, ua_os, accept_language)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          Date.now(),
          request.method,
          pathOnly,
          query,
          referer_host,
          referer_path,
          ip,
          country,
          region,
          city,
          latitude,
          longitude,
          asn,
          as_org,
          timezone,
          ua,
          ua_browser,
          ua_os,
          accept_language
        )
        .run();
    } catch (e) {
      console.error("insert visit log failed", e);
    }
  }

  return next();
};