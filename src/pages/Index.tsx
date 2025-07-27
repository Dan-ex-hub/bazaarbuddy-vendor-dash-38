import VendorNavbar from "@/components/VendorNavbar";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import RecentOrdersSection from "@/components/RecentOrdersSection";
import InventorySection from "@/components/InventorySection";
import ReviewsSection from "@/components/ReviewsSection";
import WholesalersSection from "@/components/WholesalersSection";
import BudgetSection from "@/components/BudgetSection";
import PayLaterSection from "@/components/PayLaterSection";
import FoodDonationBanner from "@/components/FoodDonationBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <VendorNavbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Welcome, Vendor!
          </h1>
          
          {/* Voice Search Bar */}
          <div className="mb-8">
            <VoiceSearchBar />
          </div>
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
      </main>
    </div>
  );
};

export default Index;
