import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Apple, 
  Wheat, 
  Beef, 
  Fish, 
  Milk, 
  Leaf, 
  Plus 
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
}

const inventoryData: InventoryItem[] = [
  { id: "1", name: "Fresh Fruits", category: "Produce", icon: Apple },
  { id: "2", name: "Grains & Cereals", category: "Pantry", icon: Wheat },
  { id: "3", name: "Meat", category: "Protein", icon: Beef },
  { id: "4", name: "Seafood", category: "Protein", icon: Fish },
  { id: "5", name: "Dairy Products", category: "Refrigerated", icon: Milk },
  { id: "6", name: "Vegetables", category: "Produce", icon: Leaf },
];

const InventorySection = () => {
  const handleAddToInventory = (itemId: string) => {
    console.log(`Adding ${itemId} to inventory`);
  };

  const groupedInventory = inventoryData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Inventory Categories</h2>
      
      {Object.entries(groupedInventory).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-muted-foreground border-b border-border pb-2">
            {category}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={item.id} 
                  className="bg-gradient-card border border-border shadow-card hover:shadow-float transition-all duration-300 rounded-2xl group"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-medium text-foreground">{item.name}</h4>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleAddToInventory(item.id)}
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-soft hover:shadow-float transition-all duration-300"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventorySection;
