import React, { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { PERFORMANCE_DATA, PORTFOLIO, formatCurrency } from "@/lib/dummyData";

const FILTERS = [
  { key: "1M", months: 1 },
  { key: "3M", months: 3 },
  { key: "6M", months: 6 },
  { key: "1Y", months: 12 },
  { key: "All", months: null },
];

export default function PortfolioPerformance() {
  const [filter, setFilter] = useState("All");
  const months = FILTERS.find((f) => f.key === filter).months;
  const data = months ? PERFORMANCE_DATA.slice(-months - 1) : PERFORMANCE_DATA;
  const values = data.map((d) => d.value);
  const best = data.reduce((a, b) => (b.value > a.value ? b : a));
  const worst = data.reduce((a, b) => (b.value < a.value ? b : a));
  const avgReturn = (((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1);

  return (
    <div>
      <PageHeader title="Portfolio Performance" subtitle="Track the growth of your investment over time." />

      <div className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.key ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {f.key}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Best Day" value={formatCurrency(best.value)} icon={TrendingUp} accent="emerald" />
        <StatCard label="Worst Day" value={formatCurrency(worst.value)} icon={TrendingDown} accent="amber" />
        <StatCard label="Average Return" value={`${avgReturn}%`} icon={Calendar} accent="blue" />
        <StatCard label="Total Return" value={`+${formatCurrency(PORTFOLIO.totalReturns)}`} icon={TrendingUp} accent="emerald" />
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-900">Growth Trajectory</h3>
            <p className="text-xs text-slate-500">From May 5, 2023 to present</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Current Value</div>
            <div className="text-lg font-bold text-slate-900">{formatCurrency(PORTFOLIO.currentValue)}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="perf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} minTickGap={30} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} domain={["dataMin - 20000", "dataMax + 20000"]} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
              formatter={(v) => [formatCurrency(v), "Value"]}
            />
            <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} fill="url(#perf)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}