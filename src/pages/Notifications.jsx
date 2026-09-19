import React, { useState } from "react";
import { Bell, Check, Trash2, BellOff } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useDummyData } from "@/lib/DummyDataContext";

const CATEGORIES = ["All", "System", "Transactions", "Market"];

export default function Notifications() {
  const { notifications, markAllRead, clearAll, markRead } = useDummyData();
  const [cat, setCat] = useState("All");

  const filtered = cat === "All" ? notifications : notifications.filter((n) => n.category === cat);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread notification${unread === 1 ? "" : "s"}`}
        action={
          <div className="flex gap-2">
            <button onClick={markAllRead} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Check className="h-4 w-4" /> Mark all read
            </button>
            <button onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3.5 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
              <Trash2 className="h-4 w-4" /> Clear all
            </button>
          </div>
        }
      />

      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              cat === c ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-elev divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-400">
            <BellOff className="h-10 w-10 mb-3" />
            <p className="text-sm">No notifications to display.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 px-5 py-4 ${n.read ? "" : "bg-blue-50/30"}`}>
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${n.read ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-600"}`}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-800">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium">{n.category}</span>
                  <span>·</span>
                  <span>{n.time}</span>
                </div>
              </div>
              {!n.read && (
                <button onClick={() => markRead(n.id)} className="text-xs text-blue-600 font-medium hover:underline shrink-0">Mark read</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}