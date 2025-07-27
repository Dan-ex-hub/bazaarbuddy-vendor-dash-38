import VendorNavbar from "@/components/VendorNavbar";
import FoodDonationForm from "@/components/FoodDonationForm";

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <VendorNavbar />
      
      <main className="py-8">
        <FoodDonationForm />
      </main>
    </div>
  );
};

export default DonatePage;