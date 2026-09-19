import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet, TrendingUp, PieChart as PieIcon, ArrowUpRight, ArrowDownRight, Plus, Receipt as ReceiptIcon,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, PieChart, Pie, Cell,
} from "recharts";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import TransactionModal from "@/components/TransactionModal";
import ReceiptModal from "@/components/ReceiptModal";
import { useDummyAuth } from "@/lib/DummyAuthContext";
import { useDummyData } from "@/lib/DummyDataContext";
import {
  PORTFOLIO, PERFORMANCE_DATA, ASSET_ALLOCATION, formatCurrency, formatDate,
} from "@/lib/dummyData";

const sparkData = PERFORMANCE_DATA.slice(-12).map((p) => ({ date: p.date.slice(5), value: p.value }));

export default function Dashboard() {
  const { user } = useDummyAuth();
  const { transactions } = useDummyData();
  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const completed = transactions.filter((t) => t.status === "Completed");
  const pending = transactions.filter((t) => t.status === "Pending");

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user.fullName.split(" ")[0]}`}
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" /> Make Transaction
          </button>
        }
      />

      <div className="rounded-2xl bg-sovereign text-white p-6 sm:p-8 mb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-blue-200/70 text-sm">Total Portfolio Value</div>
            <div className="text-4xl sm:text-5xl font-bold mt-1">{formatCurrency(PORTFOLIO.currentValue)}</div>
            <div className="flex items-center gap-4 mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-sm font-semibold">
                <ArrowUpRight className="h-4 w-4" /> +{PORTFOLIO.change24h}% (24h)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 text-blue-200 px-3 py-1 text-sm font-semibold">
                +{PORTFOLIO.growthPct}% all-time
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-xs text-blue-200/60">Original Investment</div>
                <div className="text-lg font-semibold mt-0.5">{formatCurrency(PORTFOLIO.originalInvestment)}</div>
              </div>
              <div>
                <div className="text-xs text-blue-200/60">Total Returns</div>
                <div className="text-lg font-semibold text-emerald-300 mt-0.5">+{formatCurrency(PORTFOLIO.totalReturns)}</div>
              </div>
              <div>
                <div className="text-xs text-blue-200/60">Growth</div>
                <div className="text-lg font-semibold text-emerald-300 mt-0.5">+{PORTFOLIO.growthPct}%</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-blue-200/70 mb-2">Portfolio Trend</div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={sparkData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#spark)" />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, fontSize: 12, color: "#fff" }}
                  formatter={(v) => [formatCurrency(v), "Value"]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Daily Return" value="+2.4%" change="+$24,560 today" icon={TrendingUp} accent="emerald" />
        <StatCard label="Total Investments" value={formatCurrency(PORTFOLIO.originalInvestment)} icon={Wallet} accent="blue" />
        <StatCard label="Active Portfolios" value="6" icon={PieIcon} accent="amber" />
        <StatCard label="Pending Transactions" value={String(pending.length)} icon={ArrowDownRight} accent="slate" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-elev">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
            <Link to="/transactions" className="text-sm text-blue-600 hover:underline font-medium">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${t.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {t.type === "Deposit" || t.type === "Direct Deposit" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{t.type}</div>
                    <div className="text-xs text-slate-500">{formatDate(t.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900">{formatCurrency(t.amount, t.currency)}</div>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${t.status === "Completed" ? "text-emerald-600" : "text-amber-600"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${t.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {t.status}
                    </span>
                  </div>
                  {t.status === "Completed" && (
                    <button onClick={() => setReceipt(t)} className="text-slate-400 hover:text-blue-600" title="View receipt">
                      <ReceiptIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={ASSET_ALLOCATION} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={2}>
                {ASSET_ALLOCATION.map((a) => <Cell key={a.name} fill={a.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {ASSET_ALLOCATION.map((a) => (
              <div key={a.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} /> {a.name}
                </span>
                <span className="font-medium text-slate-800">{a.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ReceiptModal transaction={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}