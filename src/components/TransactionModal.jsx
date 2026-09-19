import React, { useState } from "react";
import { X, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDummyData } from "@/lib/DummyDataContext";
import { formatCurrency } from "@/lib/dummyData";

const TYPES = [
  { key: "Deposit", icon: ArrowDownLeft, hint: "Add funds to your account" },
  { key: "Withdraw", icon: ArrowUpRight, hint: "Remove funds from your account" },
  { key: "Transfer", icon: ArrowLeftRight, hint: "Move funds between accounts" },
];

export default function TransactionModal({ open, onClose }) {
  const { addTransaction } = useDummyData();
  const [type, setType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    const record = addTransaction({ type, amount: amt, currency: "USD", recipient: "Jane Maria Sanders", note: `${type} initiated via dashboard` });
    setSubmitted(record);
  };

  const reset = () => {
    setAmount("");
    setType("Deposit");
    setSubmitted(null);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => { onClose(); reset(); }} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elev-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Make a Transaction</h3>
          <button onClick={() => { onClose(); reset(); }} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Transaction Submitted</h4>
            <p className="text-sm text-slate-500 mt-1">Your {submitted.type.toLowerCase()} is now being processed.</p>
            <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left space-y-2">
              <Row label="Transaction ID" value={submitted.id} />
              <Row label="Type" value={submitted.type} />
              <Row label="Amount" value={formatCurrency(submitted.amount, submitted.currency)} />
              <Row label="Date" value={submitted.date} />
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-sm text-slate-500">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Pending
                </span>
              </div>
            </div>
            <Button onClick={() => { onClose(); reset(); }} className="w-full mt-6">Done</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Transaction Type</label>
              <div className="grid grid-cols-3 gap-2">
                {TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setType(t.key)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-colors ${
                        type === t.key
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {t.key}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-slate-200 pl-7 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              {error && <p className="text-xs text-rose-500 mt-1.5">{error}</p>}
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-xs text-amber-700">
              All transactions are processed as <span className="font-semibold">Pending</span> and remain pending until reviewed.
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => { onClose(); reset(); }} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1">Submit</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}