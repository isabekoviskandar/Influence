"use client";

import { useState } from "react";
import { 
  User, Shield, Bell, Globe, Camera, Save, Key, LogOut, 
  Check, Instagram, Youtube, Send, Trash2, MoreHorizontal, Plus as PlusIcon 
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account & Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Globe },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Settings</h2>
          <p className="text-sm text-[#8B8FA8]">Manage your creator profile and account preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${saved ? "bg-emerald-500 text-white" : "bg-[#5B3FD4] hover:bg-[#4720ca] text-white shadow-[#5B3FD4]/20"}`}
        >
          {saved ? <Check size={18} /> : <Save size={18} />}
          {saved ? "Changes Saved" : "Save All Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar (Inline) */}
        <aside className="w-full lg:w-64 flex flex-row lg:flex-col gap-1 bg-[#191b26] p-2 rounded-2xl border border-[#1E2035] h-fit sticky top-24 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border-2 ${activeTab === tab.id ? "bg-[#323440] border-[#5B3FD4]/30 text-white shadow-xl" : "bg-transparent border-transparent text-[#8B8FA8] hover:bg-[#1d1f2b] hover:text-white"}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-8">
          
          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <section className="bg-[#191b26] p-8 rounded-3xl border border-[#1E2035] space-y-8">
                <div className="flex items-center gap-8">
                  <div className="relative group">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGta3HB0324iyCxXh5o06RUEdbTIUbSUq0LN2mYBC3YhlvBEkS3VFonp1VRWCyQpY7Nal0lIMw4dFoQ8CxiOVIcPffECjNCUktP4HxzXdZHpksnaxw4Rf61obc-8CoQfyv7PHoAZVOPHgc33EHpTq8IerKtBT2chKROdhWvluWWJw0wkCMrySeigR_mYBAlQ_A0Ikzmzsl--7l9nSb2ZWDVMnF1e2LQrNy3k2DOI3WLwrpWxI8SuGJt9JVqzoNatFQzSVFQOaWJbU5" 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#323440] group-hover:opacity-50 transition-opacity"
                    />
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <Camera size={24} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Alex Creator</h3>
                    <p className="text-sm text-[#8B8FA8]">Member since October 2023</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-[#5B3FD4]/10 text-[#7B61FF] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[#5B3FD4]/20">Pro Plan</span>
                      <span className="bg-[#1d1f2b] text-[#8B8FA8] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[#1E2035]">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1E2035]/50">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest">Full Name</label>
                    <input defaultValue="Alex Creator" className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl px-4 py-3 text-sm text-white focus:border-[#5B3FD4] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest">Display Name</label>
                    <input defaultValue="@alex_content" className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl px-4 py-3 text-sm text-white focus:border-[#5B3FD4] outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest">Short Bio</label>
                    <textarea defaultValue="Building the future of the creator economy in Uzbekistan. Sharing tips on AI and productivity." rows={3} className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl px-4 py-3 text-sm text-white focus:border-[#5B3FD4] outline-none transition-all resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest">Primary Niche</label>
                    <select className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl px-4 py-3 text-sm text-white focus:border-[#5B3FD4] outline-none transition-all appearance-none cursor-pointer">
                      <option>Technology & AI</option>
                      <option>Lifestyle</option>
                      <option>Education</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest">Language Preference</label>
                    <select className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-xl px-4 py-3 text-sm text-white focus:border-[#5B3FD4] outline-none transition-all appearance-none cursor-pointer">
                      <option>English (US)</option>
                      <option>Uzbek (O&apos;zbek)</option>
                      <option>Russian (Русский)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Account Security */}
          {activeTab === "account" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <section className="bg-[#191b26] p-8 rounded-3xl border border-[#1E2035] space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="text-[#5B3FD4]" size={20} />
                  <h3 className="text-lg font-bold text-white">Security Controls</h3>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-[#0c0e18] rounded-2xl border border-[#1E2035]">
                      <div>
                        <p className="text-sm font-bold text-white mb-1">Two-Factor Authentication</p>
                        <p className="text-xs text-[#8B8FA8]">Add an extra layer of security to your account.</p>
                      </div>
                      <div className="w-12 h-6 bg-[#323440] rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-[#8B8FA8] rounded-full"></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-[#0c0e18] rounded-2xl border border-[#1E2035]">
                      <div>
                        <p className="text-sm font-bold text-white mb-1">Change Password</p>
                        <p className="text-xs text-[#8B8FA8]">Last changed 3 months ago.</p>
                      </div>
                      <button className="text-[10px] font-bold text-[#c9bfff] uppercase tracking-widest bg-[#5B3FD4]/10 px-4 py-2 rounded-lg border border-[#5B3FD4]/20 hover:bg-[#5B3FD4]/20 transition-all">Update</button>
                   </div>
                </div>
              </section>

              <section className="bg-[#191b26] p-8 rounded-3xl border border-red-500/20 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trash2 className="text-red-500" size={20} />
                  <h3 className="text-lg font-bold text-white">Danger Zone</h3>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                   <div>
                     <p className="text-sm font-bold text-white mb-1">Delete Account</p>
                     <p className="text-xs text-red-400/70">Once you delete your account, there is no going back. Please be certain.</p>
                   </div>
                   <button className="bg-red-500/10 text-red-500 px-6 py-2.5 rounded-xl text-xs font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Delete Everything</button>
                </div>
              </section>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <section className="bg-[#191b26] p-8 rounded-3xl border border-[#1E2035] space-y-6">
                <h3 className="text-lg font-bold text-white mb-6">Connected Platforms</h3>
                <div className="space-y-4">
                   {[
                     { name: "Instagram", icon: Instagram, color: "text-pink-500", status: "Connected", user: "@alex_creator" },
                     { name: "YouTube", icon: Youtube, color: "text-red-500", status: "Connected", user: "Alex Studio" },
                     { name: "Telegram", icon: Send, color: "text-blue-400", status: "Disconnected", user: "—" },
                   ].map((platform) => (
                     <div key={platform.name} className="flex items-center justify-between p-5 bg-[#0c0e18] rounded-2xl border border-[#1E2035] hover:border-[#323440] transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={`p-3 bg-[#1d1f2b] rounded-xl border border-[#323440] ${platform.color}`}>
                             <platform.icon size={24} />
                           </div>
                           <div>
                             <p className="text-sm font-bold text-white mb-0.5">{platform.name}</p>
                             <p className="text-xs text-[#8B8FA8]">{platform.user}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${platform.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#323440] text-[#8B8FA8] border border-[#484554]/20'}`}>
                             {platform.status}
                           </span>
                           <button className="text-[#8B8FA8] hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full py-4 border-2 border-dashed border-[#323440] text-[#8B8FA8] rounded-2xl text-sm font-bold hover:border-[#5B3FD4] hover:text-white transition-all flex items-center justify-center gap-2 mt-4">
                  <PlusIcon size={20} /> Connect New Platform
                </button>
              </section>
            </div>
          )}

          {/* Notifications Placeholder */}
          {activeTab === "notifications" && (
            <div className="bg-[#191b26] p-12 rounded-3xl border border-[#1E2035] text-center animate-in slide-in-from-right-4 duration-500">
               <Bell className="mx-auto w-12 h-12 text-[#5B3FD4] mb-4 opacity-50" />
               <h3 className="text-xl font-bold text-white mb-2">Notification Center</h3>
               <p className="text-sm text-[#8B8FA8] max-w-sm mx-auto mb-8">Manage how you receive alerts about brand deals, analytics spikes, and platform updates.</p>
               <div className="max-w-md mx-auto space-y-4 text-left">
                  <div className="flex items-center justify-between p-4 bg-[#0c0e18] rounded-xl border border-[#1E2035]">
                    <span className="text-sm font-medium text-white">Email alerts for brand deals</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-[#323440] border-[#5B3FD4]" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0c0e18] rounded-xl border border-[#1E2035]">
                    <span className="text-sm font-medium text-white">New message push notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-[#323440] border-[#5B3FD4]" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0c0e18] rounded-xl border border-[#1E2035]">
                    <span className="text-sm font-medium text-white">Weekly analytics report</span>
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#323440] border-[#5B3FD4]" />
                  </div>
               </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer / Logout */}
      <footer className="mt-8 pt-8 border-t border-[#1E2035] flex justify-end">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors">
          <LogOut size={20} /> Logout Account
        </button>
      </footer>
    </div>
  );
}

