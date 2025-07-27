import { 
  Fish, 
  Wheat, 
  Bean, 
  Sparkles, 
  Cherry, 
  Droplets, 
  Snowflake,
  Apple,
  Milk,
  ChefHat,
  Coffee,
  Candy,
  Flame,
  Heart,
  Home
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "fruits-vegetables",
    title: "Fruits & Vegetables",
    icon: Apple,
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: "fish-seafood",
    title: "Fish & Seafood",
    icon: Fish,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: "dairy-eggs",
    title: "Dairy & Eggs",
    icon: Milk,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    id: "flours",
    title: "Flours & Grains",
    icon: Wheat,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-700"
  },
  {
    id: "meat-poultry",
    title: "Meat & Poultry",
    icon: ChefHat,
    bgColor: "bg-red-100",
    iconColor: "text-red-600"
  },
  {
    id: "pulses",
    title: "Pulses & Legumes",
    icon: Bean,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    id: "beverages",
    title: "Beverages",
    icon: Coffee,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    id: "snacks-sweets",
    title: "Snacks & Sweets",
    icon: Candy,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600"
  },
  {
    id: "spices-seasonings",
    title: "Spices & Seasonings",
    icon: Flame,
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600"
  },
  {
    id: "cleaning",
    title: "Cleaning & Care",
    icon: Sparkles,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600"
  },
  {
    id: "dry-fruits",
    title: "Dry Fruits & Nuts",
    icon: Cherry,
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    id: "edible-oils",
    title: "Edible Oils",
    icon: Droplets,
    bgColor: "bg-lime-100",
    iconColor: "text-lime-600"
  },
  {
    id: "frozen",
    title: "Frozen & Instant",
    icon: Snowflake,
    bgColor: "bg-sky-100",
    iconColor: "text-sky-600"
  },
  {
    id: "personal-care",
    title: "Personal Care",
    icon: Heart,
    bgColor: "bg-violet-100",
    iconColor: "text-violet-600"
  },
  {
    id: "home-kitchen",
    title: "Home & Kitchen",
    icon: Home,
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600"
  }
];

const CategoriesSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Our Categories</h2>
        <p className="text-muted-foreground">Explore our wide range of products</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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