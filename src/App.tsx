import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import WholesalerDashboard from "./pages/WholesalerDashboard";
import DonatePage from "./pages/DonatePage";
import FoodDonations from "./pages/FoodDonations";
import PayLaterPage from "./pages/PayLaterPage";
import NotFound from "./pages/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode; allowedUserType?: 'vendor' | 'wholesaler' }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType && user.type !== allowedUserType) {
    return <Navigate to={user.type === 'vendor' ? '/vendor-dashboard' : '/wholesaler-dashboard'} replace />;
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Redirect root based on user type */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.type === 'vendor' ? '/vendor-dashboard' : '/wholesaler-dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Vendor Routes */}
      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute allowedUserType="vendor">
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donate"
        element={
          <ProtectedRoute allowedUserType="vendor">
            <DonatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/food-donations"
        element={
          <ProtectedRoute allowedUserType="vendor">
            <FoodDonations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay-later"
        element={
          <ProtectedRoute allowedUserType="vendor">
            <PayLaterPage />
          </ProtectedRoute>
        }
      />

      {/* Wholesaler Routes */}
      <Route
        path="/wholesaler-dashboard"
        element={
          <ProtectedRoute allowedUserType="wholesaler">
            <WholesalerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
