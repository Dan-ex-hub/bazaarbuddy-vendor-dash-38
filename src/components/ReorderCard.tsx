import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface ReorderCardProps {
  itemName: string;
  orderCount: number;
  initialQuantity?: number;
  onReorder: (quantity: number) => void;
}

const ReorderCard = ({ 
  itemName, 
  orderCount, 
  initialQuantity = 1, 
  onReorder 
}: ReorderCardProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleReorder = () => {
    onReorder(quantity);
  };

  return (
    <Card className="flex-shrink-0 w-64 sm:w-72 bg-gradient-card border border-border shadow-card hover:shadow-float transition-all duration-300 rounded-2xl">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Item Name */}
          <h3 className="text-base sm:text-lg font-semibold text-foreground line-clamp-2">
            {itemName}
          </h3>
          
          {/* Order History */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            You have ordered this {orderCount} times
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                className="h-8 w-8 p-0 rounded-lg border-border hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-base sm:text-lg font-medium w-8 text-center">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="h-8 w-8 p-0 rounded-lg border-border hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Reorder Button */}
          <Button
            onClick={handleReorder}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-2 font-medium transition-all duration-300 shadow-soft hover:shadow-float text-sm sm:text-base"
          >
            Reorder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReorderCard;
