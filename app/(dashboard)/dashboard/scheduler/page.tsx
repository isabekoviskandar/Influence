"use client";

import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { 
  Plus, Send, Camera, Video, CalendarIcon, Sparkles
} from "lucide-react";

// Mock Data
const DAYS = ['Mon 21','Tue 22','Wed 23','Thu 24','Fri 25','Sat 26','Sun 27'];
const TIMES = ['9 AM','11 AM','1 PM','3 PM','5 PM','7 PM','9 PM','11 PM'];
const PEAK_SLOTS = ['Tue 22-7 PM','Tue 22-9 PM','Thu 24-7 PM','Thu 24-9 PM','Sat 26-11 AM'];

type PostStatus = 'posted' | 'draft' | 'scheduled' | 'ready' | 'pending';
type Platform = 'instagram' | 'youtube' | 'telegram';

interface MockPost {
  id: number;
  day: string;
  time: string;
  title: string;
  platform: Platform;
  status: PostStatus;
}

const initialMockPosts: MockPost[] = [
  { id:1, day:'Tue 22', time:'9 AM', title:'My Morning Routine', platform:'instagram', status:'posted' },
  { id:2, day:'Wed 23', time:'11 AM', title:'Vlog BTS of the new studio setup...', platform:'youtube', status:'draft' },
  { id:3, day:'Thu 24', time:'11 AM', title:'5 Tips for Better Lighting', platform:'instagram', status:'scheduled' },
  { id:4, day:'Wed 23', time:'7 PM', title:'My Morning Routine Fal Edition...', platform:'telegram', status:'scheduled' },
];

const upcomingPostsData = [
  { id:1, title:'Productivity Tips', platform:'instagram' as Platform, scheduledAt:'Oct 24, 7:00 PM', status:'ready' as PostStatus, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDxj_2rIfeXuVqjRNcadP6Xt09qpNYgQ7M-g0FZVRJSATA1YkriVq69OXM-Ym_XHU2WSuRUxJNm7W1pyDFaBbSe8WJa1kPmwuh9e_2uw6jy87Ob8AoWTnMCNHFq9_M4s7MqqC_pzRJBihpWhUwjLFIbNfvhoLUh_Sl8rVizdmQM6v37eC3SrAeunSsv6gOA75MZGdV3dPS5bWs0_I9x0u3zuL6VCVUUXhX0Q1IFVYdT_KAsWPX9YuIzNwHEpRlzpllUxAI_UQCzFKC3" },
  { id:2, title:'Community Q&A', platform:'telegram' as Platform, scheduledAt:'Oct 25, 10:30 AM', status:'pending' as PostStatus, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqqnxD8XCIoyZBPdzWJSaA2mMEhdWX-jYlKc-OavEgZu9Wo1b_jEdjMOOxuAr9MlkkAsBg6-jnNAiyBPXnI8lZfpegfLEl1cb0VDhM51M7Ne5n7YYsXJJ43WEWrcro5f5pXMiPb4v2tEWSQxlWw0fvcdE-Un-iG3sQrskDeShoDxmV0pvQglWtIwWA8XuxyFGQYdKGrKc8taCiqT6I8GhwrsC_uFwBIGrf-Qf0Yy_SlU5JC0XMy2Z_O8GVCFrjZWcazbjt__LL7Tdd" },
  { id:3, title:'Week Wrap-up', platform:'youtube' as Platform, scheduledAt:'Oct 26, 4:00 PM', status:'ready' as PostStatus, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYfOPGlJPnZmht5l9IzmdFO7rWy7u-e54YdgetkCyxdYa9sWQf5tNJXtOa7qWAcx0AGIWV0829gfE9KgRSnOSTn6GMoaMbmzTjKy29yVS6MjKtMvvTQZZ_LY9I2bjA9VJ_3RN7VlYlgjp7OskEmhwzAuSRd02S9IReaKWMcPSM1ShDRyhQTab1aTo0rCSWBIugClg5CRZeVtpv4AabfQNQ2DU3d78EXvP8CeaHGcTLNbCbm4szmMgowqmnIYWeRe80Dd199HYXKX5E" },
  { id:4, title:'Gear Giveaway', platform:'instagram' as Platform, scheduledAt:'Oct 28, 9:00 AM', status:'ready' as PostStatus, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2IEE-XHfECoQ-mangcm-Uqg1TuQpau6r5jxgCUDEIpFavSgfblhBiEGvPmqesMXyfw3Ix8-fbWZROceRCClkLWPpNfxVVlfHtGGFqn_Lh0qzt8OhChfY29WqJqR8k7aK-cf2zwJfZi4zbOxo2EghJ0BjJmpe8cqAxLKetRIKn-QrBtod9iDLDjYLqLAcD2dlZzXg7RSzPe8yjONJ0oXbdHRDF3v8TNrr4me4nbXELQUmkBdB35h9PaJiCWCGFVtraQXmXkZGzZx_n" },
];

const activityData = [
  ...Array.from({length: 13}, (_, i) => ({ time: i+6, value: Math.random() * 20 + 10 })), // 6am-6pm roughly random
  { time: 19, value: 85 }, // 7pm
  { time: 20, value: 100 }, // 8pm
  { time: 21, value: 90 }, // 9pm
  { time: 22, value: 45 }, // 10pm
  { time: 23, value: 20 }, // 11pm
];

export default function SmartScheduler() {
  const [view, setView] = useState<'week'|'month'>('week');
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{day:string, time:string} | null>(null);
  
  const [mockPosts, setMockPosts] = useState<MockPost[]>(initialMockPosts);

  // Form states for new post
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState<Platform>("instagram");

  // TODO: replace with proper React Query useMutation
  const handleSchedulePost = () => {
    if (!selectedSlot || !newTitle.trim()) return;

    const newPost: MockPost = {
      id: Date.now(),
      day: selectedSlot.day,
      time: selectedSlot.time,
      title: newTitle,
      platform: newPlatform,
      status: 'scheduled',
    };

    setMockPosts([...mockPosts, newPost]);
    setScheduleOpen(false);
    setNewTitle("");
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram': return <Camera size={14} className="text-pink-500" />;
      case 'youtube': return <Video size={14} className="text-red-500" />;
      case 'telegram': return <Send size={14} className="text-blue-400" />;
      default: return <Camera size={14} />;
    }
  };

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({day, time});
    setScheduleOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden animate-in fade-in duration-500 bg-[#0D0F1A]">
      
      {/* Top Header Block */}
      <div className="flex items-center justify-between px-8 py-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#e1e1f2] tracking-tight">Smart Scheduler</h1>
          <p className="text-sm text-[#8B8FA8] mt-1">Optimize your engagement with AI-powered posting slots.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex p-1 bg-[#151729] rounded-xl border border-[#484554]/10">
            <button 
              onClick={() => setView('week')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${view === 'week' ? 'bg-[#5B3FD4] text-white shadow-lg' : 'text-[#8B8FA8] hover:text-[#e1e1f2]'}`}
            >
              Week view
            </button>
            <button 
              onClick={() => setView('month')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${view === 'month' ? 'bg-[#5B3FD4] text-white shadow-lg' : 'text-[#8B8FA8] hover:text-[#e1e1f2]'}`}
            >
              Month view
            </button>
          </div>
          <button 
            onClick={() => { setSelectedSlot(null); setScheduleOpen(true); }}
            className="flex items-center gap-2 bg-[#5B3FD4] hover:bg-[#4623bf] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-[#5B3FD4]/20"
          >
            <Plus size={16} />
            Schedule post
          </button>
        </div>
      </div>

      {/* Main Layout Strip */}
      <div className="flex flex-1 gap-6 px-8 min-h-0 overflow-hidden pb-4">
        
        {/* Calendar Left Block */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#191b26] rounded-2xl border border-[#484554]/20 overflow-hidden shadow-lg shadow-black/20">
          
          {/* Calendar Header */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-[#484554]/20 bg-[#1d1f2b]">
            <div className="h-12 flex items-center justify-center border-r border-[#484554]/10 text-[10px] font-bold text-[#8B8FA8] uppercase tracking-widest">
              GMT+5
            </div>
            {DAYS.map((day, i) => {
              const [dayName, date] = day.split(' ');
              const isToday = i === 1; // Tue 22 mocked as active today
              return (
                <div key={day} className={`h-12 flex flex-col items-center justify-center border-r border-[#484554]/10 ${isToday ? 'bg-[#272935]' : ''}`}>
                  <span className={`text-[10px] font-bold ${isToday ? 'text-[#c9bfff]' : 'text-[#8B8FA8]'}`}>{dayName.toUpperCase()}</span>
                  <span className={`text-sm font-bold ${isToday ? 'text-white' : 'text-[#e1e1f2]'}`}>{date}</span>
                </div>
              );
            })}
          </div>

          {/* Calendar Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
             <div className="min-w-[800px] grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] h-[800px] absolute w-full top-0 left-0">
               
               {/* Time Col */}
               <div className="border-r border-[#484554]/10 flex flex-col">
                 {TIMES.map(time => (
                   <div key={time} className="h-[100px] flex items-start justify-center pt-2 text-[10px] text-[#8B8FA8] font-medium border-b border-[#484554]/5">
                     {time}
                   </div>
                 ))}
               </div>

               {/* Day Columns containing the Slots */}
               {DAYS.map(day => (
                 <div key={day} className="border-r border-[#484554]/10 flex flex-col relative group/col">
                   {TIMES.map(time => {
                     const isPeak = PEAK_SLOTS.includes(`${day}-${time}`);
                     const postForSlot = mockPosts.find(p => p.day === day && p.time === time);
                     
                     return (
                       <div 
                         key={`${day}-${time}`} 
                         onClick={() => handleSlotClick(day, time)}
                         className={`h-[100px] border-b border-[#484554]/5 p-2 transition-all cursor-pointer relative group/cell
                           ${isPeak ? 'bg-[#5B3FD4]/10' : 'hover:bg-[#151729]'}
                         `}
                       >
                         {/* Optional tiny hover helper */}
                         <div className="absolute top-2 right-2 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                            <Plus size={14} className="text-[#8B8FA8]" />
                         </div>

                         {postForSlot && (
                           <div className={`mt-1 bg-[#151729] rounded-xl border p-2 shadow-lg transition-all
                               ${postForSlot.status === 'posted' ? 'opacity-60 border-[#484554]/10' : 'border-[#484554]/30 hover:shadow-[#5b3fd4]/20 hover:border-[#5B3FD4]/50'}`}
                               onClick={(e) => e.stopPropagation()}
                               title={postForSlot.title}
                           >
                             <div className="flex items-center justify-between mb-1.5">
                               {getPlatformIcon(postForSlot.platform)}
                               <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-opacity-20 ${
                                 postForSlot.status === 'posted' ? 'bg-green-500 text-green-400' :
                                 postForSlot.status === 'draft' ? 'bg-[#8B8FA8] text-[#8B8FA8]' :
                                 'bg-[#5B3FD4] text-[#c9bfff]'
                               }`}>
                                 {postForSlot.status}
                               </span>
                             </div>
                             <p className="text-[11px] font-medium leading-tight text-white line-clamp-2">
                               {postForSlot.title}
                             </p>
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
               ))}
               
             </div>
          </div>
        </div>

        {/* Right Sidebar Insights */}
        <aside className="w-[300px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar bg-[#191b26] p-6 rounded-2xl border border-[#484554]/20">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-tight text-white uppercase tracking-wider">Best times to post</h3>
            <Sparkles className="text-[#5B3FD4] w-5 h-5" />
          </div>

          <div className="bg-[#151729] rounded-2xl p-5 border border-[#484554]/20 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#5B3FD4] text-white uppercase">AI suggested</span>
            </div>
            <p className="text-xs text-[#8B8FA8] leading-relaxed mb-6">
              Your audience is most active when you post short reels between 7 PM and 9 PM.
            </p>
            
            {/* Minimal Reach BarChart representing hours of day */}
            <div className="h-16 w-full -ml-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" hide />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Tooltip cursor={{ fill: '#1d1f2b' }} contentStyle={{ backgroundColor: '#1d1f2b', border: '1px solid #323440', borderRadius: '8px' }} formatter={(v: any) => [`${Math.round(v)}% Active`, 'Score']} labelFormatter={(v) => `${v}:00`} />
                  <Bar dataKey="value" fill="#5b3fd4" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { time:'Tue 7:00 PM', label:'Coming up', labelColor:'text-[#e1e1f2]' },
              { time:'Thu 8:15 PM', label:'Optimal slot', labelColor:'text-purple-400' },
              { time:'Sat 11:30 AM', label:'Weekend peak', labelColor:'text-orange-400' }
            ].map(slot => (
              <div 
                key={slot.time} 
                onClick={() => handleSlotClick(slot.time.split(' ')[0], slot.time.split(' ').slice(1).join(' '))}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between p-4 bg-[#151729] rounded-xl border border-[#484554]/20 group-hover:border-[#5B3FD4]/50 hover:shadow-[0_0_15px_rgba(91,63,212,0.1)] transition-all">
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${slot.labelColor}`}>{slot.label}</p>
                    <p className="text-sm font-semibold text-white">{slot.time}</p>
                  </div>
                  <button className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest hover:underline">Schedule now</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#5B3FD4]/10 to-transparent border border-[#484554]/10 flex flex-col">
            <div className="flex items-center gap-3 mb-3 shrink-0">
               <div className="w-2 h-2 rounded-full bg-[#5B3FD4] shadow-[0_0_8px_rgba(91,63,212,0.8)] animate-pulse"></div>
               <span className="text-[10px] font-bold text-[#c9bfff] tracking-widest uppercase">Live Insights</span>
            </div>
            <p className="text-[11px] text-[#8B8FA8] leading-relaxed">
               Engagement rate is up <span className="text-[#c9bfff] font-bold">12.4%</span> this week due to consistent evening posting.
            </p>
          </div>

        </aside>

      </div>

      {/* Bottom Horizontal Strip - Upcoming Posts */}
      <div className="bg-[#191b26] border-t border-[#484554]/20 px-8 py-5 h-[160px] flex-shrink-0">
         <div className="flex flex-col h-full">
           <div className="flex items-center gap-3 mb-3 flex-shrink-0">
             <h3 className="text-xs font-bold text-[#e1e1f2] uppercase tracking-widest">Upcoming posts</h3>
             <div className="h-[1px] flex-1 bg-[#484554]/20"></div>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar flex-1 items-center">
             {upcomingPostsData.map(post => (
               <div key={post.id} className="min-w-[240px] h-full bg-[#151729] rounded-2xl p-3 border border-[#484554]/20 flex items-center gap-4 hover:border-[#5B3FD4]/50 cursor-pointer transition-colors group">
                 <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#272935]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-1">
                     {getPlatformIcon(post.platform)}
                     <span className="text-[10px] font-bold text-[#8B8FA8]">{post.scheduledAt}</span>
                   </div>
                   <p className="text-xs font-semibold text-white line-clamp-1">{post.title}</p>
                   <p className={`text-[10px] mt-1 font-medium ${post.status === 'ready' ? 'text-[#c9bfff]' : 'text-[#8B8FA8]'}`}>
                     {post.status === 'ready' ? 'Ready to post' : 'Pending review'}
                   </p>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </div>

      {/* Schedule Dialog Modal */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="bg-[#151729] border-[#484554]/20 text-white max-w-md sm:rounded-2xl shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
               <CalendarIcon className="w-5 h-5 text-[#5B3FD4]" />
               {selectedSlot ? `Schedule for ${selectedSlot.day} at ${selectedSlot.time}` : 'Schedule New Post'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5">
            <div>
               <label className="text-xs font-bold text-[#8B8FA8] uppercase mb-1 block">Content Title</label>
               <input 
                 autoFocus
                 className="w-full bg-[#0c0e18] border border-[#272935] rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4] !outline-none text-white placeholder:text-[#484554]"
                 placeholder="E.g., Q4 Strategy Tips"
                 value={newTitle}
                 onChange={e => setNewTitle(e.target.value)}
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-xs font-bold text-[#8B8FA8] uppercase mb-1 block">Platform</label>
                 <select 
                   className="w-full bg-[#0c0e18] border border-[#272935] rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4] !outline-none text-white appearance-none"
                   value={newPlatform}
                   onChange={e => setNewPlatform(e.target.value as Platform)}
                 >
                   <option value="instagram">Instagram</option>
                   <option value="youtube">YouTube</option>
                   <option value="telegram">Telegram</option>
                 </select>
              </div>
              <div>
                 <label className="text-xs font-bold text-[#8B8FA8] uppercase mb-1 block">Type</label>
                 <select className="w-full bg-[#0c0e18] border border-[#272935] rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4] !outline-none text-[#8B8FA8] appearance-none disabled:opacity-50" disabled>
                   <option>Reel</option>
                 </select>
              </div>
            </div>

            <div>
               <label className="text-xs font-bold text-[#8B8FA8] uppercase mb-1 block">Description</label>
               <textarea 
                 className="w-full h-24 bg-[#0c0e18] border border-[#272935] rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-[#5b3fd4] !outline-none text-white placeholder:text-[#484554] resize-none"
                 placeholder="Write your caption here..."
               />
            </div>
          </div>

          <DialogFooter className="mt-6 border-t border-[#484554]/20 pt-6">
            <DialogClose className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#8B8FA8] hover:text-white transition-colors">
              Cancel
            </DialogClose>
            <button 
              onClick={handleSchedulePost}
              disabled={!newTitle.trim()}
              className="bg-[#5B3FD4] hover:bg-[#4623bf] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#5B3FD4]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule post
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
