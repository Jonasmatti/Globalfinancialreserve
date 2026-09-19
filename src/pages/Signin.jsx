import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, User, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDummyAuth } from "@/lib/DummyAuthContext";

export default function Signin() {
  const { login } = useDummyAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const res = login(username.trim(), password);
      setLoading(false);
      if (res.ok) {
        navigate("/verify-pin");
      } else {
        setError(res.error);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-sovereign text-white p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #3b82f6 0, transparent 40%), radial-gradient(circle at 80% 70%, #1e3a8a 0, transparent 45%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center">
            <span className="font-display text-white text-xl font-bold">G</span>
          </div>
          <span className="font-display text-lg font-semibold">GlobalFinancialReserve</span>
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">Securing Tomorrow's Wealth</h2>
          <p className="text-blue-100/70 max-w-md leading-relaxed">
            Sign in to access your private investment dashboard, review portfolio performance, and manage your financial activity.
          </p>
          <div className="flex items-center gap-3 mt-8 text-sm text-blue-100/60">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Protected by multi-step verification
          </div>
        </div>
        <div className="relative text-xs text-blue-200/40">© 2026 GlobalFinancialReserve. Educational demonstration only.</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <span className="font-display text-white text-xl font-bold">G</span>
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">GlobalFinancialReserve</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-2 mb-8">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 pl-10 pr-10 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2.5 text-sm text-rose-600">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-6">
            Authorized access only.
          </p>
        </div>
      </div>
    </div>
  );
}