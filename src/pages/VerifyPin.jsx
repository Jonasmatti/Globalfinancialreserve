import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDummyAuth } from "@/lib/DummyAuthContext";

export default function VerifyPin() {
  const { verifyPin } = useDummyAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const refs = useRef([]);

  const handleChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError("");
    if (v && i < 3 && refs.current[i + 1]) refs.current[i + 1].focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0 && refs.current[i - 1]) {
      refs.current[i - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4).split("");
    const next = ["", "", "", ""];
    pasted.forEach((d, i) => (next[i] = d));
    setDigits(next);
    if (pasted.length < 4 && refs.current[pasted.length]) refs.current[pasted.length].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const res = verifyPin(digits.join(""));
      setLoading(false);
      if (res.ok) {
        navigate("/dashboard");
      } else {
        setError(res.error);
        setDigits(["", "", "", ""]);
        refs.current[0]?.focus();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <Link to="/signin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Login
        </Link>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-elev p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Security Verification</h1>
            <p className="text-sm text-slate-500 mt-2 max-w-xs">
              Enter your 4-digit security PIN to complete sign-in and access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-16 w-14 rounded-xl border-2 border-slate-200 text-center text-2xl font-bold text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              ))}
            </div>
            {error && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2.5 text-sm text-rose-600 text-center mb-4">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading || digits.some((d) => !d)} className="w-full" size="lg">
              {loading ? "Verifying..." : "Verify PIN"}
            </Button>
          </form>
        </div>
        <p className="text-xs text-slate-400 text-center mt-6 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Secured with 256-bit SSH encryption. Your credentials are protected end-to-end.
        </p>
      </div>
    </div>
  );
}