import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brand-primary">Admin Panel</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Overview</Link>
        <Link href="/admin/users" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Users</Link>
        <Link href="/admin/billing" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Billing</Link>
        <Link href="/admin/platform-analytics" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Platform Stats</Link>
        <Link href="/admin/logs" className="block p-3 rounded-lg hover:bg-white/5 transition-colors">Logs</Link>
      </nav>
    </aside>
  );
}
