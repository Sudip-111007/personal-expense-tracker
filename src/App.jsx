import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuthContext } from "./hooks/useAuthContext.js";
import { ExpenseProvider } from "./contexts/ExpenseContext.jsx";

import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import Reports from "./pages/Reports.jsx";
import NotFound from "./pages/NotFound.jsx";


const queryClient = new QueryClient();

function CenterLayout() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <Outlet />
    </main>
  );
}

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// Public Route wrapper (redirects to dashboard if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ===== PROTECTED + CENTERED PAGES ===== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<CenterLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>

      {/* ===== NOT FOUND ===== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* ================= APP ROOT ================= */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <ExpenseProvider>
              <AppRoutes />
              <Toaster />
              <Sonner />
            </ExpenseProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}