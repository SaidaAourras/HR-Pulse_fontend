"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

const data = [
  { name: "Min Market", value: 62000, fill: "rgba(255,255,255,0.05)" },
  { name: "Avg Market", value: 74500, fill: "rgba(255,255,255,0.1)" },
  { name: "Your Match", value: 89000, fill: "#00ffbb" },
  { name: "Max Market", value: 115000, fill: "rgba(255,255,255,0.05)" },
];

export default function SalaryCompareChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis hide domain={[0, "dataMax + 20000"]} />
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
          <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
