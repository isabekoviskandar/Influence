"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Mock checking admin role auth
    const userRole = 'admin'; // mock bypass
    if (userRole !== 'admin') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex h-screen w-full bg-[#0D0F1A] text-[#e1e1f2] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar relative">
        {children}
      </div>
    </div>
  );
}
