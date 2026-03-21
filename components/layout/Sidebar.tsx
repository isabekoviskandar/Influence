import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brand-primary">influence.uz</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Overview</Link>
        <Link href="/analytics" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Analytics</Link>
        <Link href="/ai-studio" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">AI Studio</Link>
        <Link href="/scheduler" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Scheduler</Link>
        <Link href="/brand-deals" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Brand Deals</Link>
      </nav>
      <div className="p-4 border-t border-border">
        <Link href="/settings" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Settings</Link>
      </div>
    </aside>
  );
}
