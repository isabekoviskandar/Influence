"use client";

import { useState } from "react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Collapsible, CollapsibleContent, CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { Loader2, Sparkles, Bookmark, Share2, Clock, TrendingUp, Users, ChevronUp } from "lucide-react";

interface Idea {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  saved: boolean;
}

const mockIdeas: Idea[] = [
  { id:1, title:'The 5 AM Ghost Creative Workflow', desc:'A high-contrast cinematic reel showcasing your productive morning routine with deep-blue atmospheric lighting and minimal transitions.', tags:['#trending','#reels','#growth'], saved:false },
  { id:2, title:'Navigating Burnout in Public', desc:'A vulnerable carousel post breaking down the signs of creator burnout and your 48-hour recovery system with data visualizations.', tags:['#strategy','#mental_health'], saved:false },
  { id:3, title:'The Zero to One Creator Setup', desc:'Detailed tutorial on building a professional studio setup under $500 using recycled and budget equipment.', tags:['#trending','#tech'], saved:false },
  { id:4, title:'Predicting Q4 Brand Deal Trends', desc:'An educational breakdown of how AI influencers are disrupting the luxury fashion and tech brand deal landscape.', tags:['#business','#insights'], saved:false },
];

const mockReachData = [
  { day: 'Mon', reach: 60 },
  { day: 'Tue', reach: 80 },
  { day: 'Wed', reach: 100 },
  { day: 'Thu', reach: 85 },
  { day: 'Fri', reach: 40 },
];

export default function AIStudioPage() {
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("reel");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [nicheQuery, setNicheQuery] = useState("");
  const [nicheOpen, setNicheOpen] = useState(false);

  // TODO: replace mock with generateMutation = useMutation({ mutationFn: (data) => api.post('/ai/generate-ideas', data) })
  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    setIdeas(mockIdeas);
    setLoading(false);
  };

  const toggleSave = (id: number) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, saved: !i.saved } : i));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden animate-in fade-in duration-500">
      
      {/* Top Header Label (since TopBar exists, this is inline for context) */}
      <div className="flex items-center gap-12 px-8 mb-4 flex-shrink-0">
         <h1 className="text-2xl font-bold text-[#e1e1f2] font-headline tracking-tight">AI Studio</h1>
      </div>

      <div className="flex flex-row gap-0 h-full w-full border-t border-[#1E2035] overflow-hidden bg-[#11131e]">
        
        {/* LEFT PANEL */}
        <section className="w-72 flex-shrink-0 border-r border-[#1E2035] overflow-y-auto p-5 custom-scrollbar bg-[#191b26]">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">AI Content Ideas</h2>
            <p className="text-xs text-[#c9c4d7]">Harness the observatory to predict your next viral hit.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[0.6875rem] font-bold text-[#c9bfff] tracking-widest uppercase mb-2">Platform</label>
              <Select value={platform} onValueChange={(val) => setPlatform(val as string)}>
                <SelectTrigger className="w-full bg-[#0c0e18] border-none rounded-xl text-sm py-5 px-4 focus:ring-1 focus:ring-[#5b3fd4]/40 h-auto">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#191b26] border-[#323440] text-white">
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[0.6875rem] font-bold text-[#c9bfff] tracking-widest uppercase mb-2">Content type</label>
              <Select value={contentType} onValueChange={(val) => setContentType(val as string)}>
                <SelectTrigger className="w-full bg-[#0c0e18] border-none rounded-xl text-sm py-5 px-4 focus:ring-1 focus:ring-[#5b3fd4]/40 h-auto">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#191b26] border-[#323440] text-white">
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="long-form">Long-form</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[0.6875rem] font-bold text-[#c9bfff] tracking-widest uppercase mb-2">Topic or Niche</label>
              <textarea 
                className="w-full bg-[#0c0e18] border-none rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4]/40 transition-all resize-none placeholder:text-[#938ea0]/40 text-white !outline-none" 
                placeholder="Describe your niche or topic..." 
                rows={4}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-br from-[#5b3fd4] to-[#4720ca] text-white rounded-xl font-bold shadow-[0_0_30px_-5px_rgba(91,63,212,0.4)] hover:shadow-[0_0_40px_-5px_rgba(91,63,212,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  AI is thinking...
                </>
              ) : (
                <>Generate ideas <Sparkles className="w-4 h-4" /></>
              )}
            </button>

            {/* Niche Finder Collapsible */}
            <div className="pt-8 mt-8 border-t border-[#323440]/30">
              <Collapsible open={nicheOpen} onOpenChange={setNicheOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4 group focus:outline-none">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#c9bfff] transition-colors">Niche Finder</h3>
                  <ChevronUp className={`w-4 h-4 text-[#938ea0] transition-transform ${nicheOpen ? '' : 'rotate-180'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-2">
                  <input 
                    className="w-full bg-[#1d1f2b] text-white text-xs border-none rounded-lg py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4]/40 !outline-none" 
                    placeholder="Enter your interests" 
                    type="text"
                    value={nicheQuery}
                    onChange={(e) => setNicheQuery(e.target.value)}
                  />
                  <button className="w-full py-2.5 bg-[#323440] text-[#e1e1f2] text-xs font-semibold rounded-lg hover:bg-[#373845] transition-colors border border-[#484554]/20">
                    Find my niche
                  </button>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* CENTER PANEL */}
        <section className="flex-1 overflow-y-auto p-8 relative custom-scrollbar bg-[#11131e]">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#5b3fd4]/5 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white tracking-tight">Generated ideas</h2>
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto space-y-4 pb-12">
            
            {/* Empty State */}
            {!loading && ideas.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 mt-12 text-center animate-in fade-in zoom-in-95 duration-700">
                <Sparkles className="w-12 h-12 text-[#5b3fd4] mb-4 opacity-80" />
                <h3 className="text-xl font-bold text-white mb-2">Generate your first ideas</h3>
                <p className="text-sm text-[#8B8FA8]">Fill in the form and click Generate ideas →</p>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-[#151729] h-32 rounded-2xl border border-[#1E2035]"></div>
                ))}
              </div>
            )}

            {/* Rendered Ideas */}
            {!loading && ideas.length > 0 && ideas.map((idea) => (
              <div key={idea.id} className="bg-[#151729] rounded-2xl p-6 border border-[#1E2035] hover:border-[#5B3FD4] transition-all group relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                {/* Glow behind card */}
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(91,63,212,0.08)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#5B3FD4]/10 text-[#7B61FF] text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                    <button 
                      onClick={() => toggleSave(idea.id)}
                      className={`transition-colors ${idea.saved ? 'text-[#7B61FF]' : 'text-[#8B8FA8] hover:text-[#5B3FD4]'}`}
                    >
                      <Bookmark className="w-5 h-5" fill={idea.saved ? "#7B61FF" : "none"} />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{idea.title}</h3>
                  <p className="text-sm text-[#8B8FA8] mb-4 line-clamp-2">{idea.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {idea.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-[#8B8FA8] bg-[#1E2035] px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <button className="border border-[#5B3FD4] text-[#7B61FF] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#5B3FD4]/10 transition-colors">
                      Use this →
                    </button>
                    <button className="text-[#8B8FA8] hover:text-white transition-colors p-2">
                       <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="w-72 flex-shrink-0 border-l border-[#1E2035] overflow-y-auto p-5 custom-scrollbar bg-[#191b26]">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">Why this works</h2>
            <p className="text-xs text-[#c9c4d7]">Real-time signal analysis from your data.</p>
          </div>

          <div className="space-y-4 pb-12">
            
            {/* Algorithm tip */}
            <div className="bg-[#0c0e18] rounded-xl p-4 border-l-4 border-[#5b3fd4] shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#5b3fd4]/10 flex items-center justify-center text-[#c9bfff]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Algorithm tip</h4>
                  <p className="text-[9px] text-[#c9bfff] font-medium">Post optimization peak</p>
                </div>
              </div>
              <p className="text-xs text-[#c9c4d7] leading-relaxed">Best time to post: <span className="text-white font-bold">Tue 8PM</span>. Data shows your audience engagement spikes 22% during this window.</p>
            </div>

            {/* Trend */}
            <div className="bg-[#0c0e18] rounded-xl p-4 border-l-4 border-orange-400 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Trend</h4>
                  <p className="text-[9px] text-orange-400 font-medium">Hyper-velocity growth</p>
                </div>
              </div>
              <p className="text-xs text-[#c9c4d7] leading-relaxed">&quot;Minimalist productivity&quot; is <span className="text-white font-bold">trending in your niche</span> this week. 4x higher reach.</p>
            </div>

            {/* Competitor */}
            <div className="bg-[#0c0e18] rounded-xl p-4 border-l-4 border-blue-400 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Competitor</h4>
                  <p className="text-[9px] text-blue-400 font-medium">Comparative analysis</p>
                </div>
              </div>
              <p className="text-xs text-[#c9c4d7] leading-relaxed">Accounts like yours <span className="text-white font-bold">average 4 posts/week</span>. You are currently at 2.</p>
            </div>

            {/* Performance Forecast */}
            <div className="mt-6 p-5 bg-gradient-to-br from-[#323440] to-[#1d1f2b] rounded-2xl border border-[#484554]/20">
              <h4 className="text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest mb-4">Predicted Performance</h4>
              
              <div className="h-20 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockReachData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                     <Bar 
                       dataKey="reach" 
                       fill="#5b3fd4" 
                       radius={[4, 4, 0, 0]} 
                       activeBar={{ fill: '#7B61FF' }}
                     />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#c9c4d7]">Potential reach</span>
                <span className="font-bold text-white">12.4K - 18.2K</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
