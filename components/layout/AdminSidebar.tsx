"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, BarChart2, ScrollText, Settings as SettingsIcon, ShieldAlert, HeartPulse, BrainCircuit } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin", matchExact: true },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Billing", icon: CreditCard, href: "/admin/billing" },
    { name: "Platform Analytics", icon: BarChart2, href: "/admin/platform-analytics" },
    { name: "Activity Logs", icon: ScrollText, href: "/admin/logs" },
    { name: "AI Usage", icon: BrainCircuit, href: "/admin/ai" },
    { name: "System Health", icon: HeartPulse, href: "/admin/health" },
    { name: "Settings", icon: SettingsIcon, href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#0A0C14] border-r border-[#1E2035] flex flex-col py-6 px-4 z-50">
      
      {/* Brand Header */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 text-[#E24B4A] font-bold tracking-widest uppercase text-[10px] bg-[#E24B4A]/10 px-2 py-0.5 rounded w-fit mb-1 border border-[#E24B4A]/20">
          <ShieldAlert className="w-3 h-3" />
          ADMIN CORE
        </div>
        <h1 className="font-bold text-[#e1e1f2] tracking-tighter text-xl mt-1">
          influence.uz
        </h1>
      </div>

      {/* Navigation mapping */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = item.matchExact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "text-[#e1e1f2] bg-[#5B3FD4]/20 font-semibold border-l-2 border-[#5B3FD4]" 
                  : "text-[#c9c4d7] hover:text-[#e1e1f2] hover:bg-[#1d1f2b] border-l-2 border-transparent active:scale-[0.98]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Admin Profile Block */}
      <div className="mt-auto pt-4 border-t border-[#1E2035]">
        <div className="flex items-center gap-3 px-3 py-2 bg-[#191b26] rounded-xl hover:bg-[#272935] cursor-pointer transition-colors group border border-transparent hover:border-[#1E2035]">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[#5B3FD4] flex-shrink-0 flex items-center justify-center font-bold text-white shadow-inner">
            SA
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#e1e1f2] truncate leading-tight">Azamat Sultan</span>
            <span className="text-[10px] uppercase font-bold text-[#5B3FD4] tracking-widest leading-none mt-1">Super Admin</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
