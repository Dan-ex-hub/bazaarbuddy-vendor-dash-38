import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import CategoriesSection from "@/components/CategoriesSection";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import RecentOrdersSection from "@/components/RecentOrdersSection";
import InventorySection from "@/components/InventorySection";
import ReviewsSection from "@/components/ReviewsSection";
import WholesalersSection from "@/components/WholesalersSection";
import BudgetSection from "@/components/BudgetSection";
import PayLaterSection from "@/components/PayLaterSection";
import FoodDonationBanner from "@/components/FoodDonationBanner";

const Index = () => {
  const { t } = useLanguage();
  const { getCartItemsCount, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                {t('nav.welcome')}
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
              {/* Voice Search Bar */}
              <div className="mb-8">
                <VoiceSearchBar />
              </div>

              {/* Categories Section */}
              <div className="mb-12">
                <CategoriesSection />
              </div>
              
              {/* Recent Orders Section */}
              <div className="mb-12">
                <RecentOrdersSection />
              </div>
              
              {/* Budget Section */}
              <div className="mb-12">
                <BudgetSection />
              </div>
              
              {/* Pay Later Section */}
              <div className="mb-12">
                <PayLaterSection />
              </div>
              
              {/* Food Donation Banner */}
              <div className="mb-12">
                <FoodDonationBanner />
              </div>
              
              {/* Inventory Section */}
              <div className="mb-12">
                <InventorySection />
              </div>
              
              {/* Wholesalers Section */}
              <div className="mb-12">
                <WholesalersSection />
              </div>
              
              {/* Reviews Section */}
              <div className="mb-8">
                <ReviewsSection />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
