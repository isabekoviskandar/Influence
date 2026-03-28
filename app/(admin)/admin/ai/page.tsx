"use client";

import { useState } from "react";
import { BrainCircuit, Sparkles, TrendingUp, Zap, Clock, BarChart2 } from "lucide-react";

const kpis = [
  { label: "Total Generations", value: "48,230", icon: Sparkles, change: "+18.4%", changeColor: "text-emerald-400" },
  { label: "Active AI Users",   value: "1,284",  icon: BrainCircuit, change: "+9.2%",  changeColor: "text-emerald-400" },
  { label: "Avg Response Time",  value: "1.2s",   icon: Clock, change: "-0.3s",  changeColor: "text-emerald-400" },
  { label: "Credit Usage",       value: "72%",    icon: Zap, change: "28% left", changeColor: "text-amber-400" },
];

const features = [
  { name: "Content Idea Generator", count: 14203, pct: 85, desc: "AI-powered content ideas based on niche, trend data, and audience preferences" },
  { name: "Peak Time Scheduler",    count: 9812,  pct: 60, desc: "Optimal posting time suggestions using engagement pattern analysis" },
  { name: "Niche Finder",           count: 8442,  pct: 52, desc: "Market gap analysis and untapped niche discovery engine" },
  { name: "Competitor Analysis",    count: 6533,  pct: 40, desc: "Benchmark against similar creators with growth strategy insights" },
  { name: "Video Script Writer",    count: 5210,  pct: 32, desc: "AI script generation for short-form and long-form video content" },
  { name: "Hashtag Suggester",      count: 4030,  pct: 25, desc: "Trending and niche-specific hashtag recommendations" },
];

const dailyUsage = [
  { day: "Mon", value: 65 }, { day: "Tue", value: 82 }, { day: "Wed", value: 91 },
  { day: "Thu", value: 78 }, { day: "Fri", value: 95 }, { day: "Sat", value: 45 }, { day: "Sun", value: 38 },
];

const topUsers = [
  { name: "Dilnoza M.", email: "dilnoza@gmail.com", generations: 342, plan: "Pro" },
  { name: "Jasur K.",   email: "jasur@tech.uz",     generations: 289, plan: "Agency" },
  { name: "Kamola R.",  email: "kamola@fit.uz",      generations: 234, plan: "Pro" },
  { name: "Alex V.",    email: "alex@creator.uz",    generations: 198, plan: "Creator" },
  { name: "Malika S.",  email: "malika@beauty.uz",   generations: 176, plan: "Agency" },
];

const modelPerf = [
  { model: "GPT-4o",          calls: 18420, avgTime: "1.4s",  successRate: "99.2%", status: "Primary" },
  { model: "Claude 3.5",      calls: 12800, avgTime: "1.1s",  successRate: "99.6%", status: "Secondary" },
  { model: "Gemini 2.0 Flash",calls: 9210,  avgTime: "0.8s",  successRate: "98.9%", status: "Fallback" },
  { model: "Local LLaMA 3",   calls: 7800,  avgTime: "2.1s",  successRate: "97.4%", status: "On-prem" },
];

export default function AdminAIPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-[#e1e1f2] font-semibold text-lg">AI Usage &amp; Analytics</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#5b3fd4]/10 border border-[#5b3fd4]/20 rounded-full">
            <BrainCircuit className="w-3.5 h-3.5 text-[#c9bfff]" />
            <span className="text-[11px] font-bold text-[#c9bfff] uppercase tracking-wider">AI Engine Active</span>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-[#191b26] p-6 rounded-2xl border border-[#484554]/10 hover:border-[#5b3fd4]/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-[0.15em]">{kpi.label}</p>
                <kpi.icon className="w-5 h-5 text-[#5b3fd4] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold tabular-nums tracking-tight">{kpi.value}</h3>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Feature Usage Breakdown */}
          <div className="lg:col-span-7 bg-[#191b26] p-8 rounded-3xl border border-[#484554]/5">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-lg font-semibold tracking-tight">Feature usage breakdown</h4>
                <p className="text-xs text-[#8B8FA8] mt-1">Click a feature for more details</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#c9bfff] tabular-nums">48,230</span>
                <span className="text-[#8B8FA8] text-sm">total</span>
              </div>
            </div>
            <div className="space-y-5">
              {features.map((f) => (
                <div
                  key={f.name}
                  className={`space-y-1.5 p-3 -mx-3 rounded-xl cursor-pointer transition-all ${selectedFeature === f.name ? "bg-[#5b3fd4]/10 ring-1 ring-[#5b3fd4]/30" : "hover:bg-[#1d1f2b]"}`}
                  onClick={() => setSelectedFeature(selectedFeature === f.name ? null : f.name)}
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#e1e1f2]">{f.name}</span>
                    <span className="tabular-nums text-[#8B8FA8]">{f.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5b3fd4] h-full rounded-full transition-all" style={{ width: `${f.pct}%` }} />
                  </div>
                  {selectedFeature === f.name && (
                    <p className="text-xs text-[#8B8FA8] mt-2 animate-in fade-in duration-200">{f.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Volume + Top Users */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daily Volume Bar Chart */}
            <div className="bg-[#191b26] p-6 rounded-3xl border border-[#484554]/5">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Daily AI Volume</h4>
              <div className="h-32 flex items-end justify-between gap-3">
                {dailyUsage.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-[#5b3fd4] hover:brightness-125 transition-all"
                      style={{ height: `${d.value}%` }}
                    />
                    <span className="text-[10px] font-bold text-[#8B8FA8]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top AI Users */}
            <div className="bg-[#191b26] p-6 rounded-3xl border border-[#484554]/5">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Top AI Users</h4>
              <div className="space-y-3">
                {topUsers.map((u, i) => (
                  <div key={u.email} className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#1d1f2b] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center text-[10px] font-bold text-[#5b3fd4]">#{i+1}</span>
                      <div>
                        <p className="text-sm font-semibold">{u.name}</p>
                        <p className="text-[10px] text-[#8B8FA8]">{u.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">{u.generations}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${u.plan === "Agency" ? "bg-[#1D9E75]/20 text-[#1D9E75]" : u.plan === "Pro" ? "bg-[#7B61FF]/20 text-[#7B61FF]" : "bg-[#5B3FD4]/20 text-[#c9bfff]"}`}>{u.plan}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance Table */}
        <div className="bg-[#191b26] rounded-3xl border border-[#484554]/5 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex justify-between items-center">
            <h4 className="text-sm font-bold uppercase tracking-widest">Model Performance</h4>
            <BarChart2 className="w-4 h-4 text-[#8B8FA8]" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-widest bg-[#0c0e18]/50">
                  {["Model","Total Calls","Avg Response","Success Rate","Role"].map(h => <th key={h} className="px-6 py-4">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#484554]/10">
                {modelPerf.map((m) => (
                  <tr key={m.model} className="hover:bg-[#1d1f2b]/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-[#e1e1f2]">{m.model}</td>
                    <td className="px-6 py-4 text-sm tabular-nums">{m.calls.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm tabular-nums">{m.avgTime}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${parseFloat(m.successRate) >= 99 ? "text-emerald-400" : "text-amber-400"}`}>{m.successRate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${m.status === "Primary" ? "bg-[#5b3fd4]/20 text-[#c9bfff]" : "bg-[#323440] text-[#8B8FA8]"}`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
