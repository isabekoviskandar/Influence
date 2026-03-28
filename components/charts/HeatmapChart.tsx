"use client";

interface HeatmapChartProps {
  data: number[][]; // 6 rows (times) x 7 cols (days)
}

// Map value 0-100 to an activity heat level tailwind class
// Colors from HTML: #1E2035 (low) -> #323440 -> #5b3fd4/40 -> #5b3fd4/60 -> #7B61FF (peak)
function getHeatClass(value: number) {
  if (value < 20) return "bg-[#323440]";
  if (value < 40) return "bg-[#5b3fd4]/40";
  if (value < 70) return "bg-[#5b3fd4]/60";
  return "bg-[#7B61FF] shadow-[0_0_10px_#7B61FF55]";
}

export default function HeatmapChart({ data }: HeatmapChartProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {data.map((row, rowIndex) => 
          row.map((val, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`h-6 rounded-sm transition-colors duration-300 hover:opacity-80 cursor-pointer ${getHeatClass(val)}`}
              title={`Activity level: ${val}%`}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-between mt-6 text-[10px] font-bold text-[#c9c4d7] uppercase">
        <span>Low activity</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-[#323440] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#5b3fd4]/40 rounded-sm"></div>
          <div className="w-3 h-3 bg-[#5b3fd4]/60 rounded-sm"></div>
          <div className="w-3 h-3 bg-[#7B61FF] rounded-sm shadow-[0_0_10px_#7B61FF55]"></div>
        </div>
        <span>Peak</span>
      </div>
    </div>
  );
}
