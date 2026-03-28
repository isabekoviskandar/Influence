"use client";

import { usePlatformStore } from "@/store/usePlatformStore";
import MetricCard from "@/components/dashboard/MetricCard";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { TrendingUp as TrendingUpIcon, MoreVertical as MoreVerticalIcon, Eye, Heart, Sparkles, Lightbulb as LightbulbIcon } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mock Data
const viewsData = [
  { date: "01 Oct", views: 4000 },
  { date: "08 Oct", views: 3000 },
  { date: "15 Oct", views: 6000 },
  { date: "22 Oct", views: 2780 },
  { date: "30 Oct", views: 8000 },
];

export default function DashboardOverview() {
  const { selectedPlatform } = usePlatformStore();

  // TODO: replace with useQuery(() => api.get('/analytics'))
  // const { data, isLoading } = useQuery(...)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Views" 
          value="1.2M" 
          trendIndicator={
            <div className="flex items-center text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-lg">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              +12%
            </div>
          } 
        />
        
        <MetricCard 
          title="New Followers" 
          value="14.5k" 
          trendIndicator={
            <div className="w-16 h-8 opacity-50">
              <svg className="w-full h-full stroke-[#c9bfff] fill-none stroke-2" viewBox="0 0 100 40">
                <path d="M0 35 Q 25 35 30 15 T 60 25 T 100 5" strokeLinecap="round" />
              </svg>
            </div>
          } 
        />
        
        <MetricCard 
          title="Engagement Rate" 
          value="4.8%" 
          trendIndicator={
            <div className="px-2 py-1 rounded-lg bg-[#5b3fd4]/20 text-[#e5deff] text-[10px] font-bold uppercase tracking-wider">
              Good
            </div>
          } 
        />
        
        <MetricCard 
          title="Reach" 
          value="890k" 
          trendIndicator={
            <div className="text-[#c9c4d7] text-xs font-medium">
              <span className="text-[#c9bfff]">+5%</span> vs last month
            </div>
          } 
        />
      </div>

      {/* Row 2: Chart & List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Line Chart */}
        <div className="lg:col-span-7 bg-[#1d1f2b] p-8 rounded-3xl relative overflow-hidden group border border-[#484554]/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-xl font-bold text-[#e1e1f2]">Views over time</h4>
              <p className="text-sm text-[#c9c4d7]">Performance trend for the last 30 days ({selectedPlatform})</p>
            </div>
            <button className="text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">
              <MoreVerticalIcon size={20} />
            </button>
          </div>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b3fd4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#5b3fd4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#191b26", borderColor: "#484554", borderRadius: "8px", color: "#e1e1f2" }}
                  itemStyle={{ color: "#c9bfff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#c9bfff" 
                  strokeWidth={3}
                  fill="url(#chartGradient)" 
                  activeDot={{ r: 6, fill: "#c9bfff", stroke: "#11131e", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-[#c9c4d7]/50 pt-4 uppercase font-bold tracking-widest">
              <span>01 Oct</span>
              <span>08 Oct</span>
              <span>15 Oct</span>
              <span>22 Oct</span>
              <span>30 Oct</span>
            </div>
          </div>
        </div>
        
        {/* Right: Top Performing Posts */}
        <div className="lg:col-span-5 bg-[#191b26] p-8 rounded-3xl border border-[#484554]/5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-[#e1e1f2]">Top performing posts</h4>
            <a href="#" className="text-xs font-bold text-[#c9bfff] hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            
            {/* Post 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#1d1f2b] hover:bg-[#272935] transition-all cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-16 h-16 rounded-xl object-cover" alt="Thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZ-mzxeqe15HpO1gqwKni76kEOw56LWeA2UcxpPn2058D9Ihow6x_R0lkoj6IbgY-XoXGa-hRFBrvDk-GY8X6TdjaihCDa05aUSwwMjNTUwR3FkAS3cUNGEw1Y6Q2-Zqn-WYrQEdhfTNglieHyCU89M7hrNTtOEDd9Vc3WkKM4z0Z0XJy_qgnW795cECXFa1gsAYaHVscdoPc-PRInExeCO9GvQEk3myseWN8n8A52xSw9KoLjp8UwYFI3gP9a4DKRkyMMs-4LyoE" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#e1e1f2] line-clamp-1">Mastering the Creator Economy...</p>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Eye size={14} />
                    <span className="text-xs font-medium">250k</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Heart size={14} />
                    <span className="text-xs font-medium">18k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 2 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#1d1f2b] hover:bg-[#272935] transition-all cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-16 h-16 rounded-xl object-cover" alt="Thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz00Xymc-xCTAwqaa8VxcgscdDt-nz-l8DKRC7LD8ts60T5QK7aEb6hFvoSjLG3ZEIQfxupqJU5PLI0TT4PSkOggiQYbcQPZiM6TKBgEkSfFAAz3sWNSxlXkwxybj6tknF2ZIGBWZPvjpB8nlyOL86TVxFrAgl9NpHLTGxItVgNp2zROxx9N6zBemMrhqEY5a_JuXt5u28G5dXxXdE5DWuC6rZa-vTaDglCcnk9o7Dy9DuLMsClRt2FcztHnFvpMe4jKOhOl8YtJaE" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#e1e1f2] line-clamp-1">My Morning Routine (Uncut)</p>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Eye size={14} />
                    <span className="text-xs font-medium">185k</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Heart size={14} />
                    <span className="text-xs font-medium">12k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#1d1f2b] hover:bg-[#272935] transition-all cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-16 h-16 rounded-xl object-cover" alt="Thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfCyiGb8iQl5lcVJUhObgRB-atM9RT0T3CajO2TYkLu-Z-WWnSRr-QbY6wzSXrsPLpzBXogQnd_4xGeiozV9wtDNRgUqCLQ7af1p8s-h3o25E3Vnexdr7j_RioXBSaMcDhP-DpYREhQhICsNVwNi30LT5bzTfVxx4V_mNnGeLmL2lMG_jFwD_jsc8fKVm8hcpWIc7kk3WRdH-IxCnRYRPqFJcKH4HlQ-B89JlQxcudm1ayJe2CkLf8axAbRtVlvsNhBBzWCFHtENX5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#e1e1f2] line-clamp-1">How I edited my latest viral video</p>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Eye size={14} />
                    <span className="text-xs font-medium">142k</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#c9c4d7]">
                    <Heart size={14} />
                    <span className="text-xs font-medium">9.4k</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Row 3: Audience Map & AI Rec */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: World Map */}
        <div className="bg-[#191b26] p-8 rounded-3xl border border-[#484554]/5">
          <h4 className="text-xl font-bold text-[#e1e1f2] mb-6">Where your audience is</h4>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1d1f2b] mb-6">
            {/* React Simple Maps Implementation */}
            <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: "100%", height: "100%" }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill="#323440" 
                      stroke="#191b26"
                      strokeWidth={0.5} 
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#484554", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {/* Hotspots */}
              <Marker coordinates={[-95.7129, 37.0902]}>
                <circle r={8} fill="#5b3fd4" opacity={0.3} className="animate-pulse" />
                <circle r={4} fill="#5b3fd4" />
              </Marker>
              <Marker coordinates={[-3.4360, 55.3781]}>
                <circle r={8} fill="#c9bfff" opacity={0.3} className="animate-pulse" />
                <circle r={4} fill="#c9bfff" />
              </Marker>
              <Marker coordinates={[10.4515, 51.1657]}>
                <circle r={6} fill="#baaeff" opacity={0.3} className="animate-pulse" />
                <circle r={3} fill="#baaeff" />
              </Marker>
            </ComposableMap>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#c9bfff]"></div>
              <span className="text-sm font-medium text-[#e1e1f2]">USA (42%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#5b3fd4]"></div>
              <span className="text-sm font-medium text-[#e1e1f2]">UK (18%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#baaeff]"></div>
              <span className="text-sm font-medium text-[#e1e1f2]">Germany (12%)</span>
            </div>
          </div>
        </div>

        {/* Right: AI Recommendation */}
        <div className="bg-gradient-to-br from-[#5b3fd4]/10 to-[#baaeff]/5 backdrop-blur-[20px] p-8 rounded-3xl border border-[#5b3fd4]/30 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#5b3fd4] flex items-center justify-center mb-6 shadow-lg shadow-[#5b3fd4]/40">
              <LightbulbIcon className="text-[#d7ceff]" size={24} />
            </div>
            <h4 className="text-2xl font-bold text-[#e1e1f2] mb-4">AI recommendation</h4>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[#e1e1f2] leading-relaxed italic">
                  &quot;Your audience is most active <span className="text-[#e5deff] font-bold">Tuesday–Thursday 7–9PM</span>.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#c9bfff]" size={20} />
                <p className="text-[#c9c4d7] font-medium">Next post suggestion: <span className="text-[#e1e1f2] font-bold">Wednesday 8PM</span></p>
              </div>
            </div>
            <button className="mt-8 w-full py-4 rounded-2xl bg-[#5b3fd4] hover:bg-[#4720ca] transition-all text-[#d7ceff] font-bold text-sm tracking-wide shadow-xl shadow-[#5b3fd4]/20 active:scale-[0.98]">
              Schedule Next Post
            </button>
          </div>
          {/* Abstract Background Light */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#5b3fd4]/20 blur-[60px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
