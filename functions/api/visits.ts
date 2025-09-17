function unauthorized() {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export const onRequestGet = async (ctx) => {
  const { request, env } = ctx;

  // Cloudflare Access 保护（任选其一头部存在即可）
  const accessJWT = request.headers.get("Cf-Access-Jwt-Assertion");
  const accessEmail = request.headers.get("cf-access-authenticated-user-email");
  if (!accessJWT && !accessEmail) {
    return unauthorized();
  }

  if (!env.FEED_DB) {
    return new Response(JSON.stringify({ error: "no_db_binding" }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const url = new URL(request.url);
  const path_contains = url.searchParams.get("path_contains") || "";
  const country = url.searchParams.get("country") || "";
  const ua_contains = url.searchParams.get("ua_contains") || "";
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const page_size = Math.min(200, Math.max(1, parseInt(url.searchParams.get("page_size") || "50", 10)));

  const where = [];
  const binds = [];

  if (path_contains) {
    where.push("path LIKE ?");
    binds.push(`%${path_contains}%`);
  }
  if (country) {
    where.push("country = ?");
    binds.push(country.toUpperCase());
  }
  if (ua_contains) {
    where.push("(ua LIKE ? OR ua_browser LIKE ? OR ua_os LIKE ?)");
    binds.push(`%${ua_contains}%`, `%${ua_contains}%`, `%${ua_contains}%`);
  }
  if (from) {
    const fromMs = Date.parse(from);
    if (!Number.isNaN(fromMs)) {
      where.push("ts >= ?");
      binds.push(fromMs);
    }
  }
  if (to) {
    const toMs = Date.parse(to);
    if (!Number.isNaN(toMs)) {
      where.push("ts <= ?");
      binds.push(toMs);
    }
  }

  const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const offset = (page - 1) * page_size;

  const sql = `SELECT id, ts, method, path, query, referer_host, referer_path, ip,
                      country, region, city, latitude, longitude, asn, as_org, timezone,
                      ua, ua_browser, ua_os, accept_language
               FROM visit_logs
               ${whereSQL}
               ORDER BY ts DESC
               LIMIT ? OFFSET ?`;

  const countSql = `SELECT COUNT(*) AS c FROM visit_logs ${whereSQL}`;

  try {
    const countRow = await env.FEED_DB.prepare(countSql).bind(...binds).first();
    const total = (countRow && (countRow.c || countRow.C || countRow.count)) || 0;

    const allBinds = [...binds, page_size, offset];
    const rows = await env.FEED_DB.prepare(sql).bind(...allBinds).all();

    return new Response(
      JSON.stringify({
        total,
        page,
        page_size,
        results: rows.results || [],
      }),
      { headers: { "content-type": "application/json; charset=utf-8" } }
    );
  } catch (e) {
    console.error("visits query failed", e);
    return new Response(JSON.stringify({ error: "query_failed" }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
};