import React, { useState } from "react";
import { User, Lock, Palette, Save, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useDummyAuth } from "@/lib/DummyAuthContext";

export default function Settings() {
  const { user } = useDummyAuth();
  const [info, setInfo] = useState({ fullName: user.fullName, email: user.email, phone: user.phone, address: user.address });
  const [prefs, setPrefs] = useState({ theme: "Light", currency: "USD", dateFormat: "MMM D, YYYY" });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setInfo((f) => ({ ...f, [k]: v }));
  const setPref = (k, v) => setPrefs((f) => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Account Settings" subtitle="Manage your personal information and preferences." />

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><User className="h-5 w-5" /></div>
            <h3 className="font-semibold text-slate-900">Personal Information</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name"><input value={info.fullName} onChange={(e) => set("fullName", e.target.value)} className="input" /></Field>
            <Field label="Email"><input value={info.email} onChange={(e) => set("email", e.target.value)} className="input" /></Field>
            <Field label="Phone"><input value={info.phone} onChange={(e) => set("phone", e.target.value)} className="input" /></Field>
            <Field label="Address"><input value={info.address} onChange={(e) => set("address", e.target.value)} className="input" /></Field>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Lock className="h-5 w-5" /></div>
            <h3 className="font-semibold text-slate-900">Security Preferences</h3>
          </div>
          <div className="space-y-3">
            <button type="button" className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left hover:bg-slate-50">
              <div><div className="text-sm font-medium text-slate-800">Change Password</div><div className="text-xs text-slate-500">Update your account password</div></div>
              <span className="text-blue-600 text-sm font-medium">Update</span>
            </button>
            <button type="button" className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left hover:bg-slate-50">
              <div><div className="text-sm font-medium text-slate-800">Change PIN</div><div className="text-xs text-slate-500">Update your 4-digit security PIN</div></div>
              <span className="text-blue-600 text-sm font-medium">Update</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-elev p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Palette className="h-5 w-5" /></div>
            <h3 className="font-semibold text-slate-900">Display Settings</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Theme">
              <select value={prefs.theme} onChange={(e) => setPref("theme", e.target.value)} className="input">
                <option>Light</option><option>Dark</option>
              </select>
            </Field>
            <Field label="Currency">
              <select value={prefs.currency} onChange={(e) => setPref("currency", e.target.value)} className="input">
                <option>USD</option><option>EUR</option><option>GBP</option>
              </select>
            </Field>
            <Field label="Date Format">
              <select value={prefs.dateFormat} onChange={(e) => setPref("dateFormat", e.target.value)} className="input">
                <option>MMM D, YYYY</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold">
            <Save className="h-4 w-4" /> Save Changes
          </button>
          {saved && <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"><Check className="h-4 w-4" /> Changes saved</span>}
        </div>
      </form>

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