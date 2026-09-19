import React, { createContext, useContext, useState, useCallback } from "react";
import { USER } from "./dummyData";

const DummyAuthContext = createContext(null);

export function DummyAuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const [stage, setStage] = useState("login"); // login | pin | done

  const login = useCallback((username, password) => {
    if (username === USER.username && password === USER.password) {
      setStage("pin");
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials. Please check your username and password." };
  }, []);

  const verifyPin = useCallback((pin) => {
    if (pin === USER.pin) {
      setAuthed(true);
      setStage("done");
      return { ok: true };
    }
    return { ok: false, error: "Incorrect PIN. Please try again." };
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    setStage("login");
  }, []);

  return (
    <DummyAuthContext.Provider value={{ authed, stage, login, verifyPin, logout, user: USER }}>
      {children}
    </DummyAuthContext.Provider>
  );
}

export function useDummyAuth() {
  const ctx = useContext(DummyAuthContext);
  if (!ctx) throw new Error("useDummyAuth must be used within DummyAuthProvider");
  return ctx;
}