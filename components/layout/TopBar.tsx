"use client";

import { usePlatformStore } from "@/store/usePlatformStore";
import { Bell, CalendarRange } from "lucide-react";

export default function TopBar() {
  const { selectedPlatform, setSelectedPlatform } = usePlatformStore();

  const platforms: Array<"instagram" | "telegram" | "youtube"> = ["instagram", "telegram", "youtube"];

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-220px)] z-40 bg-[#11131e]/80 backdrop-blur-xl h-20 px-4 lg:px-8 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-8 pl-12 lg:pl-0">
        <h2 className="text-2xl font-semibold text-[#e1e1f2] tracking-tight hidden sm:block">Overview</h2>
        
        <nav className="flex gap-4 lg:gap-6 items-center h-full pt-1">
          {platforms.map((platform) => {
            const isActive = selectedPlatform === platform;
            return (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`text-sm font-medium pb-2 transition-colors capitalize ${
                  isActive 
                    ? "text-[#5b3fd4] border-b-2 border-[#5b3fd4]" 
                    : "text-[#c9c4d7] hover:text-[#e1e1f2] border-b-2 border-transparent"
                }`}
              >
                {platform}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1d1f2b] hover:bg-[#272935] transition-colors text-[#e1e1f2] text-sm font-medium border border-[#484554]/10">
          <CalendarRange size={16} />
          <span>Last 30 days</span>
        </button>
        
        <button className="p-2.5 rounded-xl bg-[#1d1f2b] hover:bg-[#272935] transition-colors relative text-[#c9c4d7] hover:text-[#e1e1f2]">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ffb4ab] rounded-full ring-2 ring-[#11131e]"></span>
        </button>
      </div>
    </header>
  );
}
