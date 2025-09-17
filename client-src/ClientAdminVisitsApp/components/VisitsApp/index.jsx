import React from "react";
import AdminNavApp from "../../../components/AdminNavApp";
import {NAV_ITEMS} from "../../../../common-src/Constants";
import {unescapeHtml} from "../../../../common-src/StringUtils";

class VisitsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
      country: "",
      ua: "",
      from: "",
      to: "",
      page: 1,
      pageSize: 50,
      loading: false,
      total: 0,
      rows: [],
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    const {q, country, ua, from, to, page, pageSize} = this.state;
    const u = new URLSearchParams();
    if (q) u.set("path_contains", q);
    if (country) u.set("country", country);
    if (ua) u.set("ua_contains", ua);
    if (from) u.set("from", from);
    if (to) u.set("to", to);
    u.set("page", String(page));
    u.set("page_size", String(pageSize));

    this.setState({loading: true});
    try {
      const res = await fetch(`/api/visits?${u.toString()}`);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      this.setState({
        total: data.total || 0,
        rows: data.results || [],
      });
    } finally {
      this.setState({loading: false});
    }
  }

  render() {
    const {q, country, ua, from, to, page, pageSize, rows, total, loading} = this.state;
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">访问日志检索</h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
          <input className="border p-2" placeholder="路径包含（path_contains）" value={q} onChange={(e) => this.setState({q: e.target.value})} />
          <input className="border p-2" placeholder="国家（如 CN/US）" value={country} onChange={(e) => this.setState({country: e.target.value.toUpperCase()})} />
          <input className="border p-2" placeholder="UA/浏览器/系统 包含" value={ua} onChange={(e) => this.setState({ua: e.target.value})} />
          <input className="border p-2" type="datetime-local" value={from} onChange={(e) => this.setState({from: e.target.value})} />
          <input className="border p-2" type="datetime-local" value={to} onChange={(e) => this.setState({to: e.target.value})} />
          <select className="border p-2" value={pageSize} onChange={(e) => this.setState({pageSize: parseInt(e.target.value, 10)})}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="mb-2 text-sm text-gray-600">
          共 {total} 条；第 {page} 页
        </div>

        <div className="overflow-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">时间</th>
                <th className="p-2 text-left">路径</th>
                <th className="p-2 text-left">来源</th>
                <th className="p-2 text-left">IP/国家/城市</th>
                <th className="p-2 text-left">浏览器/系统</th>
                <th className="p-2 text-left">UA</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">{new Date(r.ts).toLocaleString()}</td>
                  <td className="p-2 break-all">{r.path}</td>
                  <td className="p-2 break-all">{r.referer_host ? `${r.referer_host}${r.referer_path || ""}` : ""}</td>
                  <td className="p-2 whitespace-nowrap">
                    {r.ip} / {r.country}
                    {r.city ? ` / ${r.city}` : ""}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {r.ua_browser} / {r.ua_os}
                  </td>
                  <td className="p-2 break-all">{r.ua}</td>
                </tr>
              ))}
              {!rows.length && !loading && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>
                    无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="border px-3 py-1" onClick={() => this.setState({page: Math.max(1, page - 1)}, this.load)} disabled={page <= 1}>
            上一页
          </button>
          <button className="border px-3 py-1" onClick={() => this.setState({page: rows.length < pageSize ? page : page + 1}, this.load)} disabled={rows.length < pageSize}>
            下一页
          </button>
          <button className="border px-3 py-1 ml-2" onClick={this.load}>刷新</button>
        </div>
      </div>
    );
  }
}

export default class VisitsApp extends React.Component {
  constructor(props) {
    super(props);
    const onboardingResult = JSON.parse(unescapeHtml(document.getElementById('onboarding-result').innerHTML));
    this.state = { onboardingResult };
  }

  render() {
    const {onboardingResult} = this.state;
    return (
      <AdminNavApp currentPage={NAV_ITEMS.VISITS} onboardingResult={onboardingResult}>
        <VisitsTable />
      </AdminNavApp>
    );
  }
}