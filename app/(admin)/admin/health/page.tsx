"use client";

import { RefreshCw, Bell, CheckCircle2 } from "lucide-react";

const serviceCards = [
  { name: "API Server",       latency: "12ms", uptime: "99.98%", color: "green",  bars: [60,50,80,65,70,40,55] },
  { name: "Database Cluster", latency: "4ms",  uptime: "100%",   color: "green",  bars: [40,42,38,45,40,41,39] },
  { name: "AI Engine",        latency: "1.2s", uptime: "99.91%", color: "purple", bars: [90,85,95,88,92,80,85] },
  { name: "Task Scheduler",   latency: "0.2s", uptime: "99.99%", color: "green",  bars: [30,35,32,38,34,31,33] },
];

const dependencies = [
  { name: "Stripe API",       status: "ACTIVE",   statusColor: "text-green-400 bg-green-400/10" },
  { name: "Instagram Graph",  status: "ACTIVE",   statusColor: "text-green-400 bg-green-400/10" },
  { name: "Telegram Bot API", status: "ACTIVE",   statusColor: "text-green-400 bg-green-400/10" },
  { name: "YouTube Data API", status: "DEGRADED", statusColor: "text-amber-400 bg-amber-400/10", note: "120ms latency" },
];

const incidents = [
  { ts: "10:42 AM", priority: "LOW",    pfx: "text-blue-400 bg-blue-500/10",     service: "Scheduler", message: "Retry attempt for 3 jobs",            by: "System" },
  { ts: "04:12 AM", priority: "HIGH",   pfx: "text-[#ffb4ab] bg-[#ffb4ab]/10",  service: "Database",  message: "Spike in connection pool",             by: "admin@influence.uz", resolved: true },
  { ts: "02:44 AM", priority: "MEDIUM", pfx: "text-amber-400 bg-amber-500/10",   service: "AI Engine", message: "Rate limit exceeded for user #847",    by: "System" },
];

export default function SystemHealthPage() {
  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h2 className="text-[#e1e1f2] font-semibold text-lg">System Health</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">All Systems Operational</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#8B8FA8]">
          <button className="p-2 hover:text-[#c9bfff] transition-colors"><RefreshCw className="w-5 h-5" /></button>
          <button className="p-2 hover:text-[#c9bfff] transition-colors"><Bell className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Service Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((s) => (
            <div key={s.name} className="bg-[#191b26] p-5 rounded-2xl border border-[#484554]/10 hover:border-[#5b3fd4]/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-[#8B8FA8] uppercase tracking-widest mb-1">{s.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.color === "green" ? "bg-green-500" : "bg-[#5b3fd4]"}`} />
                    <span className="text-lg font-bold tabular-nums">{s.latency}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-green-400">{s.uptime}</p>
                  <p className="text-[10px] text-[#8B8FA8] uppercase tracking-tighter">Uptime</p>
                </div>
              </div>
              <div className="h-10 flex items-end gap-1">
                {s.bars.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm"
                    style={{ height: `${h}%`, backgroundColor: s.color === "green" ? "rgba(74,222,128,0.2)" : "rgba(91,63,212,0.2)" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 3 Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CPU/RAM */}
          <div className="bg-[#191b26] p-6 rounded-3xl border border-[#484554]/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Server Resources</h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[{label:"CPU Usage",pct:42,offset:58},{label:"RAM Usage",pct:68,offset:32}].map((r) => (
                <div key={r.label} className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle className="stroke-[#323440]" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                      <circle className="stroke-[#c9bfff]" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset={r.offset} strokeLinecap="round" strokeWidth="3" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{r.pct}%</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#8B8FA8] uppercase mt-3">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-[#8B8FA8] uppercase">Disk Storage</span>
                <span className="text-xs font-semibold">1.2TB / 4TB</span>
              </div>
              <div className="h-2 bg-[#323440] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#5b3fd4] to-[#c9bfff] w-[30%]" />
              </div>
            </div>
          </div>

          {/* Error Rate */}
          <div className="bg-[#191b26] p-6 rounded-3xl border border-[#484554]/10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Error Rate (24h)</h3>
              <div className="text-right">
                <p className="text-xl font-bold text-[#ffb4ab]">0.02%</p>
                <p className="text-[10px] text-[#8B8FA8] uppercase">Avg. Hourly</p>
              </div>
            </div>
            <div className="h-32 mb-6 relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path className="stroke-[#ffb4ab]" d="M0 35 Q10 35 20 34 T40 33 T60 20 T80 34 T100 35" fill="none" strokeWidth="1.5" />
                <circle className="fill-[#ffb4ab]" cx="60" cy="20" r="2" />
              </svg>
              <div className="absolute top-2 left-[60%] -translate-x-1/2 bg-[#ffb4ab]/20 px-2 py-0.5 rounded text-[10px] font-bold text-[#ffb4ab] uppercase">4:00 AM SPIKE</div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-[#484554]/10 pt-6">
              <div><p className="text-[11px] font-bold text-[#8B8FA8] uppercase">Total Errors</p><p className="text-lg font-bold">14</p></div>
              <div><p className="text-[11px] font-bold text-[#8B8FA8] uppercase">Handled</p><p className="text-lg font-bold text-green-400">14</p></div>
            </div>
          </div>

          {/* External Deps */}
          <div className="bg-[#191b26] p-6 rounded-3xl border border-[#484554]/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">External Dependencies</h3>
            <ul className="space-y-4">
              {dependencies.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1d1f2b] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#8B8FA8]" />
                    </div>
                    <span className="text-sm font-medium">{d.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${d.statusColor}`}>{d.status}</span>
                    {d.note && <p className="text-[10px] text-[#8B8FA8] mt-1">{d.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Incidents Table */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest">Recent Incidents &amp; Alerts</h3>
            <button className="text-[11px] font-bold text-[#c9bfff] uppercase hover:underline">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold text-[#8B8FA8] uppercase tracking-widest bg-[#1d1f2b]/30">
                  {["Timestamp","Priority","Service","Message","Resolved By"].map(h => <th key={h} className="px-6 py-4">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#484554]/10">
                {incidents.map((inc, i) => (
                  <tr key={i} className="hover:bg-[#1d1f2b]/20 transition-colors">
                    <td className="px-6 py-4 text-sm">{inc.ts}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${inc.pfx}`}>{inc.priority}</span></td>
                    <td className="px-6 py-4 text-sm font-medium">{inc.service}</td>
                    <td className="px-6 py-4 text-sm text-[#8B8FA8]">{inc.message}</td>
                    <td className="px-6 py-4 text-sm">
                      {inc.resolved ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[#c9bfff] font-semibold">{inc.by}</span>
                          <span className="text-[10px] text-green-400 uppercase font-bold">(Resolved)</span>
                        </div>
                      ) : <span className="text-[#8B8FA8]">{inc.by}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
