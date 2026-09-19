import React from "react";
import { Navigate } from "react-router-dom";
import { useDummyAuth } from "@/lib/DummyAuthContext";

export default function DummyProtectedRoute() {
  const { authed } = useDummyAuth();
  if (!authed) return <Navigate to="/signin" replace />;
  return null;
}