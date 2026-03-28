"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUserStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // In a real app, you'd check a token here. Since the prompt asks to 
    // "redirect to /login if no token in Zustand store", we'll check user.
    const token = localStorage.getItem("auth_token");
    if (!token && !user) {
      router.push("/login"); // Redirect to login
    }
  }, [user, router, isMounted]);

  // Prevent hydration errors and flash of unauthenticated content
  if (!isMounted) {
    return <div className="min-h-screen bg-[#11131e]" />;
  }

  return (
    <div className="min-h-screen bg-[#11131e] text-[#e1e1f2]">
      <Sidebar />
      <TopBar />
      <main className="pt-24 lg:pl-[244px] px-4 lg:pr-8 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
