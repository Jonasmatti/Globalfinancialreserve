import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export function triggerLoadingBar() {
  window.dispatchEvent(new CustomEvent("loadingbar:trigger"));
}

export default function LoadingBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const timers = useRef([]);

  const start = () => {
    timers.current.forEach(clearTimeout);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1400);
    timers.current = [t];
  };

  useEffect(() => {
    const handler = () => start();
    window.addEventListener("loadingbar:trigger", handler);
    return () => {
      window.removeEventListener("loadingbar:trigger", handler);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/30 backdrop-blur-[2px] pointer-events-none">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-white/40 border-t-blue-600 animate-spin shadow-lg" />
        <span className="text-xs font-medium text-slate-700">Loading…</span>
      </div>
    </div>
  );
}