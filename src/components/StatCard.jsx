import React from "react";

export default function StatCard({ label, value, change, icon: Icon, accent = "blue" }) {
  const accents = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">{value}</div>
        </div>
        {Icon && (
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accents[accent]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 text-sm font-medium text-emerald-600 flex items-center gap-1">
          {change}
        </div>
      )}
    </div>
  );
}