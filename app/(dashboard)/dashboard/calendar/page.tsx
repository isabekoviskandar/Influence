"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Instagram, Youtube, Send, MoreVertical, Filter } from "lucide-react";

const PLATFORMS = {
  instagram: { icon: Instagram, color: "bg-pink-500/10 text-pink-500", border: "border-pink-500/30" },
  telegram: { icon: Send, color: "bg-blue-400/10 text-blue-400", border: "border-blue-400/30" },
  youtube: { icon: Youtube, color: "bg-red-500/10 text-red-500", border: "border-red-500/30" },
};

const MOCK_EVENTS = [
  { id: 1, day: 12, title: "Tech Review Reel", platform: "instagram", status: "scheduled", time: "10:00 AM" },
  { id: 2, day: 14, title: "Morning Routine V2", platform: "youtube", status: "draft", time: "02:00 PM" },
  { id: 3, day: 14, title: "Ad Campaign Post", platform: "instagram", status: "published", time: "06:00 PM" },
  { id: 4, day: 15, title: "Niche Strategy Tips", platform: "telegram", status: "scheduled", time: "11:30 AM" },
  { id: 5, day: 18, title: "Studio Setup BTS", platform: "instagram", status: "draft", time: "04:15 PM" },
  { id: 6, day: 22, title: "Weekly Insights Live", platform: "youtube", status: "scheduled", time: "08:00 PM" },
];

export default function ContentCalendar() {
  const [currentMonth, setCurrentMonth] = useState("OCTOBER 2024");
  const [view, setView] = useState<"month" | "week">("month");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500">
      
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#191b26] p-6 rounded-3xl border border-[#1E2035]">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">{currentMonth}</h2>
          <div className="flex bg-[#0c0e18] p-1 rounded-xl">
            <button 
              onClick={() => setView("month")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === "month" ? "bg-[#323440] text-white shadow-lg" : "text-[#8B8FA8] hover:text-white"}`}
            >
              Month
            </button>
            <button 
              onClick={() => setView("week")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === "week" ? "bg-[#323440] text-white shadow-lg" : "text-[#8B8FA8] hover:text-white"}`}
            >
              Week
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0c0e18] rounded-xl border border-[#1E2035]">
            <button className="p-2 hover:bg-[#1E2035] transition-colors rounded-l-xl border-r border-[#1E2035]"><ChevronLeft size={18} /></button>
            <button className="p-2 hover:bg-[#1E2035] transition-colors rounded-r-xl"><ChevronRight size={18} /></button>
          </div>
          <button className="flex items-center gap-2 bg-[#5B3FD4] hover:bg-[#4720ca] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#5B3FD4]/20">
            <Plus size={18} /> Schedule Post
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#191b26] rounded-3xl border border-[#1E2035] overflow-hidden flex flex-col flex-1 min-h-[600px]">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-[#1E2035]">
          {weekDays.map(day => (
            <div key={day} className="py-4 text-center text-[10px] font-bold text-[#8B8FA8] tracking-widest uppercase">{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 flex-1">
          {daysInMonth.map((day) => {
            const dayEvents = MOCK_EVENTS.filter(e => e.day === day);
            const isToday = day === 24; // Mock today

            return (
              <div 
                key={day} 
                className={`min-h-[120px] p-2 border-r border-b border-[#1E2035] hover:bg-[#1d1f2b]/50 transition-colors group cursor-pointer ${isToday ? "bg-[#5B3FD4]/5" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-colors ${isToday ? "bg-[#5B3FD4] text-white" : "text-[#8B8FA8] group-hover:text-white"}`}>
                    {day}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 p-1 text-[#8B8FA8] hover:text-white transition-all"><Plus size={14} /></button>
                </div>

                <div className="space-y-1">
                  {dayEvents.map(event => {
                    const PlatformIcon = PLATFORMS[event.platform as keyof typeof PLATFORMS].icon;
                    return (
                      <div 
                        key={event.id}
                        className={`p-1.5 rounded-lg border flex items-center gap-2 transition-all hover:scale-[1.02] ${PLATFORMS[event.platform as keyof typeof PLATFORMS].color} ${PLATFORMS[event.platform as keyof typeof PLATFORMS].border}`}
                      >
                        <PlatformIcon size={12} className="shrink-0" />
                        <span className="text-[10px] font-bold truncate leading-none">{event.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* Fill remaining cells */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] border-r border-b border-[#1E2035] bg-[#0c0e18]/20"></div>
          ))}
        </div>
      </div>

      {/* Legend & Stats */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-[#191b26] rounded-3xl border border-[#1E2035]">
        <div className="flex items-center gap-6">
          <h4 className="text-xs font-bold text-[#8B8FA8] uppercase tracking-widest">Post Platforms</h4>
          <div className="flex items-center gap-4">
            {Object.entries(PLATFORMS).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${value.color.split(' ')[1]}`}></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{key}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#8B8FA8] uppercase mb-1">Total Scheduled</span>
            <span className="text-lg font-bold text-white">24</span>
          </div>
          <div className="w-px h-8 bg-[#1E2035]"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#8B8FA8] uppercase mb-1">This Week Hits</span>
            <span className="text-lg font-bold text-emerald-400">12</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
