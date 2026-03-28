"use client";

import { useId } from "react";
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface AreaChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  color?: string;
  height?: number | string;
}

export default function AreaChart({ data, color = "#5b3fd4", height = 250 }: AreaChartProps) {
  const chartId = useId();
  const gradientId = `areaGradient-${chartId}`;

  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <Tooltip 
            contentStyle={{ backgroundColor: "#323440", borderColor: "rgba(72, 69, 84, 0.3)", borderRadius: "8px", color: "#e1e1f2", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            labelStyle={{ color: "#c9c4d7", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [new Intl.NumberFormat('en-US').format(value), ""]}
          />
          <Area 
            type="monotone" 
            dataKey="views" 
            stroke={color} 
            strokeWidth={3}
            fill={`url(#${gradientId})`} 
            activeDot={{ r: 4, fill: color, stroke: "#11131e", strokeWidth: 2, className: "shadow-[0_0_15px_#5b3fd4]" }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
