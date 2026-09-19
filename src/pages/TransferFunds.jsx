import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useDummyData } from "@/lib/DummyDataContext";
import { formatCurrency } from "@/lib/dummyData";

const CURRENCIES = ["USD", "EUR", "GBP"];

export default function TransferFunds() {
  const { addTransaction } = useDummyData();
  const [form, setForm] = useState({
    account: "", routing: "", amount: "", currency: "USD", recipient: "", note: "",
  });
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.account || !form.routing || !form.amount || !form.recipient) {
      setError("Please fill in all required fields.");
      return;
    }
    if (parseFloat(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    const record = addTransaction({
      type: "Transfer",
      amount: parseFloat(form.amount),
      currency: form.currency,
      recipient: form.recipient,
      note: `To account ${form.account} — ${form.note || "External transfer"}`,
    });
    setDone(record);
    setForm({ account: "", routing: "", amount: "", currency: "USD", recipient: "", note: "" });
  };

  return (
    <div>
      <PageHeader title="Transfer Funds" subtitle="Send funds to external accounts securely." />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          {done ? (
            <div className="text-center py-10">
              <div className="mx-auto h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Transfer Submitted</h3>
              <p className="text-sm text-slate-500 mt-1">Your transfer is now pending review.</p>
              <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left max-w-sm mx-auto space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Transaction ID</span><span className="font-medium">{done.id}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Amount</span><span className="font-medium">{formatCurrency(done.amount, done.currency)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Recipient</span><span className="font-medium">{done.recipient}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200"><span className="text-slate-500">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-amber-600 font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Pending</span>
                </div>
              </div>
              <button onClick={() => setDone(null)} className="mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold">New Transfer</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Account Number" required>
                  <input value={form.account} onChange={(e) => set("account", e.target.value)} placeholder="000123456789" className="input" />
                </Field>
                <Field label="Routing Number" required>
                  <input value={form.routing} onChange={(e) => set("routing", e.target.value)} placeholder="021000021" className="input" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Amount" required>
                  <input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => set("amount", e.target.value)} placeholder="0.00" className="input" />
                </Field>
                <Field label="Currency">
                  <select value={form.currency} onChange={(e) => set("currency", e.target.value)} className="input">
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Recipient Name" required>
                <input value={form.recipient} onChange={(e) => set("recipient", e.target.value)} placeholder="Full name" className="input" />
              </Field>
              <Field label="Description / Note (optional)">
                <textarea value={form.note} onChange={(e) => set("note", e.target.value)} rows={3} placeholder="Add a note..." className="input resize-none" />
              </Field>
              {error && <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2.5 text-sm text-rose-600">{error}</div>}
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-xs text-amber-700">
                All transfers remain <span className="font-semibold">Pending</span> until reviewed by our team.
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold w-full justify-center">
                <Send className="h-4 w-4" /> Submit Transfer
              </button>
            </form>
          )}
        </div>

        <div className="rounded-2xl bg-sovereign text-white p-6 h-fit">
          <h3 className="font-semibold mb-4">Transfer Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-blue-200/70">Available Balance</span><span className="font-semibold">{formatCurrency(1045700)}</span></div>
            <div className="flex justify-between"><span className="text-blue-200/70">Daily Limit</span><span className="font-semibold">{formatCurrency(50000)}</span></div>
            <div className="flex justify-between"><span className="text-blue-200/70">Fee</span><span className="font-semibold text-emerald-300">Free</span></div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs text-blue-100/70">
            <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> Bank-grade encryption on every transfer.</div>
            <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> Transfers reviewed within 1–3 business days.</div>
            <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> Supports USD, EUR, and GBP currencies.</div>
          </div>
        </div>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid hsl(214 32% 91%);padding:0.625rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:#2563eb;box-shadow:0 0 0 2px #dbeafe}`}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}{required && <span className="text-rose-500"> *</span>}</label>
      {children}
    </div>
  );
}