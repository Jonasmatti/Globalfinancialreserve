import React, { useState } from "react";
import { Search, Receipt as ReceiptIcon, ArrowDownRight, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ReceiptModal from "@/components/ReceiptModal";
import { useDummyData } from "@/lib/DummyDataContext";
import { formatCurrency, formatDate } from "@/lib/dummyData";

const TYPE_FILTERS = ["All", "Deposit", "Withdraw", "Transfer", "Direct Deposit"];

export default function Transactions() {
  const { transactions } = useDummyData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [receipt, setReceipt] = useState(null);

  const filtered = transactions.filter((t) => {
    const matchSearch = t.type.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.type === filter;
    return matchSearch && matchFilter;
  });

  const typeIcon = (type) => {
    if (type === "Deposit" || type === "Direct Deposit") return ArrowDownRight;
    if (type === "Transfer") return ArrowLeftRight;
    return ArrowUpRight;
  };

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Your complete transaction history." />

      <div className="rounded-2xl bg-white border border-slate-200 shadow-elev">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by type or ID..."
              className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  filter === f ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">No transactions found.</td></tr>
              )}
              {filtered.map((t) => {
                const Icon = typeIcon(t.type);
                return (
                  <tr key={t.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 text-slate-600">{formatDate(t.date)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${t.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{t.type}</div>
                          <div className="text-xs text-slate-400">{t.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{formatCurrency(t.amount, t.currency)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        t.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${t.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {t.status === "Completed" ? (
                        <button onClick={() => setReceipt(t)} className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium">
                          <ReceiptIcon className="h-4 w-4" /> Receipt
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Processing...</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptModal transaction={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}