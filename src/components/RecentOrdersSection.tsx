import ReorderCard from "./ReorderCard";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface RecentOrder {
  id: string;
  itemName: string;
  orderCount: number;
}

const recentOrders: RecentOrder[] = [
  { id: "1", itemName: "Organic Tomatoes (5kg)", orderCount: 12 },
  { id: "2", itemName: "Fresh Onions (10kg)", orderCount: 8 },
  { id: "3", itemName: "Basmati Rice (25kg)", orderCount: 15 },
  { id: "4", itemName: "Chicken Breast (3kg)", orderCount: 6 },
  { id: "5", itemName: "Fresh Spinach (2kg)", orderCount: 9 },
  { id: "6", itemName: "Paneer (1kg)", orderCount: 4 },
];

const RecentOrdersSection = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleReorder = (itemId: string, quantity: number) => {
    const order = recentOrders.find(o => o.id === itemId);
    if (!order) return;

    // Extract item name and estimate price
    const itemName = order.itemName.split(' (')[0]; // Remove weight from name
    const estimatedPrice = getEstimatedPrice(itemName);

    // Add to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `reorder-${itemId}-${Date.now()}-${i}`,
        name: itemName,
        price: estimatedPrice,
        unit: "per kg",
        category: "Vegetables", // Default category
        wholesaler: "Previous Supplier"
      });
    }

    toast({
      title: "Reorder Successful!",
      description: `${quantity} × ${itemName} has been added to your cart.`,
    });
  };

  const getEstimatedPrice = (itemName: string): number => {
    // Simple price estimation based on item name
    const priceMap: Record<string, number> = {
      "Organic Tomatoes": 45,
      "Fresh Onions": 30,
      "Basmati Rice": 120,
      "Chicken Breast": 320,
      "Fresh Spinach": 25,
      "Paneer": 320
    };
    return priceMap[itemName] || 50; // Default price
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recently Ordered Items</h2>
      
      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
        {recentOrders.map((order) => (
          <ReorderCard
            key={order.id}
            itemName={order.itemName}
            orderCount={order.orderCount}
            onReorder={(quantity) => handleReorder(order.id, quantity)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentOrdersSection;
