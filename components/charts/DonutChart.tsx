"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export default function DonutChart({ data, height = 200 }: DonutChartProps) {
  const highestValue = Math.max(...data.map(d => d.value));

  return (
    <div className="flex flex-col h-full">
      <div className="relative mx-auto mb-8" style={{ height, width: height }}>
        {/* Subtle center glow */}
        <div className="absolute inset-10 rounded-full bg-[#5b3fd4]/5 blur-xl pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="95%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              itemStyle={{ color: "#e1e1f2", fontWeight: "bold", fontSize: "12px" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-[#e1e1f2] leading-none">{highestValue}%</span>
          <span className="text-[10px] font-bold text-[#c9c4d7] uppercase mt-1">Reels</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-4 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs font-medium text-[#e1e1f2]">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-[#e1e1f2]">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
