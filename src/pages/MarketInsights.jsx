import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Newspaper } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { MARKET_INDICES, TOP_GAINERS, TOP_LOSERS, MARKET_NEWS, SECTOR_PERFORMANCE } from "@/lib/dummyData";

export default function MarketInsights() {
  return (
    <div>
      <PageHeader title="Market Insights" subtitle="Stay informed with the latest market trends and financial news." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {MARKET_INDICES.map((idx) => (
          <div key={idx.name} className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
            <div className="text-xs text-slate-500 uppercase tracking-wide">{idx.name}</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{idx.value}</div>
            <div className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold ${idx.up ? "text-emerald-600" : "text-rose-500"}`}>
              {idx.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(idx.change)}%
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-elev">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
            <Newspaper className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Latest News</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {MARKET_NEWS.map((n, i) => (
              <div key={i} className="px-5 py-4 hover:bg-slate-50/50 cursor-pointer">
                <h4 className="text-sm font-medium text-slate-800 leading-snug">{n.headline}</h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span className="font-medium text-blue-600">{n.source}</span>
                  <span>·</span>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /> Top Gainers</h3>
            <div className="space-y-3">
              {TOP_GAINERS.map((g) => (
                <div key={g.ticker} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{g.ticker}</div>
                    <div className="text-xs text-slate-500">{g.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">{g.price}</div>
                    <div className="text-xs font-semibold text-emerald-600">+{g.change}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><TrendingDown className="h-4 w-4 text-rose-500" /> Top Losers</h3>
            <div className="space-y-3">
              {TOP_LOSERS.map((g) => (
                <div key={g.ticker} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{g.ticker}</div>
                    <div className="text-xs text-slate-500">{g.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">{g.price}</div>
                    <div className="text-xs font-semibold text-rose-500">{g.change}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Sector Performance</h3>
            <div className="space-y-2.5">
              {SECTOR_PERFORMANCE.map((s) => (
                <div key={s.sector} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{s.sector}</span>
                  <span className={`font-semibold ${s.change >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{s.change >= 0 ? "+" : ""}{s.change}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}