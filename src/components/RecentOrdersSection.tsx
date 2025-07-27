import ReorderCard from "./ReorderCard";

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
  const handleReorder = (itemId: string, quantity: number) => {
    console.log(`Reordering ${quantity} units of item ${itemId}`);
    // Reorder logic would be implemented here
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
