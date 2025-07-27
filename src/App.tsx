import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import DonatePage from "./pages/DonatePage";
import FoodDonations from "./pages/FoodDonations";
import PayLaterPage from "./pages/PayLaterPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/food-donations" element={<FoodDonations />} />
            <Route path="/pay-later" element={<PayLaterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
