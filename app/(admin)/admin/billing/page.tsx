/* eslint-disable @next/next/no-img-element */
"use client";

import { RefreshCw, CalendarDays, TrendingUp, TrendingDown, Download, AlertTriangle, CheckCircle2 } from "lucide-react";

const kpis = [
  { label: "MRR", value: "$18,420", badge: "+13.1%", badgeColor: "text-emerald-400 bg-emerald-400/10", trend: "up" },
  { label: "ARR", value: "$221,040", progress: 78 },
  { label: "New MRR", value: "$3,240", icon: "add" },
  { label: "Churned MRR", value: "$890", badge: "4.2%", badgeColor: "text-[#ffb4ab] bg-[#ffb4ab]/10", isError: true },
  { label: "Net New MRR", value: "$2,350", valueColor: "text-emerald-400" },
];

const planDist = [
  { name: "AGENCY",  amount: "$14,877", pct: 38, color: "bg-[#5b3fd4]" },
  { name: "PRO",     amount: "$13,398", pct: 34, color: "bg-[#c9bfff]" },
  { name: "CREATOR", amount: "$11,808", pct: 28, color: "bg-[#b8c4ff]" },
  { name: "FREE",    amount: "$0",       pct: 2,  color: "bg-[#938ea0]" },
];

const transactions = [
  { user: "@m_designer",  plan: "Agency",  amount: "$299.00", status: "Paid",     statusColor: "text-emerald-400 bg-emerald-400/10" },
  { user: "pix_studio",   plan: "Pro",     amount: "$149.00", status: "Failed",   statusColor: "text-[#ffb4ab] bg-[#ffb4ab]/10" },
  { user: "v_agency",     plan: "Agency",  amount: "$299.00", status: "Paid",     statusColor: "text-emerald-400 bg-emerald-400/10" },
  { user: "cre8tor_max",  plan: "Creator", amount: "$49.00",  status: "Pending",  statusColor: "text-[#b8c4ff] bg-[#b8c4ff]/10" },
  { user: "nomad_inc",    plan: "Pro",     amount: "$149.00", status: "Refunded", statusColor: "text-orange-400 bg-orange-400/10" },
];

const churnReasons = [
  { label: "PRICE SENSITIVITY", pct: 45 },
  { label: "LACK OF FEATURES",  pct: 30 },
  { label: "DASHBOARD UX",      pct: 15 },
];

const months = ["JAN","FEB","MAR","APR","MAY","JUN"];
const barHeights = [40, 55, 50, 75, 85, 95];

export default function AdminBillingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center">
        <h2 className="text-[#e1e1f2] font-semibold tracking-tight text-lg">Billing &amp; Revenue</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider cursor-pointer">
            <CalendarDays className="w-4 h-4" />
            <span>Oct 24, 2023</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#272935] text-[#e1e1f2] text-xs font-bold hover:bg-[#323440] transition-all active:scale-95">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
        {/* Row 1: KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#191b26] border border-[#484554]/10 hover:border-[#5b3fd4]/30 transition-all">
              <p className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-[0.15em] mb-4">{kpi.label}</p>
              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-bold tabular-nums tracking-tight ${kpi.valueColor ?? ""} ${kpi.isError ? "text-[#ffb4ab]" : ""}`}>{kpi.value}</h3>
                {kpi.badge && (
                  <span className={`mb-1 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${kpi.badgeColor}`}>
                    {kpi.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : null}
                    {kpi.badge}
                  </span>
                )}
              </div>
              {kpi.progress !== undefined && (
                <div className="mt-3 h-1 w-full bg-[#323440] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9bfff] rounded-full" style={{ width: `${kpi.progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Row 2: Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MRR Bar Chart */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-[#191b26] border border-[#484554]/5">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="text-xl font-semibold tracking-tight">MRR over time</h4>
                <p className="text-xs text-[#8B8FA8]">Subscription growth velocity</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#5b3fd4]" /> MRR</div>
                <div className="flex items-center gap-2"><span className="w-3 h-1 rounded-full border-t border-dashed border-[#c9bfff]" /> ARR Forecast</div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
              <div className="absolute top-10 left-0 w-full h-1 border-t-2 border-dashed border-[#c9bfff]/30 -rotate-2" />
              {months.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col justify-end gap-1 group">
                  <div
                    className="w-full rounded-t-md transition-all hover:brightness-125"
                    style={{ height: `${barHeights[i]}%`, background: `rgba(91,63,212,${0.2 + i * 0.15})` }}
                  />
                  <span className="text-[9px] text-[#8B8FA8] text-center mt-2 font-mono">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Distribution */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#191b26] border border-[#484554]/5">
            <h4 className="text-xl font-semibold tracking-tight mb-8">Plan distribution</h4>
            <div className="space-y-6">
              {planDist.map((p) => (
                <div key={p.name} className={p.name === "FREE" ? "space-y-2 opacity-50" : "space-y-2"}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="tracking-wide text-[#c9bfff]">{p.name}</span>
                    <span className="tabular-nums text-[#e1e1f2]">{p.amount}</span>
                  </div>
                  <div className="h-2 w-full bg-[#1d1f2b] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 rounded-xl bg-[#323440]/20 border border-[#484554]/10 text-center">
              <p className="text-xs text-[#8B8FA8]">Total Volume</p>
              <p className="text-2xl font-bold tabular-nums mt-1">$40,083</p>
            </div>
          </div>
        </section>

        {/* Row 3: Transactions & Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-10 gap-8 pb-12">
          {/* Transactions Table */}
          <div className="lg:col-span-6 rounded-3xl bg-[#191b26] border border-[#484554]/5 overflow-hidden flex flex-col">
            <div className="p-8 pb-4 flex items-center justify-between">
              <h4 className="text-xl font-semibold tracking-tight">Recent transactions</h4>
              <button className="text-xs font-bold text-[#c9bfff] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#272935]/30">
                    {["User","Plan","Amount","Status","Invoice"].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-bold text-[#8B8FA8] uppercase tracking-widest border-b border-[#484554]/5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#484554]/5">
                  {transactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-[#272935]/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{tx.user}</td>
                      <td className="px-6 py-4 text-xs font-medium text-[#8B8FA8]">{tx.plan}</td>
                      <td className="px-6 py-4 text-sm font-bold tabular-nums">{tx.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${tx.statusColor}`}>{tx.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#8B8FA8] hover:text-[#c9bfff] transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analysis Stack */}
          <div className="lg:col-span-4 space-y-6">
            {/* Failed Payments Alert */}
            <div className="p-6 rounded-3xl bg-[#ffb4ab]/5 border border-[#ffb4ab]/20 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#ffb4ab]/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#ffb4ab]" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-1">Failed payments (12)</h5>
                <p className="text-xs text-[#8B8FA8] leading-relaxed">System attempted retries on 8 accounts. 4 require manual intervention immediately.</p>
                <button className="mt-3 text-xs font-bold text-[#ffb4ab] underline">Review 4 accounts</button>
              </div>
            </div>

            {/* Upcoming Renewals */}
            <div className="p-6 rounded-3xl bg-[#191b26] border border-[#484554]/5">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-sm font-bold uppercase tracking-wider">Upcoming renewals</h5>
                <span className="text-xs font-bold tabular-nums">84% Health</span>
              </div>
              <div className="flex gap-1 h-3 mb-6">
                <div className="flex-[84] bg-emerald-400 rounded-l-md" />
                <div className="flex-[10] bg-orange-400" />
                <div className="flex-[6] bg-[#ffb4ab] rounded-r-md" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[10px] text-[#8B8FA8] uppercase mb-1">Success</p><p className="text-lg font-bold tabular-nums">142</p></div>
                <div className="border-x border-[#484554]/10"><p className="text-[10px] text-[#8B8FA8] uppercase mb-1">At Risk</p><p className="text-lg font-bold tabular-nums text-orange-400">12</p></div>
                <div><p className="text-[10px] text-[#8B8FA8] uppercase mb-1">Expected</p><p className="text-lg font-bold tabular-nums">8</p></div>
              </div>
            </div>

            {/* Churn Analysis */}
            <div className="p-6 rounded-3xl bg-[#191b26] border border-[#484554]/5">
              <h5 className="text-sm font-bold uppercase tracking-wider mb-6">Churn analysis (30 days)</h5>
              <div className="space-y-4">
                {churnReasons.map((r) => (
                  <div key={r.label} className="flex items-center gap-4">
                    <span className="text-[10px] font-bold w-24 truncate text-[#8B8FA8]">{r.label}</span>
                    <div className="flex-1 h-2 bg-[#1d1f2b] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ffb4ab]/70 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-[10px] font-bold tabular-nums">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
