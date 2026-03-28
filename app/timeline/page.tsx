"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Clock } from "lucide-react";

export default function TimelinePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-01T00:00:00");

    const timer = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0e18] text-[#e1e1f2] font-sans overflow-hidden selection:bg-[#5b3fd4] selection:text-white relative flex flex-col items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#5b3fd4]/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#7B61FF]/10 blur-[80px] rounded-full"></div>
      </div>

      {/* Nav Link back to Home */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group text-[#c9c4d7] hover:text-[#e1e1f2] transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm tracking-tight">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-[#e1e1f2]">influence.uz</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#5b3fd4]"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto">

        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5b3fd4]/40 bg-[#5b3fd4]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#c9bfff]" />
          <span className="text-[#c9bfff] text-[0.6875rem] font-semibold uppercase tracking-widest">The Next Era of influence.uz</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white drop-shadow-xl">
          Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9bfff] to-[#7B61FF]">massive</span> is coming.
        </h1>

        <p className="text-[#c9c4d7] text-lg md:text-xl max-w-2xl mb-16 opacity-90">
          We are building the ultimate creator ecosystem. Mark your calendars for June 1st, 2026.
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center bg-[#1d1f2b]/40 border border-[#5b3fd4]/20 backdrop-blur-xl rounded-3xl w-24 h-24 md:w-32 md:h-32 shadow-[0_8px_32px_rgba(91,63,212,0.1)] relative overflow-hidden group hover:border-[#5b3fd4]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-4xl md:text-5xl font-black text-white tracking-tighter font-mono drop-shadow-md">
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#c9bfff] font-bold mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-center gap-3">
          <Clock className="w-4 h-4 text-[#938ea0]" />
          <p className="text-sm text-[#938ea0] font-medium tracking-wide">June 1, 2026</p>
        </div>

      </div>
    </div>
  );
}
