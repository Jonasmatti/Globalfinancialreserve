import React, { useState } from "react";
import { ChevronDown, LifeBuoy, Send, BookOpen, MessageSquare } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { FAQS } from "@/lib/dummyData";

export default function SupportCenter() {
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <PageHeader title="Support Center" subtitle="Find answers and reach out to our team." />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50"
                  >
                    <span className="text-sm font-medium text-slate-800">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && (
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
            <div className="flex items-center gap-2 mb-5">
              <LifeBuoy className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Help Guides</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Getting Started with Your Dashboard",
                "Making Your First Deposit",
                "Understanding Portfolio Performance",
                "Transferring Funds to External Accounts",
                "Securing Your Account with 2FA",
                "Reading Your Transaction Receipts",
              ].map((g) => (
                <div key={g} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3 hover:border-blue-200 cursor-pointer">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0"><BookOpen className="h-4 w-4" /></div>
                  <span className="text-sm font-medium text-slate-700">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6 h-fit">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Contact Support</h3>
          </div>
          {sent ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3"><Send className="h-6 w-6 text-emerald-600" /></div>
              <p className="text-sm font-medium text-slate-800">Message sent!</p>
              <p className="text-xs text-slate-500 mt-1">Our team will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Your Name"><input value={form.name} onChange={(e) => set("name", e.target.value)} required className="input" placeholder="Jane Sanders" /></Field>
              <Field label="Email"><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className="input" placeholder="you@example.com" /></Field>
              <Field label="Subject"><input value={form.subject} onChange={(e) => set("subject", e.target.value)} required className="input" placeholder="How can we help?" /></Field>
              <Field label="Message"><textarea value={form.message} onChange={(e) => set("message", e.target.value)} required rows={4} className="input resize-none" placeholder="Describe your issue..." /></Field>
              <button type="submit" className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`.input{width:100%;border-radius:0.5rem;border:1px solid hsl(214 32% 91%);padding:0.625rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:#2563eb;box-shadow:0 0 0 2px #dbeafe}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}