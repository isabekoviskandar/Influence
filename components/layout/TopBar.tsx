export default function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="text-text-secondary">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary" />
        <span className="text-sm font-medium">Username</span>
      </div>
    </header>
  );
}
