"use client";

import { useState } from "react";
import { Sparkles, Download, RefreshCw, Layers, Layout, Palette, Maximize, Check, Share2, Wand2 } from "lucide-react";

const STYLES = [
  { id: "viral", label: "Viral High-Contrast", color: "from-orange-500 to-red-500" },
  { id: "cinematic", label: "Cinematic Dark", color: "from-blue-600 to-purple-800" },
  { id: "vibrant", label: "Vibrant & Bright", color: "from-green-400 to-blue-500" },
  { id: "minimal", label: "Clean Minimal", color: "from-slate-700 to-slate-900" },
];

const RATIOS = [
  { id: "16:9", label: "YouTube (16:9)", icon: Layout },
  { id: "9:16", label: "Shorts/TikTok (9:16)", icon: Maximize },
];

const MOCK_GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwZ-mzxeqe15HpO1gqwKni76kEOw56LWeA2UcxpPn2058D9Ihow6x_R0lkoj6IbgY-XoXGa-hRFBrvDk-GY8X6TdjaihCDa05aUSwwMjNTUwR3FkAS3cUNGEw1Y6Q2-Zqn-WYrQEdhfTNglieHyCU89M7hrNTtOEDd9Vc3WkKM4z0Z0XJy_qgnW795cECXFa1gsAYaHVscdoPc-PRInExeCO9GvQEk3myseWN8n8A52xSw9KoLjp8UwYFI3gP9a4DKRkyMMs-4LyoE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBz00Xymc-xCTAwqaa8VxcgscdDt-nz-l8DKRC7LD8ts60T5QK7aEb6hFvoSjLG3ZEIQfxupqJU5PLI0TT4PSkOggiQYbcQPZiM6TKBgEkSfFAAz3sWNSxlXkwxybj6tknF2ZIGBWZPvjpB8nlyOL86TVxFrAgl9NpHLTGxItVgNp2zROxx9N6zBemMrhqEY5a_JuXt5u28G5dXxXdE5DWuC6rZa-vTaDglCcnk9o7Dy9DuLMsClRt2FcztHnFvpMe4jKOhOl8YtJaE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfCyiGb8iQl5lcVJUhObgRB-atM9RT0T3CajO2TYkLu-Z-WWnSRr-QbY6wzSXrsPLpzBXogQnd_4xGeiozV9wtDNRgUqCLQ7af1p8s-h3o25E3Vnexdr7j_RioXBSaMcDhP-DpYREhQhICsNVwNi30LT5bzTfVxx4V_mNnGeLmL2lMG_jFwD_jsc8fKVm8hcpWIc7kk3WRdH-IxCnRYRPqFJcKH4HlQ-B89JlQxcudm1ayJe2CkLf8axAbRtVlvsNhBBzWCFHtENX5",
];

export default function AIThumbnailGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("viral");
  const [ratio, setRatio] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setGeneratedImg(MOCK_GALLERY[Math.floor(Math.random() * MOCK_GALLERY.length)]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5B3FD4] to-[#7B61FF] flex items-center justify-center shadow-lg shadow-[#5B3FD4]/20">
          <Wand2 className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Thumbnail Generator</h2>
          <p className="text-sm text-[#8B8FA8]">Create viral, high-click-through thumbnails using stable diffusion model.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Input Panel */}
        <section className="lg:col-span-5 bg-[#191b26] p-8 rounded-3xl border border-[#1E2035] space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-3">Describe your scene</label>
            <textarea 
              className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#5B3FD4] transition-all resize-none min-h-[100px]"
              placeholder="E.g. A futuristic workspace with neon lights and a pro creator holding a glowing digital device..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-4">Style Preset</label>
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`relative p-4 rounded-xl border text-xs font-bold transition-all overflow-hidden ${style === s.id ? "bg-[#323440] border-[#5B3FD4] text-white shadow-lg" : "bg-[#0c0e18] border-[#1E2035] text-[#8B8FA8] hover:bg-[#1d1f2b] hover:text-white"}`}
                >
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${s.color} opacity-50`}></div>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-3">Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-3">
              {RATIOS.map((r) => (
                <button 
                  key={r.id}
                  onClick={() => setRatio(r.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${ratio === r.id ? "bg-[#323440] border-[#5B3FD4] text-white shadow-lg" : "bg-[#0c0e18] border-[#1E2035] text-[#8B8FA8] hover:bg-[#1d1f2b] hover:text-white"}`}
                >
                  <r.icon size={16} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full bg-[#5B3FD4] hover:bg-[#4720ca] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#5B3FD4]/20 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Generating Artwork..." : "Generate Thumbnail"}
          </button>
        </section>

        {/* Preview Panel */}
        <section className="lg:col-span-7 space-y-6">
          <div className={`bg-[#191b26] rounded-3xl border border-[#1E2035] overflow-hidden flex flex-col items-center justify-center min-h-[420px] relative group border-dashed ${loading ? "border-[#5B3FD4] bg-[#5B3FD4]/5" : ""}`}>
             {generatedImg ? (
                <div className="w-full h-full relative">
                  <img src={generatedImg} alt="Generated" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all active:scale-90"><Download size={20} /></button>
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all active:scale-90"><Share2 size={20} /></button>
                  </div>
                </div>
             ) : (
                <div className="text-center p-12">
                   <div className="w-16 h-16 rounded-full bg-[#323440] flex items-center justify-center mx-auto mb-6 text-[#8B8FA8]">
                     <Layout size={32} />
                   </div>
                   <h3 className="text-white font-bold mb-2">Artboard Preview</h3>
                   <p className="text-sm text-[#8B8FA8] max-w-xs mx-auto">Your generated masterpiece will appear here. Choose a style and aspect ratio to begin.</p>
                </div>
             )}
             
             {loading && (
               <div className="absolute inset-0 bg-[#0D0F1A]/80 flex flex-col items-center justify-center gap-4 z-20 backdrop-blur-sm">
                  <div className="w-64 h-1.5 bg-[#1E2035] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5B3FD4] animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <p className="text-xs font-bold text-[#c9bfff] tracking-widest uppercase">Rendering pixels...</p>
               </div>
             )}
          </div>

          <div className="bg-[#191b26] p-6 rounded-3xl border border-[#1E2035]">
            <h4 className="text-xs font-bold text-[#c9bfff] tracking-[0.2em] uppercase mb-4 flex items-center gap-2"><Layers size={14} /> Recent Creations</h4>
            <div className="grid grid-cols-4 gap-4">
               {MOCK_GALLERY.map((img, i) => (
                 <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#1E2035] hover:border-[#5B3FD4] transition-all cursor-pointer group">
                   <img src={img} alt="History" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                 </div>
               ))}
               <div className="aspect-square rounded-xl border-2 border-dashed border-[#1E2035] flex items-center justify-center text-[#323440] bg-[#191b26]">
                 <Layout size={20} />
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
