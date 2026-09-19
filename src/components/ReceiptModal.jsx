import React from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USER, formatCurrency, formatDate } from "@/lib/dummyData";

export default function ReceiptModal({ transaction, onClose }) {
  if (!transaction) return null;
  const { id, type, amount, currency, date, status, recipient, note } = transaction;

  const handleDownload = () => {
    const text = [
      "GLOBALFINANCIALRESERVE — TRANSACTION RECEIPT",
      "==========================================",
      `Transaction ID : ${id}`,
      `Date           : ${formatDate(date)}`,
      `Type           : ${type}`,
      `Amount         : ${formatCurrency(amount, currency)}`,
      `Status         : ${status}`,
      `Recipient      : ${recipient || "—"}`,
      `Account Holder : ${USER.fullName}`,
      `Address        : ${USER.address}`,
      `Note           : ${note || "—"}`,
      "==========================================",
      "This is a fictional educational receipt. No real financial transaction occurred.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elev-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-sovereign text-white">
          <h3 className="text-lg font-semibold">Transaction Receipt</h3>
          <button onClick={onClose} className="text-blue-200/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-6">
          <div className="text-center mb-5">
            <div className="font-display text-xl font-bold text-slate-900">GlobalFinancialReserve</div>
            <div className="text-xs text-slate-500 tracking-wide">Official Transaction Receipt</div>
          </div>
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
            <Line label="Transaction ID" value={id} />
            <Line label="Date" value={formatDate(date)} />
            <Line label="Type" value={type} />
            <Line label="Amount" value={formatCurrency(amount, currency)} />
            <Line label="Status" value={status} valueClass={status === "Completed" ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"} />
            <Line label="Recipient" value={recipient || "—"} />
            <Line label="Account Holder" value={USER.fullName} />
            <Line label="Address" value={USER.address} />
            {note && <Line label="Note" value={note} />}
          </div>
          <div className="mt-4 text-center text-[11px] text-slate-400 leading-relaxed">
            This is a fictional educational receipt generated for portfolio demonstration purposes.<br />No real financial services are provided.
          </div>
          <div className="flex gap-2 mt-5">
            <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-1.5" /> Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value, valueClass = "text-slate-800 font-medium" }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm ${valueClass}`}>{value}</span>
    </div>
  );
}