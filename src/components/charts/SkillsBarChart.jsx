"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

export default function SkillsBarChart({ data }) {
  // Use provided data or fallback to local static data
  const chartData = data && data.length > 0 
    ? data.map((d, i) => ({
        name: d.skill || d.name,
        count: d.count || d.percentage || 0,
        fill: `rgba(0, 255, 187, ${1 - i * 0.1})`
      }))
    : [
        { name: "Python", count: 45, fill: "#00ffbb" },
        { name: "SQL", count: 38, fill: "#0debb4" },
        { name: "AWS", count: 32, fill: "#1bd7ae" },
        { name: "Docker", count: 28, fill: "#29c3a8" },
        { name: "PyTorch", count: 24, fill: "#37afa1" },
      ];

  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{ 
              background: "#0a1f1a", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#fff"
            }}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
