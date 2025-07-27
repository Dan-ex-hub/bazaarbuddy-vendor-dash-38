import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Percent, 
  Clock, 
  Users, 
  ShoppingCart, 
  Star,
  Gift,
  Zap,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'bulk' | 'combo';
  validUntil: string;
  minOrder?: number;
  maxDiscount?: number;
  usedBy: number;
  totalLimit: number;
  products?: string[];
  wholesaler: string;
  terms: string[];
}

const OffersPage = () => {
  const { user } = useAuth();
  const { addToCart, getCartItemsCount, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const offers: Offer[] = [
    {
      id: "1",
      title: "Fresh Vegetables Combo",
      description: "Get 25% off on any 3 vegetables together",
      discount: 25,
      type: "percentage",
      validUntil: "2024-02-15",
      minOrder: 200,
      maxDiscount: 100,
      usedBy: 45,
      totalLimit: 100,
      products: ["Tomatoes", "Onions", "Potatoes"],
      wholesaler: "Fresh Valley Wholesalers",
      terms: ["Minimum 3 different vegetables", "Valid on fresh items only", "Cannot be combined with other offers"]
    },
    {
      id: "2",
      title: "Bulk Rice Deal",
      description: "Buy 10kg+ rice and save ₹50",
      discount: 50,
      type: "fixed",
      validUntil: "2024-02-20",
      minOrder: 10,
      usedBy: 23,
      totalLimit: 50,
      products: ["Basmati Rice", "Regular Rice"],
      wholesaler: "Spice Garden Suppliers",
      terms: ["Minimum 10kg purchase", "Valid on all rice varieties", "One per customer"]
    },
    {
      id: "3",
      title: "New Customer Special",
      description: "30% off on your first order",
      discount: 30,
      type: "percentage",
      validUntil: "2024-02-28",
      maxDiscount: 150,
      usedBy: 12,
      totalLimit: 200,
      wholesaler: "Multiple Partners",
      terms: ["First-time customers only", "Maximum discount ₹150", "Valid on all categories"]
    },
    {
      id: "4",
      title: "Weekend Flash Sale",
      description: "Extra 20% off on fruits this weekend",
      discount: 20,
      type: "percentage",
      validUntil: "2024-02-11",
      usedBy: 67,
      totalLimit: 80,
      products: ["All Fruits"],
      wholesaler: "Premium Fruit Mart",
      terms: ["Weekend only (Sat-Sun)", "Valid on all fresh fruits", "Limited time offer"]
    },
    {
      id: "5",
      title: "Dairy Delight",
      description: "Buy 2 dairy products, get 1 free",
      discount: 33,
      type: "combo",
      validUntil: "2024-02-18",
      usedBy: 34,
      totalLimit: 60,
      products: ["Milk", "Paneer", "Curd"],
      wholesaler: "Dairy Fresh Co.",
      terms: ["Buy any 2, get cheapest free", "Valid on dairy products only", "Fresh items only"]
    },
    {
      id: "6",
      title: "Spice Master Bundle",
      description: "Get ₹75 off on spice combo pack",
      discount: 75,
      type: "fixed",
      validUntil: "2024-02-25",
      minOrder: 300,
      usedBy: 18,
      totalLimit: 40,
      products: ["Turmeric", "Red Chili", "Cumin", "Coriander"],
      wholesaler: "Spice Garden Suppliers",
      terms: ["Must buy all 4 spices", "Minimum ₹300 order", "Authentic quality guaranteed"]
    }
  ];

  const getOfferTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage': return Percent;
      case 'fixed': return Gift;
      case 'bulk': return Users;
      case 'combo': return Zap;
      default: return Gift;
    }
  };

  const getOfferTypeColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'text-blue-600';
      case 'fixed': return 'text-green-600';
      case 'bulk': return 'text-purple-600';
      case 'combo': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const handleClaimOffer = (offer: Offer) => {
    toast({
      title: "Offer Claimed!",
      description: `${offer.title} has been applied to your account. Use it on your next order!`,
    });
  };

  const isOfferExpired = (validUntil: string) => {
    return new Date() > new Date(validUntil);
  };

  const getUsagePercentage = (usedBy: number, totalLimit: number) => {
    return (usedBy / totalLimit) * 100;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                Offers & Deals
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate('/cart')}
                className="relative flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {getCartItemsCount() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
              {getCartTotal() > 0 && (
                <Badge variant="secondary" className="hidden sm:flex">
                  ₹{getCartTotal().toLocaleString()}
                </Badge>
              )}
              <Badge variant="outline">
                {offers.length} Active Offers
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Featured Banner */}
              <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Gift className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-1">Special Deals Just for You!</h2>
                      <p className="text-muted-foreground">
                        Save more on your bulk purchases with our exclusive vendor offers
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      Save up to 30%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => {
                  const IconComponent = getOfferTypeIcon(offer.type);
                  const expired = isOfferExpired(offer.validUntil);
                  const usagePercent = getUsagePercentage(offer.usedBy, offer.totalLimit);
                  
                  return (
                    <Card key={offer.id} className={`hover:shadow-lg transition-shadow ${expired ? 'opacity-60' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full bg-muted ${getOfferTypeColor(offer.type)}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <CardTitle className="text-lg line-clamp-1">{offer.title}</CardTitle>
                              <CardDescription className="text-sm">
                                by {offer.wholesaler}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant={expired ? "destructive" : "secondary"} className="text-xs">
                            {offer.type === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`} OFF
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {offer.description}
                        </p>

                        {offer.products && (
                          <div>
                            <p className="text-xs font-medium mb-1">Applicable on:</p>
                            <div className="flex flex-wrap gap-1">
                              {offer.products.map((product) => (
                                <Badge key={product} variant="outline" className="text-xs">
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Usage Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Used: {offer.usedBy}/{offer.totalLimit}</span>
                            <span>{Math.round(usagePercent)}% claimed</span>
                          </div>
                          <Progress value={usagePercent} className="h-2" />
                        </div>

                        {/* Validity */}
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                        </div>

                        {/* Terms */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium">Terms:</p>
                          <ul className="text-xs text-muted-foreground space-y-0.5">
                            {offer.terms.slice(0, 2).map((term, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span className="line-clamp-1">{term}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          onClick={() => handleClaimOffer(offer)}
                          disabled={expired || usagePercent >= 100}
                          className="w-full"
                          size="sm"
                        >
                          {expired ? 'Expired' : usagePercent >= 100 ? 'Sold Out' : 'Claim Offer'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* How to Use */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>How to Use Offers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h3 className="font-medium">Claim Offer</h3>
                      <p className="text-sm text-muted-foreground">
                        Click "Claim Offer" on any deal you want to use
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h3 className="font-medium">Add Products</h3>
                      <p className="text-sm text-muted-foreground">
                        Add qualifying products to your cart
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h3 className="font-medium">Get Discount</h3>
                      <p className="text-sm text-muted-foreground">
                        Discount will be applied automatically at checkout
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OffersPage;
