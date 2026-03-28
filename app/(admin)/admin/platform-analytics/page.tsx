"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    color: "#E1306C",
    users: 12840,
    growth: "+12.4%",
    followers: "4.2M",
    niche: "Lifestyle",
    bars: [20, 40, 30, 50, 60],
  },
  {
    name: "Telegram",
    color: "#0088cc",
    users: 8112,
    growth: "+8.1%",
    followers: "18.5M",
    niche: "News/Tech",
    bars: [50, 30, 60, 40, 80],
  },
  {
    name: "YouTube",
    color: "#FF0000",
    users: 4209,
    growth: "+15.8%",
    followers: "120M",
    niche: "Vlogs",
    bars: [20, 60, 40, 50, 70],
  },
  {
    name: "TikTok",
    color: "#00f2ea",
    users: 22154,
    growth: "+24.2%",
    followers: "840M",
    niche: "Entertainment",
    bars: [40, 70, 50, 80, 30],
  },
];

const monthlyGrowth = [
  { month: "MAY", ig: 60, tg: 40, yt: 20, tt: 80 },
  { month: "JUN", ig: 65, tg: 45, yt: 25, tt: 85 },
  { month: "JUL", ig: 75, tg: 55, yt: 30, tt: 90 },
  { month: "AUG", ig: 70, tg: 60, yt: 35, tt: 85 },
  { month: "SEP", ig: 80, tg: 75, yt: 45, tt: 95 },
  { month: "OCT", ig: 90, tg: 85, yt: 50, tt: 100 },
];

const aiFeatures = [
  { name: "Content idea generator", count: 14203, pct: 85 },
  { name: "Peak time scheduler",    count: 9812,  pct: 60 },
  { name: "Niche finder",           count: 8442,  pct: 52 },
  { name: "Competitor analysis",    count: 6533,  pct: 40 },
  { name: "Video script writer",    count: 5210,  pct: 32 },
  { name: "Hashtag suggester",      count: 4030,  pct: 25 },
];

const activityLogs = [
  { ts: "[2024-10-30 14:32:01]", type: "USER",    typeColor: "text-blue-400 bg-blue-500/10",    actor: "alex@creator.uz",      action: '"Scheduled post"',     detail: "Instagram, Wed 8PM" },
  { ts: "[2024-10-30 14:28:44]", type: "AI",      typeColor: "text-[#c9bfff] bg-[#5b3fd4]/10", actor: "dilnoza@gmail.com",     action: '"Generated 10 ideas"', detail: "Niche: Lifestyle UZ" },
  { ts: "[2024-10-30 14:25:12]", type: "BILLING", typeColor: "text-red-400 bg-red-500/10",      actor: "system",               action: '"Payment failed"',      detail: "$29 Pro plan",         isError: true },
  { ts: "[2024-10-30 14:20:33]", type: "USER",    typeColor: "text-blue-400 bg-blue-500/10",    actor: "jasur@tech.uz",        action: '"Connected YouTube"',   detail: "Channel: JasurTech" },
  { ts: "[2024-10-30 14:15:08]", type: "AI",      typeColor: "text-[#c9bfff] bg-[#5b3fd4]/10", actor: "kamola@fit.uz",        action: '"Niche finder used"',   detail: "Result: Fitness UZ" },
  { ts: "[2024-10-30 14:10:22]", type: "BILLING", typeColor: "text-emerald-400 bg-emerald-500/10", actor: "system",            action: '"Subscription renewed"', detail: "$12 Creator plan",   isSuccess: true },
  { ts: "[2024-10-30 14:05:47]", type: "ERROR",   typeColor: "text-red-400 bg-red-500/10",      actor: "system",               action: '"API rate limit hit"',  detail: "Instagram API",        isError: true },
  { ts: "[2024-10-30 14:01:19]", type: "USER",    typeColor: "text-blue-400 bg-blue-500/10",    actor: "admin@influence.uz",   action: '"User banned"',         detail: "target: spam@xxx.com" },
  { ts: "[2024-10-30 13:58:22]", type: "AI",      typeColor: "text-[#c9bfff] bg-[#5b3fd4]/10", actor: "odil@vlog.uz",         action: '"Script optimized"',    detail: "Video: Gaming Trends" },
  { ts: "[2024-10-30 13:55:04]", type: "USER",    typeColor: "text-blue-400 bg-blue-500/10",    actor: "nigora@cooks.uz",      action: '"Updated profile"',     detail: "Bio & Location" },
];

const LOG_FILTERS = ["All", "User actions", "AI", "Billing", "Errors"];

export default function PlatformAnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-col min-h-full pt-2">
      <div className="px-8 pb-6 space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between pt-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-[#e1e1f2]">Platform Analytics</h1>
            <p className="text-sm text-[#8B8FA8] mt-1">Aggregated performance across all connected platforms</p>
          </div>
          <div className="flex gap-2">
            {["All","Instagram","Telegram","YouTube","TikTok"].map((p) => (
              <button
                key={p}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${p === "All" ? "bg-[#5b3fd4] text-white" : "text-[#8B8FA8] hover:text-[#e1e1f2]"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="bg-[#191b26] border-l-4 p-6 rounded-r-xl group hover:bg-[#1d1f2b] transition-all"
              style={{ borderColor: p.color }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-1">{p.name}</p>
                  <h3 className="text-2xl font-bold tabular-nums">{p.users.toLocaleString()}</h3>
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full">{p.growth}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B8FA8]">Managed Followers</span>
                  <span className="font-semibold tabular-nums">{p.followers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B8FA8]">Top Niche</span>
                  <span className="font-semibold">{p.niche}</span>
                </div>
              </div>
              <div className="h-8 flex items-end gap-1">
                {p.bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm group-hover:opacity-100 transition-all duration-300"
                    style={{ height: `${h}%`, backgroundColor: i === p.bars.length - 1 ? p.color : `${p.color}33` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Multi-platform Bar Chart */}
          <div className="lg:col-span-6 bg-[#191b26] p-8 rounded-xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-lg font-semibold tracking-tight">Average creator growth by platform</h2>
              <div className="flex gap-4 text-xs font-semibold text-[#8B8FA8]">
                {[["#E1306C","IG"],["#0088cc","TG"],["#FF0000","YT"],["#00f2ea","TT"]].map(([c,l]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{backgroundColor: c}} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between px-2 gap-8">
              {monthlyGrowth.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end gap-1 h-48">
                    {[["#E1306C",m.ig],["#0088cc",m.tg],["#FF0000",m.yt],["#00f2ea",m.tt]].map(([c,h], i) => (
                      <div key={i} className="flex-1 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%`, backgroundColor: c as string }} />
                    ))}
                  </div>
                  <span className="mt-4 text-[10px] text-[#8B8FA8]">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Feature Usage */}
          <div className="lg:col-span-4 bg-[#191b26] p-8 rounded-xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold tracking-tight">AI feature usage</h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-[#c9bfff] tabular-nums">48,230</span>
                <span className="text-[#8B8FA8] text-sm">Total generations</span>
              </div>
            </div>
            <div className="space-y-5">
              {aiFeatures.map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#8B8FA8]">
                    <span>{f.name}</span>
                    <span className="tabular-nums">{f.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5b3fd4] h-full rounded-full" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-[#191b26] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-6">
              <h2 className="text-base font-bold">Recent system activity</h2>
              <div className="flex bg-[#0c0e18] p-1 rounded-lg gap-1">
                {LOG_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${activeFilter === f ? "bg-[#323440] text-[#e1e1f2]" : "text-[#8B8FA8] hover:text-[#e1e1f2]"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4" />
              <input
                className="w-full bg-[#0c0e18] border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#5b3fd4] text-[#e1e1f2] placeholder-[#8B8FA8] outline-none"
                placeholder="Search activity..."
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-[13px]">
              <thead>
                <tr className="text-left border-b border-white/5 bg-[#0c0e18]/50">
                  {["Timestamp","Entity","Actor","Action","Details"].map(h => (
                    <th key={h} className="py-3 px-6 text-[10px] text-[#8B8FA8] uppercase tracking-widest font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activityLogs.map((log, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 transition-colors ${log.isError ? "bg-red-500/[0.03] border-l-2 border-l-red-500 hover:bg-red-500/[0.05]" : log.isSuccess ? "bg-emerald-500/[0.03] hover:bg-emerald-500/[0.05]" : "hover:bg-white/[0.02]"}`}
                  >
                    <td className="py-3 px-6 text-[#8B8FA8]">{log.ts}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.typeColor}`}>{log.type}</span>
                    </td>
                    <td className="py-3 px-6 text-[#e1e1f2]">{log.actor}</td>
                    <td className={`py-3 px-6 ${log.isError ? "text-red-400" : log.isSuccess ? "text-emerald-400" : "text-[#8B8FA8]"}`}>{log.action}</td>
                    <td className="py-3 px-6 text-[#8B8FA8]">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-[#8B8FA8]">Showing 1-10 of 14,842 activities</p>
            <div className="flex gap-2">
              {["‹","1","2","3","›"].map((p, i) => (
                <button key={i} className={`w-8 h-8 flex items-center justify-center rounded border transition-colors text-xs font-bold ${i === 1 ? "bg-[#5b3fd4] text-white border-[#5b3fd4]" : "border-white/10 hover:bg-white/5 text-[#e1e1f2]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
