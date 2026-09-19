import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import PageHeader from "@/components/PageHeader";
import { ASSET_ALLOCATION, SECTOR_PERFORMANCE, PORTFOLIO, formatCurrency } from "@/lib/dummyData";

export default function AssetAllocation() {
  return (
    <div>
      <PageHeader title="Asset Allocation" subtitle="A diversified portfolio across asset classes and sectors." />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Portfolio Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={ASSET_ALLOCATION} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
                {ASSET_ALLOCATION.map((a) => <Cell key={a.name} fill={a.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v, n) => [`${v}%`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {ASSET_ALLOCATION.map((a) => (
              <div key={a.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{a.name}</div>
                    <div className="text-xs text-slate-500">{a.detail}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">{a.value}%</div>
                  <div className="text-xs text-slate-500">{formatCurrency(PORTFOLIO.currentValue * a.value / 100)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Sector Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={SECTOR_PERFORMANCE} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} unit="%" />
              <YAxis type="category" dataKey="sector" tick={{ fontSize: 12, fill: "#475569" }} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`, "Change"]} />
              <Bar dataKey="change" radius={[0, 6, 6, 0]}>
                {SECTOR_PERFORMANCE.map((s) => (
                  <Cell key={s.sector} fill={s.change >= 0 ? "#10b981" : "#f43f5e"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Allocation Breakdown Detail</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSET_ALLOCATION.map((a) => (
            <div key={a.name} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                <span className="text-sm font-medium text-slate-800">{a.name}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{a.value}%</div>
              <div className="text-xs text-slate-500 mt-1">{a.detail}</div>
              <div className="text-sm font-semibold text-blue-700 mt-2">{formatCurrency(PORTFOLIO.currentValue * a.value / 100)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}