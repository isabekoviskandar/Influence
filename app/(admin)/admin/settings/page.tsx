"use client";

import { useState } from "react";
import { Save, Shield, Bell, Globe, Database, Key, Mail, ToggleLeft, ToggleRight } from "lucide-react";

interface ToggleProps { label: string; desc: string; enabled: boolean; onToggle: () => void; }
function SettingToggle({ label, desc, enabled, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#484554]/10 last:border-0">
      <div>
        <p className="text-sm font-semibold text-[#e1e1f2]">{label}</p>
        <p className="text-xs text-[#8B8FA8] mt-0.5">{desc}</p>
      </div>
      <button onClick={onToggle} className="text-[#c9bfff] hover:text-[#5b3fd4] transition-colors">
        {enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-[#484554]" />}
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("influence.uz");
  const [supportEmail, setSupportEmail] = useState("admin@influence.uz");
  const [maxUsers, setMaxUsers] = useState("10000");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState("1000");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-[#0D0F1A]/80 backdrop-blur-xl border-b border-[#1E2035] h-16 px-8 flex justify-between items-center">
        <h2 className="text-[#e1e1f2] font-semibold text-lg">Admin Settings</h2>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${saved ? "bg-emerald-500 text-white" : "bg-[#5b3fd4] hover:bg-[#4720ca] text-white"}`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </header>

      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* General Settings */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#5b3fd4]" />
            <h3 className="text-sm font-bold uppercase tracking-widest">General</h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-2">Site Name</label>
                <input value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-lg px-4 py-2.5 text-sm text-[#e1e1f2] focus:ring-1 focus:ring-[#5b3fd4] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-2">Support Email</label>
                <input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-lg px-4 py-2.5 text-sm text-[#e1e1f2] focus:ring-1 focus:ring-[#5b3fd4] outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-2">Max Users Capacity</label>
                <input type="number" value={maxUsers} onChange={e => setMaxUsers(e.target.value)} className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-lg px-4 py-2.5 text-sm text-[#e1e1f2] focus:ring-1 focus:ring-[#5b3fd4] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-2">API Rate Limit (req/min)</label>
                <input type="number" value={apiRateLimit} onChange={e => setApiRateLimit(e.target.value)} className="w-full bg-[#0c0e18] border border-[#1E2035] rounded-lg px-4 py-2.5 text-sm text-[#e1e1f2] focus:ring-1 focus:ring-[#5b3fd4] outline-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#5b3fd4]" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Notifications</h3>
          </div>
          <div className="px-6">
            <SettingToggle label="Email Notifications" desc="Receive critical system alerts via email" enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} />
            <SettingToggle label="Slack Alerts" desc="Post alerts to your Slack #admin channel" enabled={slackAlerts} onToggle={() => setSlackAlerts(!slackAlerts)} />
          </div>
        </section>

        {/* Security */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#5b3fd4]" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Security</h3>
          </div>
          <div className="px-6">
            <SettingToggle label="Two-Factor Authentication" desc="Require 2FA for all admin accounts" enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
            <SettingToggle label="Maintenance Mode" desc="Show maintenance page to all non-admin users" enabled={maintenanceMode} onToggle={() => setMaintenanceMode(!maintenanceMode)} />
          </div>
        </section>

        {/* Data & Backup */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden">
          <div className="p-6 border-b border-[#484554]/10 flex items-center gap-3">
            <Database className="w-5 h-5 text-[#5b3fd4]" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Data &amp; Backup</h3>
          </div>
          <div className="px-6">
            <SettingToggle label="Automatic Daily Backup" desc="Run full database backup every day at 3:00 AM" enabled={autoBackup} onToggle={() => setAutoBackup(!autoBackup)} />
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-[#e1e1f2]">Last Backup</p>
                <p className="text-xs text-[#8B8FA8] mt-0.5">Oct 30, 2024 at 3:00 AM — Size: 2.4GB</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#272935] text-xs font-bold text-[#e1e1f2] hover:bg-[#323440] transition-all active:scale-95">
                Run Backup Now
              </button>
            </div>
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-[#191b26] rounded-3xl border border-[#484554]/10 overflow-hidden mb-12">
          <div className="p-6 border-b border-[#484554]/10 flex items-center gap-3">
            <Key className="w-5 h-5 text-[#5b3fd4]" />
            <h3 className="text-sm font-bold uppercase tracking-widest">API Keys</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: "Stripe Secret Key",    value: "sk_live_••••••••4aB2" },
              { name: "OpenAI API Key",        value: "sk-••••••••xK9m" },
              { name: "Instagram Graph Token", value: "IGQ••••••••3nZA" },
            ].map((k) => (
              <div key={k.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#e1e1f2]">{k.name}</p>
                  <p className="text-xs font-mono text-[#8B8FA8] mt-0.5">{k.value}</p>
                </div>
                <button className="text-xs font-bold text-[#c9bfff] hover:underline">Reveal</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
