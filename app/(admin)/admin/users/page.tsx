"use client";

import { useState } from "react";
import { Search, Download, Bell, HelpCircle, MoreVertical, Camera, Video, Send, ArrowUpCircle, Ban, Mail, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock types & data
type Plan = 'Free' | 'Creator' | 'Pro' | 'Agency';
type Status = 'Active' | 'Pending' | 'Banned';

interface MockUser {
  id: number;
  name: string;
  email: string;
  avatarInfo: { type: 'img', src: string } | { type: 'initials', text: string };
  plan: Plan;
  status: Status;
  platforms: string[]; // 'instagram', 'telegram', 'youtube', 'tiktok'
  joined: string;
  lastActive: string;
  mrr: number;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "Alice Johnson", email: "alice.j@influencer.io", avatarInfo: { type: 'initials', text: 'AJ' }, plan: "Creator", status: 'Active', platforms: ['instagram', 'telegram', 'youtube'], joined: "Oct 12, 2024", lastActive: "2 hours ago", mrr: 12.00 },
  { id: 2, name: "Mark Davids", email: "marky@gmail.com", avatarInfo: { type: 'initials', text: 'MD' }, plan: "Free", status: 'Active', platforms: ['instagram'], joined: "Oct 10, 2024", lastActive: "5 mins ago", mrr: 0.00 },
  { id: 3, name: "Emma Wilson", email: "emma.w@style.com", avatarInfo: { type: 'initials', text: 'EW' }, plan: "Pro", status: 'Active', platforms: ['instagram', 'tiktok'], joined: "Sep 28, 2024", lastActive: "1 day ago", mrr: 29.00 },
  { id: 4, name: "Lucas Chen", email: "l.chen@techreview.io", avatarInfo: { type: 'initials', text: 'LC' }, plan: "Free", status: 'Pending', platforms: ['youtube'], joined: "Sep 15, 2024", lastActive: "3 days ago", mrr: 0.00 },
  { id: 5, name: "Bob Smith", email: "bob.blocked@spam.com", avatarInfo: { type: 'initials', text: 'BS' }, plan: "Free", status: 'Banned', platforms: ['youtube'], joined: "Sep 5, 2024", lastActive: "1 month ago", mrr: 0.00 },
  { id: 6, name: "Maria Garcia", email: "maria.g@lifestyle.es", avatarInfo: { type: 'initials', text: 'MG' }, plan: "Creator", status: 'Active', platforms: ['instagram', 'telegram'], joined: "Aug 22, 2024", lastActive: "12 hours ago", mrr: 12.00 },
  { id: 7, name: "Alex Kumar", email: "alex.dev@code.io", avatarInfo: { type: 'initials', text: 'AK' }, plan: "Pro", status: 'Active', platforms: ['youtube', 'telegram'], joined: "Jul 10, 2024", lastActive: "Just now", mrr: 29.00 },
  { id: 8, name: "Sarah Connor", email: "sarahc@sky.net", avatarInfo: { type: 'initials', text: 'SC' }, plan: "Agency", status: 'Active', platforms: ['instagram', 'telegram'], joined: "Oct 1, 2024", lastActive: "1 hour ago", mrr: 79.00 },
];

export default function UserManagementPage() {
  const [filterTab, setFilterTab] = useState<'all'|'free'|'creator'|'pro'|'agency'|'banned'>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Apply basic filtering mapped to filterTab
  const filteredUsers = mockUsers.filter(user => {
    if (filterTab === 'all') return true;
    if (filterTab === 'banned') return user.status === 'Banned';
    return user.plan.toLowerCase() === filterTab;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedUsers(filteredUsers.map(u => u.id));
    else setSelectedUsers([]);
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) setSelectedUsers(prev => [...prev, id]);
    else setSelectedUsers(prev => prev.filter(userId => userId !== id));
  };

  const PlanBadge = ({ plan }: { plan: Plan }) => {
    switch(plan) {
      case 'Agency': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20">Agency</span>;
      case 'Pro': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/20">Pro</span>;
      case 'Creator': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#5B3FD4]/20 text-[#5B3FD4] border border-[#5B3FD4]/20">Creator</span>;
      case 'Free': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#1d1f2b] text-[#8B8FA8]">Free</span>;
    }
  };

  const StatusPill = ({ status }: { status: Status }) => {
    switch(status) {
      case 'Active': return (
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shadow-[0_0_8px_rgba(29,158,117,0.5)]"></span><span className="text-xs text-[#1D9E75] font-medium">Active</span></div>
      );
      case 'Pending': return (
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#EF9F27]"></span><span className="text-xs text-[#EF9F27] font-medium">Pending</span></div>
      );
      case 'Banned': return (
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A]"></span><span className="text-xs text-[#E24B4A] font-medium">Restricted</span></div>
      );
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Camera size={16} key={platform} className="text-[#8B8FA8]" />;
      case 'telegram': return <Send size={16} key={platform} className="text-[#8B8FA8]" />;
      case 'youtube': return <Video size={16} key={platform} className="text-[#8B8FA8]" />;
      case 'tiktok': return <Video size={16} key={platform} className="text-[#8B8FA8]" />; // Fallback mock
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-20"> {/* pb-20 prevents floating bar overlap */}
      
      {/* Top Search Bar Row */}
      <header className="sticky top-0 right-0 z-40 w-full h-16 bg-[#0D0F1A]/80 backdrop-blur-xl flex items-center justify-between px-8 border-b border-[#1E2035]">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8FA8] w-4 h-4" />
            <input 
              className="w-full bg-[#151729] border border-[#1E2035] rounded-lg pl-10 pr-4 py-2 text-sm text-[#e1e1f2] placeholder:text-[#8B8FA8]/60 focus:outline-none focus:border-[#5B3FD4] transition-all" 
              placeholder="Search by name, email or ID..." 
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-[#151729] border border-[#1E2035] rounded-lg text-xs py-2 px-3 text-[#e1e1f2] focus:outline-none">
              <option>All plans</option>
              <option>Free</option>
              <option>Creator</option>
            </select>
            <select className="bg-[#151729] border border-[#1E2035] rounded-lg text-xs py-2 px-3 text-[#e1e1f2] focus:outline-none">
              <option>All status</option>
              <option>Active</option>
              <option>Banned</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#1E2035] rounded-lg text-xs hover:bg-[#151729] text-[#e1e1f2] transition-colors">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-6">
          <button className="p-2 text-[#8B8FA8] hover:text-[#e1e1f2] transition-colors relative">
            <Bell className="w-5 h-5"/>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#E24B4A] rounded-full"></span>
          </button>
          <button className="p-2 text-[#8B8FA8] hover:text-[#e1e1f2] transition-colors">
            <HelpCircle className="w-5 h-5"/>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="flex flex-col gap-6 mb-8">
          <h2 className="text-2xl font-bold text-[#e1e1f2] tracking-tight">User Management</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#151729] rounded-xl p-4 flex flex-col gap-1 border-l-4 border-[#5B3FD4]">
              <span className="text-[10px] font-semibold text-[#8B8FA8] uppercase tracking-wider">Total</span>
              <span className="text-xl font-bold font-mono text-[#e1e1f2]">2,847</span>
            </div>
            <div className="bg-[#151729] rounded-xl p-4 flex flex-col gap-1 border border-[#1E2035]">
              <span className="text-[10px] font-semibold text-[#8B8FA8] uppercase tracking-wider">Free Users</span>
              <span className="text-xl font-bold font-mono text-[#e1e1f2]">1,204</span>
            </div>
            <div className="bg-[#151729] rounded-xl p-4 flex flex-col gap-1 border border-[#1E2035]">
              <span className="text-[10px] font-semibold text-[#8B8FA8] uppercase tracking-wider">Paying</span>
              <span className="text-xl font-bold font-mono text-[#5B3FD4]">1,643</span>
            </div>
            <div className="bg-[#151729] rounded-xl p-4 flex flex-col gap-1 border-l-4 border-[#E24B4A]/50">
              <span className="text-[10px] font-semibold text-[#8B8FA8] uppercase tracking-wider">Banned</span>
              <span className="text-xl font-bold font-mono text-[#E24B4A]">12</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1E2035] mb-6 overflow-x-auto custom-scrollbar">
          {[
            { id: 'all', label: 'All Users (2,847)' },
            { id: 'free', label: 'Free (1,204)' },
            { id: 'creator', label: 'Creator (980)' },
            { id: 'pro', label: 'Pro (420)' },
            { id: 'agency', label: 'Agency (243)' },
            { id: 'banned', label: 'Banned (12)' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setFilterTab(tab.id as typeof filterTab)}
              className={`px-4 py-2 border-b-2 text-sm transition-colors whitespace-nowrap ${
                filterTab === tab.id 
                  ? "border-[#5B3FD4] text-[#5B3FD4] font-semibold" 
                  : "border-transparent text-[#8B8FA8] hover:text-[#e1e1f2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shadcn Table Configuration */}
        <div className="bg-[#151729] rounded-xl border border-[#1E2035] overflow-hidden relative">
          <Table>
            <TableHeader className="bg-[#1d1f2b] border-b border-[#1E2035]">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-12 text-center pl-6">
                  <input 
                    type="checkbox" 
                    className="rounded bg-[#11131e] border-[#484554] text-[#5B3FD4] focus:ring-[#5B3FD4]"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  />
                </TableHead>
                <TableHead className="w-10">#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="text-right">MRR</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center text-[#8B8FA8]">No users found matching filters.</TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  const isChecked = selectedUsers.includes(user.id);
                  const isBanned = user.status === 'Banned';

                  return (
                    <TableRow 
                      key={user.id} 
                      className={`border-b border-[#1E2035] hover:bg-white/[0.02] transition-colors
                        ${isBanned ? 'bg-[#E24B4A]/5 hover:bg-[#E24B4A]/10 border-l-[3px] border-l-[#E24B4A]/60' : 'border-l-[3px] border-l-transparent'}`
                      }
                    >
                      <TableCell className="pl-6 text-center">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={(e) => handleSelectOne(user.id, e.target.checked)}
                          className={`rounded bg-[#11131e] border-[#484554] text-[#5B3FD4] focus:ring-[#5B3FD4] ${isBanned ? 'border-[#E24B4A]/50 text-[#E24B4A] focus:ring-[#E24B4A]' : ''}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-[#8B8FA8]">{user.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white
                            ${isBanned ? 'bg-[#E24B4A]' : 'bg-[#323440] border border-[#5B3FD4]/20'}`}>
                            {user.avatarInfo.type === 'initials' && user.avatarInfo.text}
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${isBanned ? 'text-[#E24B4A]/90' : 'text-[#e1e1f2]'}`}>{user.name}</p>
                            <p className="text-[11px] text-[#8B8FA8] leading-tight">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PlanBadge plan={user.plan} />
                      </TableCell>
                      <TableCell>
                        <StatusPill status={user.status} />
                      </TableCell>
                      <TableCell>
                        <div className={`flex gap-1.5 ${isBanned && 'opacity-40'}`}>
                          {user.platforms.map(p => getPlatformIcon(p))}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-[#8B8FA8]">{user.joined}</TableCell>
                      <TableCell className="text-xs text-[#8B8FA8] italic">{user.lastActive}</TableCell>
                      <TableCell className={`text-right font-mono font-bold text-sm ${user.mrr > 0 ? (isBanned ? 'text-[#e1e1f2]' : 'text-[#5B3FD4]') : 'text-[#8B8FA8] font-medium'}`}>
                        ${user.mrr.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <button className="p-1 hover:bg-[#1d1f2b] rounded text-[#8B8FA8] transition-colors focus:outline-none focus:ring-1 focus:ring-[#5B3FD4]">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#151729] border-[#1E2035] text-[#e1e1f2] w-40">
                            <DropdownMenuItem className="hover:bg-[#1d1f2b] focus:bg-[#1d1f2b] cursor-pointer text-xs">
                              Review Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#1d1f2b] focus:bg-[#1d1f2b] cursor-pointer text-xs">
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#1E2035]" />
                            <DropdownMenuItem className="hover:bg-[#E24B4A]/10 focus:bg-[#E24B4A]/10 text-[#E24B4A] cursor-pointer text-xs focus:text-[#E24B4A]">
                              Ban Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#272935]/95 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl border border-[#5B3FD4]/30 z-50 animate-in fade-in slide-in-from-bottom-6">
          <p className="text-sm font-bold text-[#e1e1f2]">
            <span className="text-[#5B3FD4]">{selectedUsers.length}</span> user{selectedUsers.length > 1 ? 's' : ''} selected
          </p>
          <div className="w-px h-6 bg-[#484554]/50"></div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/5 rounded-lg text-sm text-[#e1e1f2] transition-colors">
              <ArrowUpCircle className="w-4 h-4" /> Upgrade
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/5 rounded-lg text-sm text-[#e1e1f2] transition-colors">
              <Mail className="w-4 h-4" /> Email
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-[#E24B4A]/10 text-[#E24B4A] rounded-lg text-sm transition-colors">
              <Ban className="w-4 h-4" /> Ban
            </button>
          </div>
          
          <button 
            onClick={() => setSelectedUsers([])} 
            className="ml-2 text-[#8B8FA8] hover:text-[#e1e1f2] transition-colors p-1"
            title="Clear selection"
          >
             <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
