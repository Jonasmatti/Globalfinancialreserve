import React, { useState } from "react";
import { Smartphone, KeyRound, History, ShieldCheck, Copy } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { LOGIN_ACTIVITY } from "@/lib/dummyData";

const BACKUP_CODES = ["GFR-4827", "GFR-9153", "GFR-2604", "GFR-7391", "GFR-5186"];

export default function SecurityCenter() {
  const [twoFA, setTwoFA] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCodes = () => {
    navigator.clipboard?.writeText(BACKUP_CODES.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Security Center" subtitle="Manage your account security and review activity." />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Smartphone className="h-5 w-5" /></div>
              <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
            </div>
            <button
              onClick={() => setTwoFA((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${twoFA ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFA ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          {twoFA ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center rounded-xl border border-slate-200 p-5">
                <div className="h-36 w-36 rounded-lg bg-white border-2 border-slate-300 grid grid-cols-7 grid-rows-7 gap-px p-2">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className="rounded-[1px]" style={{ background: (i * 7 + 3) % 3 === 0 ? "#0f172a" : "transparent" }} />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">Scan with your authenticator app</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Backup Codes</span>
                  <button onClick={copyCodes} className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                    <Copy className="h-3 w-3" /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {BACKUP_CODES.map((c) => (
                    <div key={c} className="rounded-lg bg-slate-50 border border-slate-200 px-2 py-1.5 text-center text-xs font-mono font-semibold text-slate-700">{c}</div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Two-factor authentication is currently disabled. Enable it for an extra layer of security.</p>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><KeyRound className="h-5 w-5" /></div>
            <h3 className="font-semibold text-slate-900">PIN Management</h3>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-emerald-700 font-medium">Your PIN is active and secure.</span>
          </div>
          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold">Change PIN</button>
          <div className="mt-4 text-xs text-slate-500 leading-relaxed">
            Your 4-digit PIN is required at every sign-in. Keep it confidential and change it periodically for maximum security.
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-elev">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
          <History className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Recent Login Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Device</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LOGIN_ACTIVITY.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 text-slate-600">{a.date}</td>
                  <td className="px-5 py-3.5 text-slate-600">{a.time}</td>
                  <td className="px-5 py-3.5 text-slate-600">{a.location}</td>
                  <td className="px-5 py-3.5 text-slate-600">{a.device}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${a.status === "Success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${a.status === "Success" ? "bg-emerald-500" : "bg-rose-500"}`} /> {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}