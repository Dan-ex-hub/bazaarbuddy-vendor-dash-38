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
import { useLanguage } from "@/contexts/LanguageContext";

const CategoriesSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      id: "fruits-vegetables",
      titleKey: "category.fruits_vegetables",
      icon: Apple,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: "fish-seafood",
      titleKey: "category.fish_seafood",
      icon: Fish,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: "dairy-eggs",
      titleKey: "category.dairy_eggs",
      icon: Milk,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: "flours",
      titleKey: "category.flours_grains",
      icon: Wheat,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-700"
    },
    {
      id: "meat-poultry",
      titleKey: "category.meat_poultry",
      icon: ChefHat,
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: "pulses",
      titleKey: "category.pulses_legumes",
      icon: Bean,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      id: "beverages",
      titleKey: "category.beverages",
      icon: Coffee,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: "snacks-sweets",
      titleKey: "category.snacks_sweets",
      icon: Candy,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      id: "spices-seasonings",
      titleKey: "category.spices_seasonings",
      icon: Flame,
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600"
    },
    {
      id: "cleaning",
      titleKey: "category.cleaning_care",
      icon: Sparkles,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600"
    },
    {
      id: "dry-fruits",
      titleKey: "category.dry_fruits_nuts",
      icon: Cherry,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      id: "edible-oils",
      titleKey: "category.edible_oils",
      icon: Droplets,
      bgColor: "bg-lime-100",
      iconColor: "text-lime-600"
    },
    {
      id: "frozen",
      titleKey: "category.frozen_instant",
      icon: Snowflake,
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600"
    },
    {
      id: "personal-care",
      titleKey: "category.personal_care",
      icon: Heart,
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600"
    },
    {
      id: "home-kitchen",
      titleKey: "category.home_kitchen",
      icon: Home,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t('categories.title')}</h2>
        <p className="text-sm sm:text-base text-muted-foreground">{t('categories.subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer transition-all duration-200 hover:shadow-card hover:scale-105 border-0 shadow-soft"
          >
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${category.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4`}>
                <category.icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${category.iconColor}`} />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-foreground leading-tight">
                {t(category.titleKey)}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
