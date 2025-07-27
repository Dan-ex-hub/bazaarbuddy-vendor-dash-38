import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Gift } from "lucide-react";

const FoodDonationBanner = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">
                Having leftover food as vendor?
              </h3>
              <p className="text-sm sm:text-base text-green-600">
                No worries u can send it over to us to give it to poor and we would give you discount of ur next purchase at checkout!
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" />
            <Button 
              onClick={handleDonateClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold"
            >
              Donate Food & Get Discount
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodDonationBanner;
