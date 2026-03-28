"use client";

import { usePlatformStore } from "@/store/usePlatformStore";
import AreaChart from "@/components/charts/AreaChart";
import DonutChart from "@/components/charts/DonutChart";
import HeatmapChart from "@/components/charts/HeatmapChart";
import TopPostsTable, { PostData } from "@/components/analytics/TopPostsTable";
import { Download } from "lucide-react";

const mockAnalytics = {
  metrics: [
    { label: 'Total Views', value: '1.2M', change: '+18%', positive: true },
    { label: 'New Followers', value: '14.5k', change: '+12%', positive: true },
    { label: 'Engagement Rate', value: '4.8%', change: '+0.3%', positive: true },
    { label: 'Reach', value: '890k', change: '+5%', positive: true },
    { label: 'Profile Visits', value: '23.4k', change: '+8%', positive: true },
    { label: 'Link Clicks', value: '3.2k', change: '-2%', positive: false },
  ],
  viewsOverTime: Array.from({length: 30}, (_, i) => ({
    date: `Oct ${i+1}`, views: Math.floor(Math.random() * 50000 + 20000)
  })),
  contentBreakdown: [
    { name: 'Reels', value: 58, color: '#5B3FD4' },
    { name: 'Carousels', value: 27, color: '#8e74ff' },
    { name: 'Static', value: 15, color: '#484554' },
  ],
  topLocations: [
    { country: '🇺🇸 USA', value: 42, flag: '🇺🇸' },
    { country: '🇺🇿 Uzbekistan', value: 18, flag: '🇺🇿' },
    { country: '🇬🇧 UK', value: 12, flag: '🇬🇧' },
    { country: '🇩🇪 Germany', value: 8, flag: '🇩🇪' },
  ],
  ageGender: [
    { age: '18-24', male: 65, female: 35, total: 38 },
    { age: '25-34', male: 45, female: 55, total: 42 },
    { age: '35-44', male: 40, female: 60, total: 15 },
  ],
  heatmap: [
    [10,20,15,30,25,20,15], // 6AM
    [20,35,30,40,35,30,20], // 9AM
    [30,45,40,55,50,40,30], // 12PM
    [25,40,35,50,45,35,25], // 3PM
    [40,40,75,85,70,50,35], // 6PM  
    [35,90,85,95,80,45,30], // 9PM  ← peak
  ],
  topPosts: [
    { id:1, title:'Autumn Collection Launch', date:'Oct 24, 2023', views:'842.1k', likes:'18k', comments:'1.2k', engRate:'6.8%', reach:'310k' },
    { id:2, title:'BTS: Studio Session Day 4', date:'Oct 21, 2023', views:'612.4k', likes:'12k', comments:'890', engRate:'5.2%', reach:'240k' },
    { id:3, title:'Neon Nights Photography', date:'Oct 18, 2023', views:'450.9k', likes:'9.4k', comments:'650', engRate:'4.1%', reach:'195k' },
    { id:4, title:'Zero to 10k followers strategy', date:'Oct 10, 2023', views:'98k', likes:'7.1k', comments:'420', engRate:'7.6%', reach:'130k' },
    { id:5, title:'Behind the scenes of my studio', date:'Oct 5, 2023', views:'76k', likes:'5.8k', comments:'310', engRate:'7.9%', reach:'98k' },
  ] as PostData[]
};

export default function AnalyticsIntelligence() {
  const { selectedPlatform, setSelectedPlatform } = usePlatformStore();
  const platforms: Array<"instagram" | "telegram" | "youtube"> = ["instagram", "telegram", "youtube"];

  // TODO: replace with useQuery(() => api.get('/analytics'))
  // const { data, isLoading } = useQuery(...)

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      
      {/* Top Header section replicating the specific Analytics HTML header */}
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold text-[#e1e1f2] font-headline tracking-tight">Analytics</h1>
          <nav className="flex items-center gap-8 mt-1">
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
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-[#5b3fd4] hover:bg-[#4623bf] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-[#5b3fd4]/10 active:scale-[0.98] flex items-center gap-2">
            <Download size={16} />
            Export report
          </button>
        </div>
      </div>

      {/* Row 1: Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockAnalytics.metrics.map((metric, i) => (
          <div key={i} className={`bg-[#1d1f2b] rounded-xl p-4 relative overflow-hidden flex flex-col justify-between ${metric.label === 'Link Clicks' ? 'border-b-2 border-[#ffb4ab]/10' : ''}`}>
             <div>
               <span className="text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest">{metric.label}</span>
               <div className="flex items-baseline gap-2 mt-1">
                 <span className="text-2xl font-bold text-[#e1e1f2]">{metric.value}</span>
                 <span className={`text-[10px] font-bold ${metric.positive ? 'text-[#4caf50]' : 'text-[#ffb4ab]'}`}>{metric.change}</span>
               </div>
             </div>
             {/* Simple visual spark indicator representation */}
             <div className={`h-1 rounded-full mt-4 overflow-hidden ${metric.positive ? 'bg-[#484554]/10' : 'bg-[#ffb4ab]/10'}`}>
                <div 
                  className={`h-full ${metric.positive ? 'bg-gradient-to-r from-transparent via-[#5b3fd4] to-transparent' : 'bg-[#ffb4ab]'}`} 
                  style={{ width: `${Math.max(20, 100 - i * 15)}%` }}
                ></div>
             </div>
          </div>
        ))}
      </div>

      {/* Row 2: Performance & Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Performance Area Chart */}
        <div className="lg:col-span-8 bg-[#1d1f2b] rounded-2xl p-6 border border-[#484554]/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#e1e1f2]">Performance over time</h3>
              <p className="text-xs text-[#c9c4d7]">Daily aggregate of organic engagement on {selectedPlatform}</p>
            </div>
            <div className="flex bg-[#191b26] p-1 rounded-lg self-start sm:self-auto">
               <button className="px-4 py-1.5 text-xs font-bold bg-[#272935] rounded-md text-[#e1e1f2] shadow-sm">Views</button>
               <button className="px-4 py-1.5 text-xs font-bold text-[#c9c4d7] hover:text-[#e1e1f2]">Reach</button>
               <button className="px-4 py-1.5 text-xs font-bold text-[#c9c4d7] hover:text-[#e1e1f2]">Engagement</button>
            </div>
          </div>
          <AreaChart data={mockAnalytics.viewsOverTime} height={250} />
        </div>

        {/* Right: Content Breakdown Donut */}
        <div className="lg:col-span-4 bg-[#1d1f2b] rounded-2xl p-6 border border-[#484554]/5">
          <h3 className="text-lg font-bold text-[#e1e1f2] mb-2">Content breakdown</h3>
          <p className="text-xs text-[#c9c4d7] mb-8">Performance by media type</p>
          <DonutChart data={mockAnalytics.contentBreakdown} height={192} />
        </div>
      </div>

      {/* Row 3: Demographics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Age & Gender */}
        <div className="bg-[#1d1f2b] rounded-2xl p-6 border border-[#484554]/5">
          <h3 className="text-lg font-bold text-[#e1e1f2] mb-6">Age & gender</h3>
          <div className="space-y-6">
            {mockAnalytics.ageGender.map((demo) => (
              <div key={demo.age} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-[#c9c4d7] uppercase">
                   <span>{demo.age}</span>
                   <span>{demo.total}%</span>
                </div>
                <div className="h-2 flex rounded-full overflow-hidden bg-[#484554]/10">
                   <div className="h-full bg-[#5b3fd4]" style={{ width: `${demo.male}%` }}></div>
                   <div className="h-full bg-[#8e74ff]" style={{ width: `${demo.female}%` }}></div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center gap-6 pt-4 mt-auto">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#5b3fd4]"></div>
                 <span className="text-[10px] font-bold text-[#c9c4d7] uppercase">Male</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#8e74ff]"></div>
                 <span className="text-[10px] font-bold text-[#c9c4d7] uppercase">Female</span>
               </div>
            </div>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-[#1d1f2b] rounded-2xl p-6 border border-[#484554]/5">
           <h3 className="text-lg font-bold text-[#e1e1f2] mb-6">Top locations</h3>
           <div className="space-y-5">
              {mockAnalytics.topLocations.map((loc) => (
                <div key={loc.country} className="flex items-center gap-4">
                  <span className="text-lg">{loc.flag}</span>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#e1e1f2]">{loc.country.replace(/[^a-zA-Z\s]/g, '').trim()}</span>
                      <span className="text-xs font-bold text-[#e1e1f2]">{loc.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#484554]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5b3fd4]" style={{ width: `${loc.value}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Heatmap */}
        <div className="bg-[#1d1f2b] rounded-2xl p-6 border border-[#484554]/5 flex flex-col justify-between">
           <h3 className="text-lg font-bold text-[#e1e1f2] mb-6">Active hours heatmap</h3>
           <HeatmapChart data={mockAnalytics.heatmap} />
        </div>
      </div>

      {/* Row 4: Top Performing Posts Table */}
      <TopPostsTable posts={mockAnalytics.topPosts} />

    </div>
  );
}
