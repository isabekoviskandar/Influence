import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  trendIndicator?: ReactNode;
}

export default function MetricCard({ title, value, trendIndicator }: MetricCardProps) {
  return (
    <div className="bg-[#191b26] p-6 rounded-2xl shadow-sm border border-[#484554]/5 flex flex-col justify-between">
      <p className="text-xs font-semibold text-[#c9c4d7] uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-[#e1e1f2] tracking-tighter">{value}</h3>
        {trendIndicator && (
          <div className="flex items-center">
            {trendIndicator}
          </div>
        )}
      </div>
    </div>
  );
}
