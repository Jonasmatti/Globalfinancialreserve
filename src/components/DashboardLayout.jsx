import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, PieChart, CreditCard, Send,
  Newspaper, Settings as SettingsIcon, ShieldCheck, Bell,
  LifeBuoy, LogOut, Menu, X, ChevronRight, ArrowDownRight,
} from "lucide-react";
import { useDummyAuth } from "@/lib/DummyAuthContext";
import { useDummyData } from "@/lib/DummyDataContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio-performance", label: "Portfolio Performance", icon: TrendingUp },
  { to: "/asset-allocation", label: "Asset Allocation", icon: PieChart },
  { to: "/transactions", label: "Transactions", icon: CreditCard },
  { to: "/transfer-funds", label: "Transfer Funds", icon: Send },
  { to: "/market-insights", label: "Market Insights", icon: Newspaper },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
  { to: "/security-center", label: "Security Center", icon: ShieldCheck },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/support-center", label: "Support Center", icon: LifeBuoy },
];

function Brand() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2.5 px-2">
      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-md">
        <span className="font-display text-white text-lg font-bold">G</span>
      </div>
      <div className="leading-tight">
        <div className="font-display text-white text-sm font-semibold tracking-wide">GlobalFinancial</div>
        <div className="text-blue-300/70 text-[10px] tracking-[0.2em] uppercase">Reserve</div>
      </div>
    </Link>
  );
}

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-blue-100/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useDummyAuth();
  const { notifications } = useDummyData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const isActive = (to) => location.pathname === to;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-sovereign text-white">
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <Brand />
        <button className="lg:hidden text-blue-200/70" onClick={() => setMobileOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-1">
        {NAV.map((item) => (
          <NavItem key={item.to} item={item} active={isActive(item.to)} onClick={() => setMobileOpen(false)} />
        ))}
      </nav>
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-blue-100/70 hover:bg-rose-500/15 hover:text-rose-200 transition-colors"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30">
        {SidebarContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80%] shadow-elev-lg">
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-slate-600" onClick={() => setMobileOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
                <span className="font-medium text-slate-800">Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="capitalize">{location.pathname.split("/").pop() || "home"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setNotifOpen((o) => !o)} className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unread}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-elev-lg z-40 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">Notifications</span>
                        <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-blue-600 hover:underline">View all</Link>
                      </div>
                      <div className="divide-y divide-slate-100">
                        <NotifItem icon={ArrowDownRight} tone="emerald" title="Direct Deposit Received" body="$48,500.00 was deposited into your account." time="2 hours ago" />
                        <NotifItem icon={ShieldCheck} tone="blue" title="New Login Activity" body="Your account was accessed from a new device in Accra, GH." time="Just now" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-white flex items-center justify-center text-sm font-semibold">
                  {user.initials}
                </div>
                <div className="hidden sm:block leading-tight">
                  <div className="text-sm font-semibold text-slate-800">{user.fullName}</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NotifItem({ icon: Icon, tone, title, body, time }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
  };
  return (
    <div className="flex gap-3 px-4 py-3.5 hover:bg-slate-50">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-800">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{body}</div>
        <div className="text-[11px] text-slate-400 mt-1">{time}</div>
      </div>
    </div>
  );
}