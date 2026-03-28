"use client";

import { useState } from "react";
import { Sparkles, Copy, RefreshCw, Type, Hash, Zap, Instagram, Youtube, Send, Check } from "lucide-react";

const TONES = [
  { id: "hype", label: "Hype", icon: Zap, color: "text-orange-400" },
  { id: "professional", label: "Professional", icon: Type, color: "text-blue-400" },
  { id: "casual", label: "Casual", icon: Sparkles, color: "text-[#c9bfff]" },
  { id: "educational", label: "Educational", icon: Hash, color: "text-emerald-400" },
];

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "youtube", label: "YouTube Shorts", icon: Youtube },
  { id: "telegram", label: "Telegram", icon: Send },
];

export default function AICaptionWriter() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("hype");
  const [platform, setPlatform] = useState("instagram");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const mockCaptions = {
      hype: "🚀 UNLOCKING SHADCN V4: The game has officially changed. We're diving deep into the next evolution of UI design and how it's going to reshape your workflow. You are NOT ready for this! 🔥🔥🔥 #Shadcn #WebDev #NextJS #UIUX",
      professional: "The release of Shadcn UI v4 represents a significant milestone in component-based design systems. Our latest analysis explores the architectural shifts and performance optimizations that make this version a necessary upgrade for enterprise-scale React applications. Read the full breakdown below. #WebDevelopment #SoftwareEngineering #React",
      casual: "So, I finally got my hands on Shadcn v4 and... wow. It's actually as good as everyone's saying. Super smooth, way less boilerplate, and the new color tokens are just 🤌. If you're building with Next.js, you gotta check this out. #codinglife #shadcn #frontend",
      educational: "Did you know Shadcn v4 introduced a new way to handle theme variables? 🧠 By leveraging Tailwind v4 features, it's cut down on CSS weight while giving you more control over your design tokens. Here's a quick 3-step guide to migrating your current project... #LearnToCode #HTML #CSS #JavaScript"
    };

    setResult(mockCaptions[tone as keyof typeof mockCaptions]);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#5B3FD4] flex items-center justify-center shadow-lg shadow-[#5B3FD4]/20">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Caption Writer</h2>
          <p className="text-sm text-[#8B8FA8]">Generate viral hooks and engaging captions in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Controls */}
        <section className="lg:col-span-12 bg-[#191b26] p-8 rounded-3xl border border-[#1E2035] space-y-8 shadow-sm">
          <div>
            <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-3">Topic or Context</label>
            <textarea 
              className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-2xl p-4 text-sm text-white placeholder-[#8B8FA8]/50 focus:outline-none focus:border-[#5B3FD4] transition-all resize-none min-h-[120px]"
              placeholder="What is your post about? E.g. my new desk setup, 5 tips for designers..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-3">Select Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${tone === t.id ? "bg-[#323440] border-[#5B3FD4] text-white shadow-lg" : "bg-[#0c0e18] border-[#1E2035] text-[#8B8FA8] hover:bg-[#1d1f2b] hover:text-white"}`}
                  >
                    <t.icon size={16} className={t.color} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-3">Target Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${platform === p.id ? "bg-[#323440] border-[#5B3FD4] text-white shadow-lg" : "bg-[#0c0e18] border-[#1E2035] text-[#8B8FA8] hover:bg-[#1d1f2b] hover:text-white"}`}
                  >
                    <p.icon size={16} className={platform === p.id ? "text-white" : "text-[#8B8FA8]"} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full bg-gradient-to-r from-[#5B3FD4] to-[#4720ca] hover:scale-[1.01] active:scale-[0.99] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#5B3FD4]/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
            {loading ? "AI is writing..." : "Generate Caption →"}
          </button>
        </section>

        {/* Result Area */}
        {result && (
          <section className="lg:col-span-12 bg-gradient-to-br from-[#191b26] to-[#151729] p-8 rounded-3xl border border-[#5B3FD4]/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B3FD4]/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#5B3FD4]/10 transition-colors"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-sm font-bold text-[#e1e1f2] uppercase tracking-[0.2em]">Generated Magic</h3>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-[#323440] hover:bg-[#3d3f4d] text-[#e1e1f2] px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 border border-[#484554]/30"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button 
                   onClick={handleGenerate}
                   className="p-2 bg-[#323440] hover:bg-[#3d3f4d] text-[#8B8FA8] hover:text-white rounded-xl transition-all border border-[#484554]/30"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="bg-[#0c0e18]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#1E2035] relative z-10">
              <p className="text-[#e1e1f2] leading-relaxed text-sm lg:text-base font-medium">
                {result}
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-wider py-1 px-3 bg-[#5B3FD4]/10 rounded-full border border-[#5B3FD4]/20 flex items-center gap-1.5"><Zap size={10} /> Viral Potential: 94%</span>
              <span className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-wider py-1 px-3 bg-[#1d1f2b] rounded-full border border-[#1E2035]">Optimal Hook</span>
              <span className="text-[10px] font-bold text-[#8B8FA8] uppercase tracking-wider py-1 px-3 bg-[#1d1f2b] rounded-full border border-[#1E2035]">Engagement Triggered</span>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
