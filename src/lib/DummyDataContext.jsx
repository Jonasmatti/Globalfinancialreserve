import React, { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS } from "./dummyData";

const DummyDataContext = createContext(null);

export function DummyDataProvider({ children }) {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addTransaction = useCallback((tx) => {
    const id = `TXN-${Math.floor(10000000 + Math.random() * 89999999)}`;
    const record = {
      id,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      ...tx,
    };
    setTransactions((prev) => [record, ...prev]);
    setNotifications((prev) => [
      {
        id: `N${Date.now()}`,
        category: "Transactions",
        title: `${tx.type} of ${tx.amount} ${tx.currency || "USD"} is now ${record.status.toLowerCase()}`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    return record;
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const markRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  return (
    <DummyDataContext.Provider
      value={{ transactions, notifications, addTransaction, markAllRead, clearAll, markRead }}
    >
      {children}
    </DummyDataContext.Provider>
  );
}

export function useDummyData() {
  const ctx = useContext(DummyDataContext);
  if (!ctx) throw new Error("useDummyData must be used within DummyDataProvider");
  return ctx;
}