export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border p-4">
        {/* Placeholder for Sidebar */}
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center px-6">
          <h2 className="text-lg font-semibold">TopBar</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
