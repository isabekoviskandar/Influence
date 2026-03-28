"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Camera, Send, BrainCircuit, Handshake, 
  Settings as SettingsIcon, UserCircle, Menu, X, Mail, Calendar as CalendarIcon, Sparkles, Image as ImageIcon 
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/dashboard/analytics", icon: Camera, label: "Analytics" },
    { href: "/dashboard/messages", icon: Mail, label: "Inbox" },
    { href: "/dashboard/calendar", icon: CalendarIcon, label: "Calendar" },
    { href: "/dashboard/ai-studio", icon: BrainCircuit, label: "AI Studio" },
    { href: "/dashboard/ai/captions", icon: Sparkles, label: "AI Captions" },
    { href: "/dashboard/ai/thumbnails", icon: ImageIcon, label: "AI Thumbnails" },
    { href: "/dashboard/scheduler", icon: Send, label: "Scheduler" },
    { href: "/dashboard/brand-deals", icon: Handshake, label: "Brand Deals" },
    { href: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary-container text-white rounded-full shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-[220px] z-50 bg-[#191b26] flex flex-col py-6 gap-4 font-['Inter'] antialiased tracking-tight shadow-[40px_0_60px_-15px_rgba(91,63,212,0.05)] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 mb-8">
          <h1 className="text-xl font-bold text-[#e1e1f2] tracking-tighter">Influence.uz</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#c9c4d7] font-semibold">Creator Pro</p>
        </div>

        <div className="flex-1 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-[#e1e1f2] font-semibold bg-[#323440]"
                    : "text-[#c9c4d7] hover:text-[#e1e1f2] hover:bg-[#1d1f2b]"
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto px-4 pt-4 border-t border-[#484554]/10">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1d1f2b] transition-colors group cursor-pointer">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Alex Creator" 
                className="w-10 h-10 rounded-full object-cover border-2 border-[#5b3fd4]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGta3HB0324iyCxXh5o06RUEdbTIUbSUq0LN2mYBC3YhlvBEkS3VFonp1VRWCyQpY7Nal0lIMw4dFoQ8CxiOVIcPffECjNCUktP4HxzXdZHpksnaxw4Rf61obc-8CoQfyv7PHoAZVOPHgc33EHpTq8IerKtBT2chKROdhWvluWWJw0wkCMrySeigR_mYBAlQ_A0Ikzmzsl--7l9nSb2ZWDVMnF1e2LQrNy3k2DOI3WLwrpWxI8SuGJt9JVqzoNatFQzSVFQOaWJbU5"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#191b26] rounded-full"></span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-[#e1e1f2] truncate">Alex Creator</p>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#5b3fd4] text-[#d7ceff] uppercase">Pro</span>
            </div>
            <UserCircle className="text-[#938ea0] group-hover:text-[#e1e1f2] transition-colors" size={24} />
          </div>
        </div>
      </nav>
    </>
  );
}
