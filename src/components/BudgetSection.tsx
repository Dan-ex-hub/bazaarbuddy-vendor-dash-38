import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingDown, 
  ShoppingCart, 
  Filter,
  Star
} from "lucide-react";

interface BudgetItem {
  id: string;
  name: string;
  wholesaler: string;
  price: number;
  originalPrice: number;
  unit: string;
  category: string;
  rating: number;
  discount: number;
  inStock: boolean;
  estimatedSavings: number;
}

const budgetItems: BudgetItem[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    wholesaler: "Fresh Valley Wholesalers",
    price: 25,
    originalPrice: 35,
    unit: "per kg",
    category: "Vegetables",
    rating: 4.8,
    discount: 29,
    inStock: true,
    estimatedSavings: 100
  },
  {
    id: "2", 
    name: "Basmati Rice",
    wholesaler: "Spice Garden Suppliers",
    price: 120,
    originalPrice: 150,
    unit: "per 5kg",
    category: "Grains",
    rating: 4.6,
    discount: 20,
    inStock: true,
    estimatedSavings: 150
  },
  {
    id: "3",
    name: "Red Onions",
    wholesaler: "Fresh Valley Wholesalers", 
    price: 18,
    originalPrice: 25,
    unit: "per kg",
    category: "Vegetables",
    rating: 4.7,
    discount: 28,
    inStock: true,
    estimatedSavings: 70
  },
  {
    id: "4",
    name: "Whole Wheat Flour",
    wholesaler: "City Mart Wholesale",
    price: 85,
    originalPrice: 100,
    unit: "per 10kg",
    category: "Grains",
    rating: 4.4,
    discount: 15,
    inStock: false,
    estimatedSavings: 75
  },
  {
    id: "5",
    name: "Green Chilies",
    wholesaler: "Organic Harvest Co.",
    price: 40,
    originalPrice: 55,
    unit: "per kg", 
    category: "Vegetables",
    rating: 4.9,
    discount: 27,
    inStock: true,
    estimatedSavings: 45
  },
  {
    id: "6",
    name: "Turmeric Powder",
    wholesaler: "Spice Garden Suppliers",
    price: 280,
    originalPrice: 320,
    unit: "per kg",
    category: "Spices",
    rating: 4.8,
    discount: 13,
    inStock: true,
    estimatedSavings: 40
  }
];

const BudgetSection = () => {
  const [maxBudget, setMaxBudget] = useState<string>("500");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"price" | "discount" | "savings">("discount");

  const categories = ["all", ...Array.from(new Set(budgetItems.map(item => item.category)))];

  const filteredItems = budgetItems
    .filter(item => {
      const withinBudget = item.price <= parseInt(maxBudget || "0");
      const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
      return withinBudget && categoryMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "discount":
          return b.discount - a.discount;
        case "savings":
          return b.estimatedSavings - a.estimatedSavings;
        default:
          return 0;
      }
    });

  const totalSavings = filteredItems.reduce((sum, item) => sum + item.estimatedSavings, 0);

  const handleAddToCart = (itemId: string) => {
    console.log(`Adding item ${itemId} to cart`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">Budget-Friendly Items</h2>
        
        <div className="flex items-center gap-4">
          <div className="bg-gradient-card rounded-xl px-4 py-2 shadow-card">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">
                Potential Savings: ₹{totalSavings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border border-border shadow-card rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Max Budget (₹)</label>
              <Input
                type="number"
                placeholder="Enter budget"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-float">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sort By</label>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-float">
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="savings">Maximum Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setMaxBudget("500");
                  setSelectedCategory("all");
                  setSortBy("discount");
                }}
                variant="outline"
                className="w-full rounded-xl"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-gradient-card border border-border shadow-card hover:shadow-float transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.wholesaler}</p>
                    <div className="flex items-center space-x-1">
                      {renderStars(item.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({item.rating})</span>
                    </div>
                  </div>
                  
                  <Badge className="bg-destructive text-destructive-foreground rounded-lg">
                    -{item.discount}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">₹{item.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.unit}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">Save ₹{item.estimatedSavings}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge 
                    variant={item.inStock ? "default" : "secondary"}
                    className="rounded-lg"
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  
                  <Button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-gradient-card rounded-2xl shadow-card">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <TrendingDown className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold text-foreground">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your budget or category filters to see more options.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetSection;