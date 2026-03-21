export default function MetricCard({ title, value, change, trend }: { title: string, value: string, change: string, trend: "up" | "down" }) {
  return (
    <div className="bg-surface border border-border p-6 rounded-card transition-all hover:border-brand-primary/50">
      <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-3xl font-bold text-text-primary">{value}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-pill ${trend === "up" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
          {trend === "up" ? "+" : "-"}{change}
        </span>
      </div>
    </div>
  );
}
