import { Fish, Wheat, Bean, Sparkles, Cherry, Droplets, Snowflake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "fish-seafood",
    title: "Fish & Seafood",
    icon: Fish,
    bgColor: "bg-green-100",
    iconColor: "text-red-500"
  },
  {
    id: "flours",
    title: "Flours",
    icon: Wheat,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    id: "pulses",
    title: "Pulses",
    icon: Bean,
    bgColor: "bg-green-100",
    iconColor: "text-red-700"
  },
  {
    id: "cleaning",
    title: "Cleaning & Consumables",
    icon: Sparkles,
    bgColor: "bg-blue-100",
    iconColor: "text-orange-500"
  },
  {
    id: "dry-fruits",
    title: "Dry Fruits & Nuts",
    icon: Cherry,
    bgColor: "bg-orange-100",
    iconColor: "text-amber-700"
  },
  {
    id: "edible-oils",
    title: "Edible Oils",
    icon: Droplets,
    bgColor: "bg-yellow-100",
    iconColor: "text-green-600"
  },
  {
    id: "frozen",
    title: "Frozen & Instant Food",
    icon: Snowflake,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500"
  }
];

const CategoriesSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Our Categories</h2>
        <p className="text-muted-foreground">Explore our wide range of products</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer transition-all duration-200 hover:shadow-card hover:scale-105 border-0 shadow-soft"
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <category.icon className={`h-8 w-8 ${category.iconColor}`} />
              </div>
              <h3 className="font-semibold text-sm text-foreground leading-tight">
                {category.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;