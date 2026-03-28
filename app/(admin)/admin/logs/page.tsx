"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

type LogType = "ALL" | "USER" | "AI" | "BILLING" | "ERROR" | "SYSTEM";

interface LogEntry {
  ts: string;
  type: "USER" | "AI" | "BILLING" | "ERROR" | "SYSTEM";
  actor: string;
  action: string;
  detail: string;
  isError?: boolean;
  isSuccess?: boolean;
}

const typeColors: Record<string, string> = {
  USER:    "text-blue-400 bg-blue-500/10",
  AI:      "text-[#c9bfff] bg-[#5b3fd4]/10",
  BILLING: "text-emerald-400 bg-emerald-500/10",
  ERROR:   "text-red-400 bg-red-500/10",
  SYSTEM:  "text-amber-400 bg-amber-500/10",
};

const mockLogs: LogEntry[] = [
  { ts: "2024-10-30 14:32:01", type: "USER",    actor: "alex@creator.uz",     action: "Scheduled post",            detail: "Instagram, Wed 8PM" },
  { ts: "2024-10-30 14:28:44", type: "AI",      actor: "dilnoza@gmail.com",   action: "Generated 10 ideas",        detail: "Niche: Lifestyle UZ" },
  { ts: "2024-10-30 14:25:12", type: "ERROR",   actor: "system",              action: "Payment gateway timeout",    detail: "Stripe API — 3 retries", isError: true },
  { ts: "2024-10-30 14:20:33", type: "USER",    actor: "jasur@tech.uz",       action: "Connected YouTube",         detail: "Channel: JasurTech" },
  { ts: "2024-10-30 14:15:08", type: "AI",      actor: "kamola@fit.uz",       action: "Niche finder used",         detail: "Result: Fitness UZ" },
  { ts: "2024-10-30 14:10:22", type: "BILLING", actor: "system",              action: "Subscription renewed",      detail: "$12 Creator plan", isSuccess: true },
  { ts: "2024-10-30 14:05:47", type: "ERROR",   actor: "system",              action: "API rate limit hit",        detail: "Instagram API", isError: true },
  { ts: "2024-10-30 14:01:19", type: "USER",    actor: "admin@influence.uz",  action: "User banned",               detail: "target: spam@xxx.com" },
  { ts: "2024-10-30 13:58:22", type: "AI",      actor: "odil@vlog.uz",        action: "Script optimized",          detail: "Video: Gaming Trends" },
  { ts: "2024-10-30 13:55:04", type: "USER",    actor: "nigora@cooks.uz",     action: "Updated profile",           detail: "Bio & Location" },
  { ts: "2024-10-30 13:50:18", type: "SYSTEM",  actor: "cron",                action: "DB backup completed",       detail: "Size: 2.4GB" },
  { ts: "2024-10-30 13:45:30", type: "BILLING", actor: "system",              action: "Invoice generated",         detail: "$299 Agency plan", isSuccess: true },
  { ts: "2024-10-30 13:40:11", type: "USER",    actor: "bekzod@design.uz",    action: "Changed password",          detail: "Security update" },
  { ts: "2024-10-30 13:35:42", type: "AI",      actor: "malika@beauty.uz",    action: "Hashtag suggestions",       detail: "12 tags generated" },
  { ts: "2024-10-30 13:30:55", type: "SYSTEM",  actor: "deployer",            action: "Version deployed",          detail: "v2.4.1 → v2.4.2" },
];

const FILTERS: LogType[] = ["ALL", "USER", "AI", "BILLING", "ERROR", "SYSTEM"];

export default function AdminLogsPage() {
  const [activeFilter, setActiveFilter] = useState<LogType>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = mockLogs.filter((log) => {
    if (activeFilter !== "ALL" && log.type !== activeFilter) return false;
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.actor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center">
        <div>
          <h2 className="text-[#e1e1f2] font-semibold text-lg">Activity Logs</h2>
          <p className="text-[10px] text-[#8B8FA8] uppercase tracking-wider font-bold">{filtered.length} entries found</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#272935] text-[#e1e1f2] text-xs font-bold hover:bg-[#323440] transition-all active:scale-95">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </header>

      <div className="p-8 space-y-6">
        {/* Filters + Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex bg-[#0c0e18] p-1 rounded-lg gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${activeFilter === f ? "bg-[#323440] text-[#e1e1f2]" : "text-[#8B8FA8] hover:text-[#e1e1f2]"}`}
              >
                {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4" />
            <input
              className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#5b3fd4] text-[#e1e1f2] placeholder-[#8B8FA8] outline-none"
              placeholder="Search by action or actor..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Log Table */}
        <div className="bg-[#191b26] rounded-xl overflow-hidden border border-[#1E2035]/50">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-[13px]">
              <thead>
                <tr className="text-left border-b border-white/5 bg-[#0c0e18]/50">
                  {["Timestamp","Type","Actor","Action","Details"].map(h => (
                    <th key={h} className="py-3 px-6 text-[10px] text-[#8B8FA8] uppercase tracking-widest font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="py-12 text-center text-[#8B8FA8] text-sm">No logs match your filters.</td></tr>
                ) : (
                  filtered.map((log, i) => (
                    <tr
                      key={i}
                      className={`border-b border-white/5 transition-colors ${log.isError ? "bg-red-500/[0.03] border-l-2 border-l-red-500 hover:bg-red-500/[0.05]" : log.isSuccess ? "bg-emerald-500/[0.03] hover:bg-emerald-500/[0.05]" : "hover:bg-white/[0.02]"}`}
                    >
                      <td className="py-3 px-6 text-[#8B8FA8] whitespace-nowrap">[{log.ts}]</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeColors[log.type]}`}>{log.type}</span>
                      </td>
                      <td className="py-3 px-6 text-[#e1e1f2]">{log.actor}</td>
                      <td className={`py-3 px-6 ${log.isError ? "text-red-400" : log.isSuccess ? "text-emerald-400" : "text-[#8B8FA8]"}`}>{log.action}</td>
                      <td className="py-3 px-6 text-[#8B8FA8]">{log.detail}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-6 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-[#8B8FA8]">Showing {filtered.length} of 14,842 activities</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page-1))} disabled={page===1} className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1,2,3].map(p => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${page===p ? "bg-[#5b3fd4] text-white" : "border border-white/10 hover:bg-white/5"}`}>{p}</button>
              ))}
              <button onClick={() => setPage(Math.min(3, page+1))} disabled={page===3} className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
