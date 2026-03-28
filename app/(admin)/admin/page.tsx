"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { RefreshCw, CalendarDays, TrendingUp, TrendingDown, Eye, CheckCircle2 } from "lucide-react";

// Mock Data
const adminStats = {
  totalUsers: 2847, newThisWeek: 124,
  activeUsers: 1943, activePercent: 68.2,
  mrr: 18420, mrrChange: 2140,
  arr: 221040,
  churnRate: 3.2, churnChange: -0.4,
  arpu: 6.47, arpuChange: 0.32,
};

const userGrowthData = [
  {month:'Jan', total:120, active:89}, {month:'Feb', total:280, active:198},
  {month:'Mar', total:520, active:380}, {month:'Apr', total:890, active:645},
  {month:'May', total:1240, active:892}, {month:'Jun', total:1680, active:1190},
  {month:'Jul', total:2010, active:1420}, {month:'Aug', total:2280, active:1610},
  {month:'Sep', total:2510, active:1760}, {month:'Oct', total:2847, active:1943},
];

const revenueData = [
  { name: 'Creator', value: 42, color: '#5B3FD4' },
  { name: 'Pro', value: 35, color: '#7B61FF' },
  { name: 'Agency', value: 23, color: '#1D9E75' },
];

const mockSignups = [
  { initials: "AR", name: "Aziz Rahmonov", email: "aziz@agency.uz", plan: "Agency", planColor: "text-[#1D9E75]", planBg: "bg-[#1D9E75]/20", time: "12 mins ago" },
  { initials: "EI", name: "Elena Ivanova", email: "elena@creator.ru", plan: "Pro", planColor: "text-[#7B61FF]", planBg: "bg-[#7B61FF]/20", time: "24 mins ago" },
  { initials: "SB", name: "Sherzod Bek", email: "sherzod@mail.uz", plan: "Creator", planColor: "text-[#5B3FD4]", planBg: "bg-[#5B3FD4]/20", time: "48 mins ago" },
  { initials: "DL", name: "David Lynch", email: "david@lynch.com", plan: "Agency", planColor: "text-[#1D9E75]", planBg: "bg-[#1D9E75]/20", time: "1h ago" },
  { initials: "SC", name: "Sarah Connor", email: "sarahc@sky.net", plan: "Creator", planColor: "text-[#5B3FD4]", planBg: "bg-[#5B3FD4]/20", time: "2h ago" },
  { initials: "AM", name: "Arthur Morgan", email: "arthur@rdr.com", plan: "Pro", planColor: "text-[#7B61FF]", planBg: "bg-[#7B61FF]/20", time: "2h ago" },
];

export default function AdminOverviewPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col min-h-full">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center w-full">
        <div>
          <h2 className="text-[#e1e1f2] font-semibold tracking-tight text-lg leading-tight">Admin Overview</h2>
          <p className="text-[10px] text-[#8B8FA8] uppercase tracking-wider font-bold">Last updated 2m ago</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-[#8B8FA8] hover:bg-[#151729] hover:text-[#e1e1f2] transition-all border border-transparent hover:border-[#1E2035] ${refreshing ? "animate-spin text-[#5B3FD4]" : ""}`}
            title="Refresh metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="h-10 px-4 bg-[#151729] border border-[#1E2035] rounded-lg flex items-center gap-3 cursor-pointer hover:border-[#5B3FD4]/40 transition-colors">
            <CalendarDays className="w-4 h-4 text-[#5B3FD4]" />
            <span className="text-sm font-medium text-[#e1e1f2]">Oct 1 - Oct 31, 2024</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 space-y-8 max-w-[1600px] w-full mx-auto">
        
        {/* ROW 1: KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Total */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">Total Users</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">{adminStats.totalUsers.toLocaleString()}</h3>
              <span className="text-xs font-bold text-[#1D9E75] flex items-center gap-1 group cursor-help" title={`+${adminStats.newThisWeek} this week`}>
                <TrendingUp className="w-3 h-3" />+{adminStats.newThisWeek}
              </span>
            </div>
          </div>
          {/* Active */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">Active Users</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">{adminStats.activeUsers.toLocaleString()}</h3>
              <span className="text-xs font-bold text-[#5B3FD4] flex items-center">{adminStats.activePercent}%</span>
            </div>
          </div>
          {/* MRR */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">MRR</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">${adminStats.mrr.toLocaleString()}</h3>
              <span className="text-xs font-bold text-[#1D9E75] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />+${adminStats.mrrChange.toLocaleString()}
              </span>
            </div>
          </div>
          {/* ARR */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">ARR</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">${adminStats.arr.toLocaleString()}</h3>
              <span className="text-xs font-bold text-[#8B8FA8]">Est.</span>
            </div>
          </div>
          {/* Churn */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between border-l-[3px] border-l-[#1D9E75]">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">Churn</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">{adminStats.churnRate}%</h3>
              <span className="text-xs font-bold text-[#1D9E75] flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />{adminStats.churnChange}%
              </span>
            </div>
          </div>
          {/* ARPU */}
          <div className="bg-[#151729] p-5 rounded-xl border border-[#1E2035] shadow-sm flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8FA8] font-bold mb-2">ARPU</p>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold font-mono text-white">${adminStats.arpu}</h3>
              <span className="text-xs font-bold text-[#1D9E75] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />+${adminStats.arpuChange}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 2: Primary Graphics */}
        <div className="grid grid-cols-1 space-y-4 lg:space-y-0 lg:grid-cols-12 gap-6">
          
          {/* User Growth Line Chart */}
          <div className="lg:col-span-7 bg-[#151729] p-6 rounded-2xl border border-[#1E2035] shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">User growth</h4>
                <p className="text-xs text-[#8B8FA8] mt-0.5">Last 10 updates mapped</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B3FD4]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8FA8]">Total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#7B61FF] border-t border-dashed border-[#7B61FF]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8FA8]">Active</span>
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5B3FD4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#5B3FD4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E2035" />
                  <XAxis dataKey="month" stroke="#8B8FA8" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#8B8FA8'}} dy={10} />
                  <YAxis stroke="#8B8FA8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1d1f2b', borderColor: '#323440', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#e1e1f2', fontWeight: 600 }}
                    labelStyle={{ color: '#8B8FA8', fontWeight: 700, marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#5B3FD4" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Total Users" />
                  <Area type="monotone" dataKey="active" stroke="#7B61FF" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Active Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="lg:col-span-5 bg-[#151729] p-6 rounded-2xl border border-[#1E2035] shadow-md flex flex-col">
            <h4 className="text-sm font-bold text-white tracking-wide mb-2">Revenue breakdown</h4>
            <div className="flex-1 flex flex-col md:flex-row items-center gap-8 justify-center min-h-[250px]">
              
              <div className="relative w-44 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text manually */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-widest">MRR</span>
                  <span className="text-xl font-mono font-extrabold text-white mt-0.5">$18.4k</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-[180px]">
                {revenueData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="text-xs font-medium text-[#e1e1f2]">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">{item.value}%</span>
                  </div>
                ))}
                {/* Visual Free row */}
                <div className="flex items-center justify-between opacity-50 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#323440]"></span>
                    <span className="text-xs font-medium text-[#e1e1f2]">Free</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">0%</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* ROW 3: Secondary Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
          
          {/* New Signups List */}
          <div className="bg-[#151729] p-6 rounded-2xl border border-[#1E2035] shadow-sm flex flex-col">
            <h4 className="text-sm font-bold text-white mb-6">New signups today</h4>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {mockSignups.map((user, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-[#1d1f2b] p-2 -mx-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#323440] flex items-center justify-center text-xs font-bold text-white border border-[#484554]/30 shadow-inner">
                      {user.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user.name}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${user.planBg} ${user.planColor} font-bold uppercase tracking-widest mt-0.5 inline-block`}>
                        {user.plan}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8B8FA8] font-medium">{user.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Connections */}
          <div className="bg-[#151729] p-6 rounded-2xl border border-[#1E2035] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-bold text-white">Platform connections</h4>
              <button className="text-[#8B8FA8] hover:text-white transition-colors" title="View details">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-7">
              {/* Instagram */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#e1e1f2]">
                  <span>Instagram</span>
                  <span className="font-mono text-[#8B8FA8]">77%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1d1f2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B3FD4] animate-in slide-in-from-left duration-1000 w-[77%]"></div>
                </div>
              </div>
              {/* Telegram */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#e1e1f2]">
                  <span>Telegram</span>
                  <span className="font-mono text-[#8B8FA8]">51%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1d1f2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7B61FF] animate-in slide-in-from-left duration-1000 w-[51%] delay-100"></div>
                </div>
              </div>
              {/* YouTube */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#e1e1f2]">
                  <span>YouTube</span>
                  <span className="font-mono text-[#8B8FA8]">31%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1d1f2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1D9E75] animate-in slide-in-from-left duration-1000 w-[31%] delay-200"></div>
                </div>
              </div>
              {/* TikTok */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#e1e1f2]">
                  <span>TikTok</span>
                  <span className="font-mono text-[#8B8FA8]">16%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1d1f2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#EF9F27] animate-in slide-in-from-left duration-1000 w-[16%] delay-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className="bg-[#151729] p-6 rounded-2xl border border-[#1E2035] shadow-sm">
            <h4 className="text-sm font-bold text-white mb-5">System health</h4>
            
            <div className="mb-6 py-2.5 px-3 bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-xl flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D9E75] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1D9E75]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-widest">All systems operational</span>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span className="text-xs font-semibold text-[#e1e1f2]">Core API</span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8FA8]">99.98% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span className="text-xs font-semibold text-[#e1e1f2]">Database Cluster</span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8FA8]">12ms latency</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span className="text-xs font-semibold text-[#e1e1f2]">AI Engine v2</span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8FA8]">1.2s avg response</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span className="text-xs font-semibold text-[#e1e1f2]">Task Scheduler</span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8FA8]">0 failed jobs</span>
              </div>
              <div className="flex items-center justify-between p-2 -mx-2 bg-[#EF9F27]/5 rounded-lg border border-[#EF9F27]/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF9F27] ml-1"></span>
                  <span className="text-xs font-semibold text-[#e1e1f2]">Stripe Gateway</span>
                </div>
                <span className="text-[10px] font-mono font-medium text-[#EF9F27]">2 retries (lag)</span>
              </div>
            </div>
            <p className="text-[10px] text-[#8B8FA8] text-center mt-6 uppercase tracking-wider">Last incident: 14 days ago</p>
          </div>

        </div>

      </div>
    </div>
  );
}
