"use client";

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
}

export default function AreaChart({ data, xKey, yKey, color = "#5B3FD4" }: AreaChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} hide />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={yKey}
            stroke={color}
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
