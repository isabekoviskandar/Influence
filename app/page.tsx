/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart, Sparkles, Compass, Clock, Grid, Handshake, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  Minus, Globe, Share2, AtSign, ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pricing Logic (25% off) -> Free is 0, Creator 12|9, Pro 29|21.75(21), Agency 89|66.75(66)
  const calculatePrice = (monthly: number) => {
    if (monthly === 0) return 0;
    return isAnnual ? Math.floor(monthly * 0.75) : monthly;
  };

  return (
    <div className="bg-[#0c0e18] text-[#e1e1f2] font-sans overflow-x-hidden selection:bg-[#5b3fd4] selection:text-white min-h-screen">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#11131e]/80 backdrop-blur-xl border-b border-[#484554]/15 shadow-[0_8px_32px_rgba(91,63,212,0.05)]' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-[#e1e1f2]">influence.uz</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#5b3fd4]"></div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-medium text-sm tracking-tight text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">Features</a>
            <a href="#testimonials" className="font-medium text-sm tracking-tight text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">Stories</a>
            <a href="#pricing" className="font-medium text-sm tracking-tight text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">Pricing</a>
            <a href="#faq" className="font-medium text-sm tracking-tight text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="font-medium text-sm tracking-tight text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors px-4 py-2 active:scale-95 transform">
              Sign In
            </Link>
            <Link href="/signup" className="bg-[#5b3fd4] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#4720ca] transition-all active:scale-95 transform shadow-lg shadow-[#5b3fd4]/20 hidden sm:block">
              Start for free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-start overflow-hidden">
        {/* Adjusted Background to match Hero glow securely */}
        <div className="absolute inset-0 -z-10" style={{background: 'radial-gradient(circle at center, rgba(91, 63, 212, 0.15) 0%, rgba(12, 14, 24, 0) 70%)'}}></div>
        
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5b3fd4]/40 bg-[#5b3fd4]/10 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-[#c9bfff]" />
          <span className="text-[#c9bfff] text-[0.6875rem] font-semibold uppercase tracking-widest">AI-powered creator platform</span>
        </div>
        
        <h1 className="text-center text-4xl md:text-[60px] leading-[1.1] font-bold tracking-tight max-w-3xl mb-6 text-[#e1e1f2]">
          Know exactly why <br/> <span className="text-[#c9bfff]">your content grows.</span>
        </h1>
        
        <p className="text-center text-[#c9c4d7] text-lg max-w-[520px] mb-10">
          Deep analytics, AI content ideas, and smart scheduling — built for creators who are serious about growth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/signup" className="flex items-center justify-center bg-[#5b3fd4] text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-[0_0_25px_rgba(91,63,212,0.4)] transition-all active:scale-95 transform">
            Start free — no credit card
          </Link>
          <button className="px-8 py-4 rounded-full font-semibold text-[#e1e1f2] border border-[#484554]/30 hover:bg-[#1d1f2b] transition-all active:scale-95 transform">
            Watch 2-min demo →
          </button>
        </div>
        
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#938ea0] mb-20 text-center">
          Join 2,400+ creators · Free plan forever · Cancel anytime
        </p>

        {/* Mockup */}
        <div className="relative w-full max-w-5xl mx-auto px-4 [perspective:1000px]">
          <div className="relative rounded-2xl border border-[#484554]/20 overflow-hidden shadow-2xl [transform:rotateX(2deg)] hover:[transform:rotateX(0deg)] transition-transform duration-700">
            <img className="w-full object-cover" alt="Analytics dashboard interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIm3PQu4kQig96N_l947KJVwAGLYlOyEDrc54mWj59FmlZhAThzQm7MepDMbyf13Oh_X_Lh4bs8ICJkUL4K7Pyi1-2vqpNjIJxHeqO_MzrjsStQAMOsUqezBszaQRvkbOmPEFo5SXoR-YOdp554KCO9fJ5dqe_v0_-jC_HYTJZjF2Cu07gu7qbpY7aWwdFoSd6d5TOku6tja8j-WViNmE0hEkmvMBUu9GV3DHfV5wuSxrCXxqDGO3g9vgfX2dsVzjr7GVdO-HPluXk"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e18] via-transparent to-transparent opacity-40"></div>
          </div>
          
          {/* Floating Chips */}
          <div className="absolute -top-12 -left-4 md:-left-12 bg-[#1d1f2b]/60 backdrop-blur-[20px] px-5 py-4 rounded-2xl border border-emerald-500/20 shadow-xl animate-bounce" style={{animationDuration: '4s'}}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <BarChart className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-[#938ea0] font-bold uppercase tracking-wider">Growth</p>
                <p className="text-sm font-bold text-emerald-400">+18% views this week</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-[#1d1f2b]/60 backdrop-blur-[20px] px-5 py-4 rounded-2xl border border-[#5b3fd4]/30 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#5b3fd4]/10 rounded-lg">
                <Clock className="w-5 h-5 text-[#c9bfff]" />
              </div>
              <div>
                <p className="text-[10px] text-[#938ea0] font-bold uppercase tracking-wider">Smart Post</p>
                <p className="text-sm font-bold text-white">AI posted at peak</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/4 bg-[#1d1f2b]/60 backdrop-blur-[20px] px-5 py-4 rounded-2xl border border-[#7B61FF]/30 shadow-xl hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#7B61FF]/10 rounded-lg">
                <Compass className="w-5 h-5 text-[#baaeff]" />
              </div>
              <div>
                <p className="text-[10px] text-[#938ea0] font-bold uppercase tracking-wider">Insights</p>
                <p className="text-sm font-bold text-white">Niche: Tech Minimalism</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#5b3fd4]/20 blur-[80px] -z-10"></div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#191b26] border border-[#484554]/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <p className="text-[#c9c4d7] font-medium text-sm">Trusted by 2,400+ creators across</p>
              <div className="flex items-center gap-1">
                <span className="text-[#c9bfff] text-sm tracking-widest">★★★★★</span>
                <span className="text-[11px] font-bold text-[#938ea0]">4.9/5 FROM 380 REVIEWS</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['Instagram', 'Telegram', 'YouTube', 'TikTok', 'Facebook', 'X'].map(platform => (
                <span key={platform} className="px-4 py-2 rounded-full bg-[#1d1f2b] border border-[#484554]/15 text-[#c9c4d7] text-xs font-semibold">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main Feature */}
            <div className="md:col-span-2 bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#5b3fd4]/10 to-transparent blur-3xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#5b3fd4]/20 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-[#c9bfff]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Deep Analytics</h3>
                </div>
                <p className="text-[#c9c4d7] text-sm mb-8 max-w-md">Uncover the hidden patterns in your engagement. Understand not just what happened, but exactly why it happened with neural data mapping.</p>
                <div className="mt-auto rounded-xl border border-[#484554]/10 overflow-hidden transform group-hover:scale-[1.02] transition-transform">
                  <img className="w-full h-48 sm:h-64 object-cover" alt="Analytics dashboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvDGCGm4SBECQXoCsl74Mw0pNj6pE9cIiEDuRssN4d0040BqjMIWAsJvbFl8pPePsemL6ZqpaKFXka3vLcH6CdAmr3FvFqMpIMbiVZ6xG4u2kglrfps1kHtwB8xVmQU5JB9cqV3BFaqex_zhrdaMs8_LxvVFCbHZifBwbC_zFPy9Aehh6ayZbZEc8fOMeidmdevuc28dXiBGlFuIRhRXr7duC078jup3AvBRnJBd4XA2jj15NJsfR0KFvEUDA7Q05rSUJEEPIs5h2U"/>
                </div>
              </div>
            </div>

            <div className="bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#c9bfff]/20 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#c9bfff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Content Ideas</h3>
              <p className="text-[#c9c4d7] text-sm">Never face writer&apos;s block again. Our AI analyzes global trends to suggest your next viral topic.</p>
            </div>

            <div className="bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/20 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-[#baaeff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Niche Finder</h3>
              <p className="text-[#c9c4d7] text-sm">Discover untapped markets and micro-niches where you can dominate with less competition.</p>
            </div>

            <div className="bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#c9bfff]/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#c9bfff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Scheduler</h3>
              <p className="text-[#c9c4d7] text-sm">Post when your audience is most active. Automatically across all platforms simultaneously.</p>
            </div>

            <div className="bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#c9bfff]/20 flex items-center justify-center mb-6">
                <Grid className="w-6 h-6 text-[#c9bfff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Multi-platform</h3>
              <p className="text-[#c9c4d7] text-sm">One dashboard to rule them all. Manage your entire digital empire from a single view.</p>
            </div>

            <div className="md:col-span-2 bg-[#1d1f2b] rounded-3xl p-8 border border-[#5b3fd4]/15 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7B61FF]/10 to-transparent blur-3xl"></div>
               <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 rounded-xl bg-[#c9bfff]/20 flex items-center justify-center">
                       <Handshake className="w-6 h-6 text-[#c9bfff]" />
                     </div>
                     <span className="bg-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Coming Soon</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-4">Brand Deals Marketplace</h3>
                   <p className="text-[#c9c4d7] text-sm mb-6">Connect directly with premium brands. Automate your outreach and manage contracts without leaving the platform.</p>
                 </div>
                 <div className="flex-1 w-full relative pt-4">
                   <div className="bg-[#323440]/50 border border-[#484554]/20 rounded-2xl p-4 shadow-xl">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-[10px] font-bold">
                           TF
                         </div>
                         <p className="text-xs font-bold text-white">TechFlow Pro</p>
                       </div>
                       <span className="text-[10px] font-bold text-[#c9bfff]">$1,200.00</span>
                     </div>
                     <div className="h-1 w-full bg-[#484554]/20 rounded-full mb-2">
                       <div className="w-3/4 h-full bg-[#c9bfff] rounded-full"></div>
                     </div>
                     <p className="text-[10px] text-[#938ea0]">Campaign matching: 94%</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-24 px-6 bg-[#0c0e18]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-[#e1e1f2]">Why influence.uz</h2>
            <p className="text-[#c9c4d7] text-lg max-w-2xl mx-auto">The only platform engineered specifically for the next generation of digital entrepreneurs.</p>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar pb-6 pl-1">
            <table className="w-full min-w-[700px] text-left border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="p-6 bg-transparent text-sm uppercase tracking-widest text-[#938ea0] font-semibold">Feature</th>
                  <th className="p-6 bg-[#5b3fd4] text-white rounded-t-xl text-center border-x border-t border-[#c9bfff]/20 tracking-wide font-semibold">influence.uz</th>
                  <th className="p-6 bg-[#191b26] text-[#c9c4d7] text-center border-b border-[#484554]/10 font-semibold">Buffer</th>
                  <th className="p-6 bg-[#191b26] text-[#c9c4d7] text-center border-b border-[#484554]/10 font-semibold">Metricool</th>
                  <th className="p-6 bg-[#191b26] text-[#c9c4d7] text-center border-b border-[#484554]/10 font-semibold">Hootsuite</th>
                </tr>
              </thead>
              <tbody className="text-sm border-t-0">
                {(
                  [
                    {feature: "Creator-focused design", us: true, b: false, m: false, h: false},
                    {feature: "AI idea generator", us: true, b: 'partial', m: true, h: 'partial'},
                    {feature: "YouTube niche finder", us: true, b: false, m: false, h: false},
                    {feature: "Real-time local analytics", us: true, b: true, m: true, h: true},
                  ] as {feature: string, us: boolean, b: boolean | 'partial', m: boolean | 'partial', h: boolean | 'partial'}[]
                ).map((row, i) => (
                  <tr key={i}>
                    <td className="p-6 border-b border-[#484554]/10 font-medium text-[#e1e1f2] bg-[#0c0e18]">{row.feature}</td>
                    <td className="p-6 border-x border-b border-[#c9bfff]/20 bg-[#5b3fd4]/10 text-center">
                      {row.us ? <CheckCircle2 className="w-5 h-5 text-[#c9bfff] mx-auto" /> : <XCircle className="w-5 h-5 text-[#484554] mx-auto" />}
                    </td>
                    <td className="p-6 border-b border-[#484554]/10 text-center bg-[#0c0e18]">
                      {row.b === true ? <CheckCircle2 className="w-5 h-5 text-[#c9bfff] mx-auto" /> : row.b === 'partial' ? <Minus className="w-5 h-5 text-[#484554] mx-auto" /> : <XCircle className="w-5 h-5 text-[#484554]/40 mx-auto" />}
                    </td>
                    <td className="p-6 border-b border-[#484554]/10 text-center bg-[#0c0e18]">
                      {row.m === true ? <CheckCircle2 className="w-5 h-5 text-[#c9bfff] mx-auto" /> : row.m === 'partial' ? <Minus className="w-5 h-5 text-[#484554] mx-auto" /> : <XCircle className="w-5 h-5 text-[#484554]/40 mx-auto" />}
                    </td>
                    <td className="p-6 border-b border-[#484554]/10 text-center bg-[#0c0e18]">
                      {row.h === true ? <CheckCircle2 className="w-5 h-5 text-[#c9bfff] mx-auto" /> : row.h === 'partial' ? <Minus className="w-5 h-5 text-[#484554] mx-auto" /> : <XCircle className="w-5 h-5 text-[#484554]/40 mx-auto" />}
                    </td>
                  </tr>
                ))}
                {/* Price Row */}
                <tr className="bg-[#191b26]/50">
                  <td className="p-6 border-b border-[#484554]/10 font-bold text-[#e1e1f2]">Starting Price</td>
                  <td className="p-6 border-x border-b border-[#c9bfff]/20 bg-[#5b3fd4]/20 text-center rounded-b-xl"><span className="text-xl font-bold text-emerald-400">$12/mo</span></td>
                  <td className="p-6 border-b border-[#484554]/10 text-center text-[#c9c4d7]">$15/mo</td>
                  <td className="p-6 border-b border-[#484554]/10 text-center text-[#c9c4d7]">$20/mo</td>
                  <td className="p-6 border-b border-[#484554]/10 text-center text-[#c9c4d7]">$99/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-[#191b26]/30 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#c9bfff] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Wall of Growth</span>
              <h2 className="text-4xl font-bold tracking-tight text-[#e1e1f2]">Built by creators, for creators.</h2>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-[#484554]/20 flex items-center justify-center hover:bg-[#272935] text-[#c9c4d7] transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border border-[#484554]/20 flex items-center justify-center hover:bg-[#272935] text-[#c9c4d7] transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1d1f2b] p-8 rounded-xl shadow-[0_0_40px_-10px_rgba(201,191,255,0.05)] transition-transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9bfff]/20">
                  <img className="w-full h-full object-cover" alt="Alex" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfleSk8aImiMBFzZx1TCWzPUhvT7gThQ9jxUDSA4oJJcSfUKjuUhudFF6gotlOglkbii3pIQT-dqiH1hBwsQylAPmkYvHI6MqxIPHjK-CXJNYiGIRMnW2i-NiLppwLlPKcTzuQMMOirHy3nDjUUrDLJknkhbL7pw69DnWqlzSVUSpV765Brt-OdsgqiQC56uIMsPxTlXcanqvq3wRVtuDxqYalLYIk-CFSht8Taiaj58gBosIqouK8XZYKirH48JRK6tWp4UU0Jw5t"/>
                </div>
                <div>
                  <p className="font-bold text-[#e1e1f2]">Alex River</p>
                  <p className="text-xs text-[#c9c4d7]">@ariver_tech</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#c9bfff] tracking-tighter">+340%</span>
                <p className="text-xs text-[#938ea0] uppercase tracking-widest mt-1 font-semibold">Monthly Engagement</p>
              </div>
              <p className="text-[#c9c4d7] italic mb-8 leading-relaxed">&quot;The niche finder is a game changer. I found a gap in the tech reviews space that I wouldn&apos;t have seen without Influence&apos;s data.&quot;</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">YouTube</span>
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">Tech</span>
              </div>
            </div>
            
            <div className="bg-[#1d1f2b] p-8 rounded-xl shadow-[0_0_40px_-10px_rgba(201,191,255,0.05)] transition-transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9bfff]/20">
                  <img className="w-full h-full object-cover" alt="Maya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzjbVC1FdNJZq3f7IxdttF9owx3ToAhHchYqU09e1badWS77Ji61ZXfeIUWTvlNKQVgqZATtPhvv7IYOoMK6dpS0i-0R2aTqKCDzg6E0APETjNCI_j8W1nQUWzP-0i-vHeF61aa5QkdvHHd1vwoEnAfiq3WIRzhx5KlqW_ce-lK_DaxCPa4PbI0Kxt79kdgLAjd4SHS6-OqR9P_bnJ6Mm8NylX0S9eiVNDl22tMEfWpQozx6_IX94YSet9nh66gHxPbYvCtOFguNku"/>
                </div>
                <div>
                  <p className="font-bold text-[#e1e1f2]">Maya Chen</p>
                  <p className="text-xs text-[#c9c4d7]">@mayacreates</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#c9bfff] tracking-tighter">2.1M</span>
                <p className="text-xs text-[#938ea0] uppercase tracking-widest mt-1 font-semibold">Organic Views</p>
              </div>
              <p className="text-[#c9c4d7] italic mb-8 leading-relaxed">&quot;Switching from standard schedulers to Influence was the best decision. The AI idea generator keeps my content calendar full.&quot;</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">TikTok</span>
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">Art</span>
              </div>
            </div>

            <div className="bg-[#1d1f2b] p-8 rounded-xl shadow-[0_0_40px_-10px_rgba(201,191,255,0.05)] transition-transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9bfff]/20">
                  <img className="w-full h-full object-cover" alt="Liam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXTLBNQOvbqgNLNHjudvmcuUWIEf6CkRW0dSMPdENjy0G4VoS80aM0VIqrd-yQMtFU2FEuMGdKjQLt_cWrPiWtPvmc1tsVojQbjDvxTjL6E-7mCuMtmzBo9kjqoIx9QbcvY31tdnO31GXcrRJnS3kbCCDLMOS3ErtqO6MfWP4imT0g8L_KPCJ07niSyJNae2zjOB5_kCQk18bd4wE9hxZ26-fCaQ-DstWZhxO_csDEcwn5NvucPGzyqIzkoHuWLAaz6ed7jldfNR21"/>
                </div>
                <div>
                  <p className="font-bold text-[#e1e1f2]">Liam Foster</p>
                  <p className="text-xs text-[#c9c4d7]">@liam_wanders</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#c9bfff] tracking-tighter">12.4k</span>
                <p className="text-xs text-[#938ea0] uppercase tracking-widest mt-1 font-semibold">New Subs/Week</p>
              </div>
              <p className="text-[#c9c4d7] italic mb-8 leading-relaxed">&quot;The analytics depth is unmatched. I can see exactly when my audience is online and what hooks them in the first 3 seconds.&quot;</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">Instagram</span>
                <span className="px-2 py-1 rounded bg-[#323440] text-[10px] font-bold text-[#c9c4d7] uppercase border border-[#484554]/30">Travel</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-[#e1e1f2]">Simple, Transparent Pricing</h2>
            <div className="flex items-center justify-center gap-4">
              <span className={`font-medium ${!isAnnual ? 'text-[#e1e1f2]' : 'text-[#8B8FA8]'}`}>Monthly</span>
              
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-14 h-8 rounded-full relative flex items-center px-1 transition-all ${isAnnual ? 'bg-[#1D9E75]' : 'bg-[#5b3fd4]'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>

              <div className="flex items-center gap-2">
                <span className={`font-medium ${isAnnual ? 'text-[#e1e1f2]' : 'text-[#8B8FA8]'}`}>Annually</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-tighter">Save 25%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Plan Free */}
            <div className="bg-[#191b26] p-8 rounded-xl flex flex-col border border-[#484554]/20">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-[#8B8FA8] text-sm">For getting started.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">${calculatePrice(0)}</span>
                <span className="text-[#8B8FA8] text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 1 Social Account
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Basic Analytics
                </li>
                <li className="flex items-start gap-3 text-sm text-[#484554]">
                  <Minus className="w-5 h-5 shrink-0" /> AI Idea Generator
                </li>
              </ul>
              <Link href="/signup" className="w-full py-3 rounded-lg border border-[#484554]/40 font-semibold hover:bg-[#272935] text-center transition-all block text-[#c9c4d7]">
                Get Started
              </Link>
            </div>

            {/* Plan Creator */}
            <div className="bg-[#191b26] p-8 rounded-xl flex flex-col border-2 border-[#5b3fd4] relative shadow-[0_0_40px_-15px_rgba(91,63,212,0.4)] transform scale-100 lg:scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5b3fd4] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest leading-none">Most Popular</div>
              <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold mb-2 text-[#c9bfff]">Creator</h3>
                <p className="text-[#8B8FA8] text-sm">Full toolset for pros.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">${calculatePrice(12)}</span>
                <span className="text-[#8B8FA8] text-sm">/mo</span>
                {isAnnual && <p className="text-xs text-emerald-400 font-medium mt-2 block">Billed $108 yearly</p>}
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 5 Social Accounts
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Advanced Analytics
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> AI Idea Generator
                </li>
              </ul>
              <Link href="/signup" className="w-full py-3 rounded-lg bg-[#5b3fd4] text-white font-bold shadow-lg hover:brightness-110 text-center transition-all block">
                Choose Creator
              </Link>
            </div>

            {/* Plan Pro */}
            <div className="bg-[#191b26] p-8 rounded-xl flex flex-col border border-[#484554]/20">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-[#8B8FA8] text-sm">For growing brands.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">${calculatePrice(29)}</span>
                <span className="text-[#8B8FA8] text-sm">/mo</span>
                {isAnnual && <p className="text-xs text-emerald-400 font-medium mt-2 block">Billed $261 yearly</p>}
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 15 Social Accounts
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Team Collaboration
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Custom Reporting
                </li>
              </ul>
              <Link href="/signup" className="w-full py-3 rounded-lg border border-[#484554]/40 font-semibold hover:bg-[#272935] text-center transition-all block text-[#c9c4d7]">
                Choose Pro
              </Link>
            </div>

            {/* Plan Agency */}
            <div className="bg-[#191b26] p-8 rounded-xl flex flex-col border border-[#484554]/20">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Agency</h3>
                <p className="text-[#8B8FA8] text-sm">Unlimited scale.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">${calculatePrice(89)}</span>
                <span className="text-[#8B8FA8] text-sm">/mo</span>
                {isAnnual && <p className="text-xs text-emerald-400 font-medium mt-2 block">Billed $801 yearly</p>}
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Unlimited Accounts
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> White-label Reports
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Dedicated Manager
                </li>
              </ul>
              <Link href="/contact" className="w-full py-3 rounded-lg border border-[#484554]/40 font-semibold hover:bg-[#272935] text-center transition-all block text-[#c9c4d7]">
                Contact Sales
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-[#0D0F1A]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#5b3fd4]/40 text-[#c9bfff] text-[10px] font-bold uppercase tracking-widest mb-6">FAQ</span>
            <h2 className="text-4xl md:text-[40px] font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="bg-[#151729] rounded-xl border border-[#1E2035] p-2">
             {/* @ts-expect-error type missing in radix */}
             <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1" className="border-[#1E2035]">
                 <AccordionTrigger className="hover:no-underline px-4 hover:text-[#c9bfff] font-bold">
                   Is influence.uz really free?
                 </AccordionTrigger>
                 <AccordionContent className="text-[#8B8FA8] px-4 leading-relaxed">
                   Yes! Our Free plan is free forever and includes basic analytics for one platform and 5 AI content ideas per month. No credit card required to start.
                 </AccordionContent>
               </AccordionItem>
               
               <AccordionItem value="item-2" className="border-[#1E2035]">
                 <AccordionTrigger className="hover:no-underline px-4 hover:text-[#c9bfff] font-bold">
                   Which platforms do you support?
                 </AccordionTrigger>
                 <AccordionContent className="text-[#8B8FA8] px-4 leading-relaxed">
                   Currently, we offer deep intelligence for Instagram, Telegram, and YouTube. TikTok and Facebook support are launching in Q2 2024.
                 </AccordionContent>
               </AccordionItem>
               
               <AccordionItem value="item-3" className="border-[#1E2035]">
                 <AccordionTrigger className="hover:no-underline px-4 hover:text-[#c9bfff] font-bold">
                   How does the AI Niche Finder work?
                 </AccordionTrigger>
                 <AccordionContent className="text-[#8B8FA8] px-4 leading-relaxed">
                   Our AI analyzes millions of data points across social platforms to identify high-demand, low-competition topics specifically tailored to your interests and region.
                 </AccordionContent>
               </AccordionItem>
               
               <AccordionItem value="item-4" className="border-[#1E2035]">
                 <AccordionTrigger className="hover:no-underline px-4 hover:text-[#c9bfff] font-bold">
                   Can I cancel my subscription anytime?
                 </AccordionTrigger>
                 <AccordionContent className="text-[#8B8FA8] px-4 leading-relaxed">
                   Absolutely. There are no long-term contracts. You can cancel your Pro or Creator plan at any time from your settings with one click.
                 </AccordionContent>
               </AccordionItem>

               <AccordionItem value="item-5" className="border-none">
                 <AccordionTrigger className="hover:no-underline px-4 hover:text-[#c9bfff] font-bold">
                   How do I get paid through the Brand Deals marketplace?
                 </AccordionTrigger>
                 <AccordionContent className="text-[#8B8FA8] px-4 leading-relaxed pb-2">
                   Brands fund the campaign budget upfront. Once your content is posted and verified by our system, funds are released directly to your connected account.
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-6 mb-24 md:mb-32 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4720ca] to-[#5b3fd4]"></div>
        {/* Mock noise mapping */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjVHlgoysSroFCYsun-AXenpxH8tPVNPx9LwnlEPofDf1t-i14BpCHzAxCnG8JCx8dVkGMik2qp251M89_fYFEyHhTdzRrPvFsP93qoe2Bhuie1z45hizQNuz91g2fqo7wjBUHSLEPD_RHruwWZfl0QAK_fwmh1qmuyuq9HuKA1Yz-ZYe_m8pdZPGVaP1V7J-cWLCRVF3FOQipTTFNiWfRE8lcBr5EACJs4A04hLwRvjGGrn3IVSJGf7bNGo5VsRAt4ml3YNBq6J6h')]"></div>
        
        <div className="relative z-10 py-24 px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8 max-w-4xl mx-auto">Your next 10,000 followers are waiting.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="px-10 py-5 bg-white text-[#5b3fd4] font-extrabold text-lg rounded-xl shadow-2xl hover:scale-105 transition-transform">
              Start Free Trial
            </Link>
            <p className="text-white/80 text-sm font-medium">No credit card required. 14-day free trial.</p>
          </div>
        </div>
        
        {/* Decor */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#11131e] w-full border-t border-[#484554]/15">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold tracking-tighter text-[#e1e1f2] mb-6 flex items-center gap-2">
              influence.uz <div className="w-1.5 h-1.5 rounded-full bg-[#5b3fd4]"></div>
            </div>
            <p className="text-[#8B8FA8] text-sm leading-relaxed mb-6 max-w-xs">Empowering creators with data-driven insights to dominate the digital landscape.</p>
            <div className="flex gap-4">
              <a href="#" className="text-[#8B8FA8] hover:text-[#c9bfff] transition-colors"><Globe className="w-5 h-5"/></a>
              <a href="#" className="text-[#8B8FA8] hover:text-[#c9bfff] transition-colors"><Share2 className="w-5 h-5"/></a>
              <a href="#" className="text-[#8B8FA8] hover:text-[#c9bfff] transition-colors"><AtSign className="w-5 h-5"/></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[#c9bfff] font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Creators</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Intelligence</a></li>
              <li><a href="#pricing" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#c9bfff] font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#c9bfff] font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Legal</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-[#c9c4d7] hover:text-[#5b3fd4] text-sm transition-colors">API Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#484554]/15 px-6 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[#8B8FA8] text-sm">© 2024 Influence.uz. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer text-[#8B8FA8] hover:text-[#c9bfff] transition-colors">
                <Globe className="w-4 h-4"/>
                <span className="text-sm font-medium">English (US)</span>
                <ChevronDown className="w-4 h-4"/>
              </div>
              <div className="flex items-center gap-2 border border-[#484554]/30 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9c4d7]">Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
