import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import LoadingBar from './components/LoadingBar';
import { DummyAuthProvider, useDummyAuth } from '@/lib/DummyAuthContext';
import { DummyDataProvider } from '@/lib/DummyDataContext';
import DashboardLayout from '@/components/DashboardLayout';
// Boilerplate auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
// App pages
import Landing from '@/pages/Landing';
import Signin from '@/pages/Signin';
import VerifyPin from '@/pages/VerifyPin';
import Dashboard from '@/pages/Dashboard';
import PortfolioPerformance from '@/pages/PortfolioPerformance';
import AssetAllocation from '@/pages/AssetAllocation';
import Transactions from '@/pages/Transactions';
import TransferFunds from '@/pages/TransferFunds';
import MarketInsights from '@/pages/MarketInsights';
import Settings from '@/pages/Settings';
import SecurityCenter from '@/pages/SecurityCenter';
import Notifications from '@/pages/Notifications';
import SupportCenter from '@/pages/SupportCenter';

function ProtectedDashboard() {
  const { authed } = useDummyAuth();
  if (!authed) return <Navigate to="/signin" replace />;
  return <DashboardLayout />;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <DummyAuthProvider>
      <DummyDataProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-pin" element={<VerifyPin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio-performance" element={<PortfolioPerformance />} />
            <Route path="/asset-allocation" element={<AssetAllocation />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transfer-funds" element={<TransferFunds />} />
            <Route path="/market-insights" element={<MarketInsights />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/security-center" element={<SecurityCenter />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support-center" element={<SupportCenter />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </DummyDataProvider>
    </DummyAuthProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <LoadingBar />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App