import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, TrendingUp } from "lucide-react";

interface Wholesaler {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  specialties: string[];
  priceRange: "Budget" | "Mid-Range" | "Premium";
  deliveryTime: string;
  trustScore: number;
}

const wholesalers: Wholesaler[] = [
  {
    id: "1",
    name: "Fresh Valley Wholesalers",
    rating: 4.8,
    reviewCount: 156,
    location: "Pune, Maharashtra",
    phone: "+91 9876543210",
    specialties: ["Vegetables", "Fruits", "Dairy"],
    priceRange: "Budget",
    deliveryTime: "2-4 hours",
    trustScore: 95
  },
  {
    id: "2",
    name: "Spice Garden Suppliers",
    rating: 4.6,
    reviewCount: 89,
    location: "Mumbai, Maharashtra", 
    phone: "+91 9765432109",
    specialties: ["Spices", "Grains", "Pulses"],
    priceRange: "Mid-Range",
    deliveryTime: "4-6 hours",
    trustScore: 92
  },
  {
    id: "3",
    name: "Organic Harvest Co.",
    rating: 4.9,
    reviewCount: 234,
    location: "Nashik, Maharashtra",
    phone: "+91 9654321098", 
    specialties: ["Organic Vegetables", "Herbs"],
    priceRange: "Premium",
    deliveryTime: "6-8 hours",
    trustScore: 98
  },
  {
    id: "4",
    name: "City Mart Wholesale",
    rating: 4.4,
    reviewCount: 67,
    location: "Nagpur, Maharashtra",
    phone: "+91 9543210987",
    specialties: ["General Groceries", "Packaged Goods"],
    priceRange: "Budget",
    deliveryTime: "3-5 hours",
    trustScore: 88
  },
  {
    id: "5",
    name: "Premium Foods Distribution",
    rating: 4.7,
    reviewCount: 145,
    location: "Aurangabad, Maharashtra",
    phone: "+91 9432109876",
    specialties: ["Meat", "Seafood", "Dairy"],
    priceRange: "Premium",
    deliveryTime: "4-6 hours",
    trustScore: 94
  }
];

const WholesalersSection = () => {
  const [sortBy, setSortBy] = useState<"rating" | "trust" | "price">("rating");

  const sortedWholesalers = [...wholesalers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "trust":
        return b.trustScore - a.trustScore;
      case "price":
        const priceOrder = { "Budget": 1, "Mid-Range": 2, "Premium": 3 };
        return priceOrder[a.priceRange] - priceOrder[b.priceRange];
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const getPriceRangeBadge = (priceRange: string) => {
    const variants = {
      "Budget": "bg-secondary text-secondary-foreground",
      "Mid-Range": "bg-accent text-accent-foreground", 
      "Premium": "bg-primary text-primary-foreground"
    };
    return variants[priceRange as keyof typeof variants] || variants.Budget;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Top Rated Wholesalers</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            onClick={() => setSortBy("rating")}
            size="sm"
            className="rounded-xl"
          >
            <Star className="h-4 w-4 mr-1" />
            Rating
          </Button>
          <Button
            variant={sortBy === "trust" ? "default" : "outline"}
            onClick={() => setSortBy("trust")}
            size="sm"
            className="rounded-xl"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Trust Score
          </Button>
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            onClick={() => setSortBy("price")}
            size="sm"
            className="rounded-xl"
          >
            Price
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWholesalers.map((wholesaler) => (
          <Card key={wholesaler.id} className="bg-gradient-card border border-border shadow-card hover:shadow-float transition-all duration-300 rounded-2xl">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                <div className="space-y-2">
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                    {wholesaler.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(wholesaler.rating)}</div>
                    <span className="font-semibold text-foreground">{wholesaler.rating}</span>
                    <span className="text-muted-foreground">({wholesaler.reviewCount})</span>
                  </div>
                </div>
                <Badge className={`${getPriceRangeBadge(wholesaler.priceRange)} rounded-lg`}>
                  {wholesaler.priceRange}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">{wholesaler.location}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">{wholesaler.phone}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">Delivery: {wholesaler.deliveryTime}</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-medium text-foreground">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {wholesaler.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="rounded-lg text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    Trust Score: {wholesaler.trustScore}%
                  </span>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm">
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WholesalersSection;
