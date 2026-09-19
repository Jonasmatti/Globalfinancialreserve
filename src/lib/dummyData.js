// All data is 100% FICTIONAL — for educational UI/UX portfolio demonstration only.

export const USER = {
  fullName: "Anita Calisel Monroe",
  initials: "AM",
  address: "6 North 6th ST, Yakima, WA 98901",
  email: "ploly1987@gmail.com",
  phone: "509-517-0492",
  username: "AnitaMonroe212",
  password: "LoveHillary143",
  pin: "6546",
};

export const PORTFOLIO = {
  originalInvestment: 820000.0,
  currentValue: 1045700.0,
  totalReturns: 225700.0,
  growthPct: 27.5,
  change24h: 2.4,
};

// Generate monthly performance data from May 5, 2023 to present
export function generatePerformanceData() {
  const start = new Date("2023-05-05");
  const end = new Date();
  const points = [];
  const startVal = 820000;
  const endVal = 1045700;
  const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const months = Math.ceil(totalDays / 30);
  let cur = new Date(start);
  for (let i = 0; i <= months; i++) {
    const progress = i / months;
    const base = startVal + (endVal - startVal) * progress;
    const wave = Math.sin(i * 0.9) * 14000 + Math.sin(i * 0.35) * 7000;
    const noise = (Math.sin(i * 2.3) * 4000);
    const value = Math.max(startVal, base + wave + noise);
    points.push({
      date: cur.toISOString().slice(0, 10),
      value: Math.round(value),
    });
    cur.setMonth(cur.getMonth() + 1);
  }
  points[points.length - 1].value = endVal;
  return points;
}

export const PERFORMANCE_DATA = generatePerformanceData();

export const ASSET_ALLOCATION = [
  { name: "Equities", value: 42, color: "#2563eb", detail: "Tech, Healthcare, Energy" },
  { name: "Fixed Income", value: 28, color: "#1e3a8a", detail: "Bonds, Treasuries" },
  { name: "Real Estate", value: 18, color: "#10b981", detail: "REITs, Property" },
  { name: "Commodities", value: 12, color: "#f59e0b", detail: "Gold, Silver, Oil" },
];

export const SECTOR_PERFORMANCE = [
  { sector: "Technology", change: 4.2 },
  { sector: "Healthcare", change: 2.1 },
  { sector: "Energy", change: -1.3 },
  { sector: "Financials", change: 1.8 },
  { sector: "Real Estate", change: 0.9 },
  { sector: "Commodities", change: 3.4 },
];

export const MARKET_INDICES = [
  { name: "S&P 500", value: "5,418.32", change: 0.62, up: true },
  { name: "NASDAQ", value: "17,192.45", change: 0.94, up: true },
  { name: "Dow Jones", value: "39,118.07", change: -0.31, up: false },
  { name: "FTSE 100", value: "8,236.90", change: 0.18, up: true },
];

export const TOP_GAINERS = [
  { ticker: "NVDA", name: "NVIDIA Corp.", price: "$124.30", change: 3.8 },
  { ticker: "AMD", name: "Advanced Micro", price: "$162.14", change: 2.9 },
  { ticker: "AAPL", name: "Apple Inc.", price: "$229.32", change: 1.7 },
];

export const TOP_LOSERS = [
  { ticker: "XOM", name: "Exxon Mobil", price: "$113.05", change: -2.1 },
  { ticker: "PFE", name: "Pfizer Inc.", price: "$28.74", change: -1.6 },
  { ticker: "BA", name: "Boeing Co.", price: "$178.22", change: -1.2 },
];

export const MARKET_NEWS = [
  { headline: "Federal Reserve signals patient approach as inflation cools toward target", source: "Global Financial Wire", time: "32 min ago" },
  { headline: "Tech equities rally on strong earnings, lifting benchmark indices", source: "Market Pulse", time: "1 hr ago" },
  { headline: "Gold prices steady amid shifting rate-cut expectations", source: "Commodity Daily", time: "2 hr ago" },
  { headline: "REIT sector outperforms as commercial property demand stabilizes", source: "Property Monitor", time: "3 hr ago" },
  { headline: "Energy stocks retreat as crude inventories build unexpectedly", source: "Energy Desk", time: "5 hr ago" },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-10045287",
    type: "Direct Deposit",
    amount: 820000.0,
    currency: "USD",
    date: "2023-02-13",
    status: "Completed",
    recipient: "Jane Maria Sanders",
    note: "Initial investment — principal deposit",
  },
];

export const INITIAL_NOTIFICATIONS = [
  { id: "N1", category: "Transactions", title: "Direct deposit received: $820,000.00 - Feb 13, 2023", time: "Feb 13, 2023", read: true },
  { id: "N2", category: "Market", title: "Market volatility alert: S&P 500 down 1.2%", time: "1 hr ago", read: false },
  { id: "N3", category: "System", title: "Portfolio performance report available", time: "3 hr ago", read: false },
  { id: "N4", category: "Market", title: "Sector rotation detected in technology and healthcare", time: "5 hr ago", read: false },
];

export const LOGIN_ACTIVITY = [
  { date: "2026-09-09", time: "08:42 AM", location: "Yakima, WA", device: "Chrome on macOS", status: "Success" },
  { date: "2026-09-08", time: "07:15 PM", location: "Yakima, WA", device: "Safari on iPhone", status: "Success" },
  { date: "2026-09-07", time: "11:03 AM", location: "Seattle, WA", device: "Edge on Windows", status: "Success" },
  { date: "2026-09-05", time: "09:28 PM", location: "Unknown, CA", device: "Chrome on Android", status: "Blocked" },
];

export const FAQS = [
  { q: "How do I make a deposit?", a: "Navigate to the Dashboard and select 'Make Transaction', choose 'Deposit', enter the amount, and confirm. The deposit will appear as Pending in your transaction history." },
  { q: "How do I transfer funds?", a: "Open the 'Transfer Funds' page, enter the recipient's account and routing numbers, the amount, currency, and recipient name, then submit. Transfers remain Pending until reviewed." },
  { q: "How do I view my transaction history?", a: "Visit the 'Transactions' page to see your full history. You can search and filter by type, and generate a receipt for completed transactions." },
  { q: "How do I update my account information?", a: "Go to 'Settings' to edit your personal information, security preferences, and display settings, then save your changes." },
  { q: "What currencies are supported for transfers?", a: "Transfers currently support USD, EUR, and GBP. Select your preferred currency on the Transfer Funds form." },
  { q: "How do I change my PIN?", a: "Visit the 'Security Center' or 'Settings' page and use the PIN management section to set a new 4-digit PIN." },
  { q: "How do I enable 2FA?", a: "Open the 'Security Center', toggle Two-Factor Authentication on, scan the displayed QR code with your authenticator app, and save your backup codes." },
  { q: "How do I contact support?", a: "Use the 'Support Center' contact form to send a message to our team. We respond to all inquiries promptly." },
];

export function formatCurrency(value, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}