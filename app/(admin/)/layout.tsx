export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-xl font-bold mb-6 text-brand-primary">Admin Panel</h2>
        {/* Admin Navigation */}
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6">
          <span className="font-medium">System Administration</span>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
