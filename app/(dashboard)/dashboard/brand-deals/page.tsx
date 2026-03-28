"use client";

import { useState } from "react";
import { Search, ChevronDown, CheckCircle2, Bookmark, Camera, Video, Send, TrendingUp } from "lucide-react";

type DealStatus = 'open' | 'applied' | 'completed';
type Platform = 'instagram' | 'youtube' | 'telegram' | 'tiktok';

interface MockDeal {
  id: number;
  brand: string;
  logo: string;
  title: string;
  desc: string;
  tags: string[];
  payoutMin: number;
  payoutMax: number;
  platforms: Platform[];
  matchScore: number;
  status: DealStatus;
}

const mockDeals: MockDeal[] = [
  { id:1, brand:'TechFlow UZ', logo:'TF', title:'Tech Product Review Campaign', desc:'Looking for tech creators to review our new laptop stand and productivity accessories.', tags:['#tech','#ugc','#review'], payoutMin:150, payoutMax:300, platforms:['instagram','youtube'], matchScore:94, status:'open' },
  { id:2, brand:'Natura Beauty', logo:'NB', title:'Skincare Morning Routine Feature', desc:'Feature our vitamin C serum in your morning routine content. Authentic lifestyle integration preferred.', tags:['#beauty','#lifestyle','#ugc'], payoutMin:200, payoutMax:400, platforms:['instagram'], matchScore:87, status:'open' },
  { id:3, brand:'FitLife App', logo:'FL', title:'Fitness App 30-Day Challenge', desc:'Document your 30-day journey using FitLife app. Weekly check-in posts required.', tags:['#fitness','#app','#challenge'], payoutMin:300, payoutMax:600, platforms:['instagram','tiktok'], matchScore:79, status:'open' },
  { id:4, brand:'BookHouse', logo:'BH', title:'Reading Habit Content Series', desc:'Create 3-part series about building a reading habit using our app for book tracking.', tags:['#books','#education','#ugc'], payoutMin:100, payoutMax:250, platforms:['instagram','telegram'], matchScore:72, status:'open' },
  { id:5, brand:'GlowUp Cosmetics', logo:'GU', title:'Summer Essentials Drop', desc:'Our summer catalog is out! Need high-energy unboxing and quick-cut transition reels.', tags:['#beauty','#summer','#unboxing'], payoutMin:250, payoutMax:500, platforms:['instagram','tiktok'], matchScore:91, status:'applied' },
  { id:6, brand:'Urban Wear', logo:'UW', title:'Street Style Lookbook', desc:'Showcase our latest streetwear drop in your unique style.', tags:['#fashion','#streetwear','#lookbook'], payoutMin:400, payoutMax:800, platforms:['instagram'], matchScore:85, status:'completed' },
];

const myStats = { 
  earnings: '$1,240', 
  activeDeals: 2, 
  avgPayout: '$285', 
  totalApplied: 8 
};

export default function BrandDealsPage() {
  const [filter, setFilter] = useState<'all'|'open'|'applied'|'completed'>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'best-match'|'highest-payout'|'newest'>('best-match');

  // Filter and sort Deals
  const filteredDeals = mockDeals
    .filter(deal => filter === 'all' || deal.status === filter)
    .filter(deal => 
      deal.title.toLowerCase().includes(search.toLowerCase()) || 
      deal.brand.toLowerCase().includes(search.toLowerCase()) ||
      deal.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'best-match') return b.matchScore - a.matchScore;
      if (sort === 'highest-payout') return b.payoutMax - a.payoutMax;
      return 0; // newest placeholder
    });

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram': return <Camera size={14} className="text-[#8B8FA8] group-hover/icon:text-[#e1e1f2]" />;
      case 'youtube': return <Video size={14} className="text-[#8B8FA8] group-hover/icon:text-[#e1e1f2]" />;
      case 'telegram': return <Send size={14} className="text-[#8B8FA8] group-hover/icon:text-[#e1e1f2]" />;
      case 'tiktok': return <Video size={14} className="text-[#8B8FA8] group-hover/icon:text-[#e1e1f2]" />; // using video for tiktok mock
      default: return null;
    }
  };

  // Optional counts
  const counts = {
    all: mockDeals.length,
    open: mockDeals.filter(d => d.status === 'open').length,
    applied: mockDeals.filter(d => d.status === 'applied').length,
    completed: mockDeals.filter(d => d.status === 'completed').length,
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden animate-in fade-in duration-500 bg-[#0D0F1A]">
      
      {/* Top Header Block */}
      <div className="px-8 pt-8 pb-4 border-b border-[#1E2035] bg-[#11131e]/50 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#e1e1f2] tracking-tight">Brand Deals</h1>
            <p className="text-sm text-[#8B8FA8] mt-1">Find campaigns that match your audience.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4" />
              <input 
                type="text"
                placeholder="Search brands or tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-[#151729] border border-[#1E2035] rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 md:w-80 focus:ring-1 focus:ring-[#5b3fd4]/50 !outline-none text-[#e1e1f2] placeholder:text-[#8B8FA8]/60 transition-all"
              />
            </div>

            {/* Sort Select */}
            <div className="relative group">
              <select 
                value={sort}
                onChange={e => setSort(e.target.value as 'best-match'|'highest-payout'|'newest')}
                className="bg-[#151729] border border-[#1E2035] hover:border-[#5B3FD4]/30 rounded-xl pl-4 pr-10 py-2.5 text-sm text-[#e1e1f2] appearance-none focus:ring-1 focus:ring-[#5b3fd4]/50 !outline-none transition-all cursor-pointer"
              >
                <option value="best-match">Best match (AI)</option>
                <option value="highest-payout">Highest payout</option>
                <option value="newest">Newest first</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4 pointer-events-none group-hover:text-[#e1e1f2] transition-colors" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-8 mt-8">
          {(['all', 'open', 'applied', 'completed'] as const).map(tab => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-all capitalize
                  ${isActive ? 'border-[#5B3FD4] text-white' : 'border-transparent text-[#8B8FA8] hover:text-[#e1e1f2]'}
                `}
              >
                {tab} <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#5B3FD4]/20' : 'bg-[#151729]'}`}>{counts[tab]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 gap-6 px-8 py-6 min-h-0 overflow-hidden">
        
        {/* Left Side: Deals Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar min-w-0 pr-2 pb-10">
          {filteredDeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#151729] rounded-2xl border border-[#1E2035] border-dashed">
              <Search className="w-10 h-10 text-[#484554] mb-4" />
              <p className="text-[#e1e1f2] font-semibold text-sm">No deals found</p>
              <p className="text-[#8B8FA8] text-xs mt-1">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDeals.map(deal => (
                <div key={deal.id} className="bg-[#151729] border border-[#1E2035] rounded-xl p-5 hover:border-[#5B3FD4]/30 hover:shadow-[0_8px_30px_-15px_rgba(91,63,212,0.1)] transition-all flex flex-col group/card cursor-pointer">
                  
                  {/* Top Header: Brand + Avatar + Score */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5B3FD4]/10 text-[#7B61FF] font-bold flex flex-shrink-0 items-center justify-center text-sm border border-[#5B3FD4]/20">
                        {deal.logo}
                      </div>
                      <div>
                        <h4 className="text-[#e1e1f2] font-bold text-sm leading-tight group-hover/card:text-[#c9bfff] transition-colors line-clamp-1">{deal.brand}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          {deal.status === 'applied' && <CheckCircle2 className="w-3 h-3 text-[#1D9E75]" />}
                          <span className="text-[10px] text-[#8B8FA8] uppercase tracking-wider font-semibold">
                            {deal.status === 'open' ? 'Actively Hiring' : deal.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Match Visualizer */}
                  <div className="mb-4 bg-[#0D0F1A] rounded-lg p-3 border border-[#1E2035]/50">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-[#8B8FA8]">AI Match Score</span>
                      <span className="text-[#5B3FD4]">{deal.matchScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1E2035] rounded-full overflow-hidden">
                      <div className="h-full bg-[#5B3FD4] transition-all duration-1000 ease-out" style={{ width: `${deal.matchScore}%` }}></div>
                    </div>
                  </div>

                  {/* Body: Title + Desc + Tags */}
                  <div className="flex-1">
                    <h5 className="text-base font-bold text-white mb-1.5 line-clamp-1">{deal.title}</h5>
                    <p className="text-xs text-[#8B8FA8] line-clamp-2 leading-relaxed mb-4">{deal.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {deal.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#1E2035] rounded text-[9px] font-bold text-[#8B8FA8] uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Strip: Payout + Actions */}
                  <div className="mt-auto pt-4 border-t border-[#1E2035]">
                    {/* Pay Pill + Platforms */}
                    <div className="flex items-center justify-between mb-4">
                       <span className="bg-[#1D9E75]/10 text-[#1D9E75] text-[11px] font-bold rounded-md px-2.5 py-1">
                         💰 ${deal.payoutMin}–${deal.payoutMax} <span className="opacity-75 font-medium ml-0.5">/ post</span>
                       </span>
                       <div className="flex items-center gap-2">
                         {deal.platforms.map(p => (
                           <div key={p} className="w-6 h-6 rounded bg-[#1E2035] flex items-center justify-center group/icon hover:bg-[#323440] transition-colors" title={p}>
                             {getPlatformIcon(p)}
                           </div>
                         ))}
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex-1 px-4 py-2 border border-[#484554] text-[#e1e1f2] text-xs font-bold rounded-lg hover:bg-[#323440] hover:text-white transition-colors">
                        View deal 
                      </button>
                      <button className="p-2 border border-[#484554] rounded-lg text-[#8B8FA8] hover:text-[#c9bfff] hover:border-[#5B3FD4]/50 transition-colors">
                        <Bookmark size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: My Stats */}
        <aside className="w-[300px] flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-shrink-0">
          
          {/* Stats Card */}
          <div className="bg-[#151729] border border-[#1E2035] rounded-2xl p-6 shadow-md">
            <h3 className="text-xs font-bold text-[#8B8FA8] uppercase tracking-widest mb-6 border-b border-[#1E2035] pb-3">Your deal stats</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-wider mb-1">Earnings this month</p>
                <h4 className="text-3xl font-extrabold text-white tracking-tight">{myStats.earnings}</h4>
                <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-[#1D9E75]/10 text-[#1D9E75]">
                  <TrendingUp size={10} className="stroke-[3]" />
                  <span className="text-[9px] font-bold tracking-wider">ON TRACK</span>
                </div>
              </div>

              <div className="h-px w-full bg-[#1E2035]"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-[#8B8FA8] uppercase tracking-wider mb-1">Active Deals</p>
                  <h4 className="text-lg font-bold text-white">{myStats.activeDeals}</h4>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#8B8FA8] uppercase tracking-wider mb-1">Total Applied</p>
                  <h4 className="text-lg font-bold text-white">{myStats.totalApplied}</h4>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] font-bold text-[#8B8FA8] uppercase tracking-wider mb-1">Avg Payout</p>
                  <h4 className="text-lg font-bold text-white">{myStats.avgPayout}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Upgrade Banner */}
          <div className="bg-gradient-to-br from-[#EF9F27]/20 to-[#EF9F27]/5 border border-[#EF9F27]/40 rounded-2xl p-5 relative overflow-hidden group">
            {/* Soft decorative glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#EF9F27]/20 rounded-full blur-[30px] group-hover:bg-[#EF9F27]/30 transition-all duration-700"></div>
            
            <span className="relative z-10 px-2.5 py-1 bg-black/40 text-[#EF9F27] text-[9px] font-extrabold rounded uppercase tracking-widest backdrop-blur-sm border border-[#EF9F27]/20">
              Pro Feature
            </span>
            <h5 className="relative z-10 text-white font-extrabold text-lg mt-4 leading-tight">
              Unlock 3x more brand deals
            </h5>
            <p className="relative z-10 text-[#e1e1f2]/70 text-xs mt-2 font-medium leading-relaxed">
              Get exclusive access to premium campaigns, direct brand invites, and un-capped applications.
            </p>
            <button className="relative z-10 w-full mt-5 py-2.5 bg-[#EF9F27] text-black text-xs font-extrabold rounded-xl hover:bg-[#F5A623] transition-all shadow-lg shadow-[#EF9F27]/20">
              Upgrade to Pro &rarr;
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
}
