import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  Package,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      toast({
        title: "Item Removed",
        description: `${item.name} has been removed from your cart.`,
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (item: any) => {
    removeFromCart(item.id);
    toast({
      title: "Item Removed",
      description: `${item.name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout Coming Soon!",
      description: "Checkout functionality will be implemented here. Your cart total is ₹" + getCartTotal().toLocaleString(),
    });
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.name}-${item.price}`;
    if (!acc[key]) {
      acc[key] = { ...item, totalQuantity: 0, totalPrice: 0 };
    }
    acc[key].totalQuantity += item.quantity;
    acc[key].totalPrice += item.price * item.quantity;
    return acc;
  }, {} as Record<string, any>);

  const uniqueItems = Object.values(groupedItems);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger />
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                Shopping Cart
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                <ShoppingCart className="w-3 h-3 mr-1" />
                {getCartItemsCount()} Items
              </Badge>
              <Badge variant="outline">
                ₹{getCartTotal().toLocaleString()}
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">₹{getCartTotal().toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Total for {getCartItemsCount()} items
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleClearCart}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear Cart
                        </Button>
                        <Button onClick={handleCheckout}>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">
                      Add some items to your cart to get started!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => navigate('/products')}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Browse Products
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/offers')}>
                        View Offers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {uniqueItems.map((item) => (
                    <Card key={`${item.name}-${item.price}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <div className="space-y-1 mt-1">
                              <p className="text-sm text-muted-foreground">
                                {item.category} • {item.unit}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                by {item.wholesaler}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold">₹{item.price}</span>
                                <span className="text-sm text-muted-foreground">{item.unit}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-lg font-medium w-12 text-center">
                                {item.totalQuantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Total Price */}
                            <div className="text-right">
                              <p className="text-xl font-bold">₹{item.totalPrice.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.totalQuantity} × ₹{item.price}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveItem(item)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Checkout Section */}
              {cartItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Checkout?</CardTitle>
                    <CardDescription>
                      Review your items and proceed to payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-lg">
                        <span>Subtotal ({getCartItemsCount()} items):</span>
                        <span className="font-bold">₹{getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Delivery charges:</span>
                        <span>FREE</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total:</span>
                          <span>₹{getCartTotal().toLocaleString()}</span>
                        </div>
                      </div>
                      <Button className="w-full" size="lg" onClick={handleCheckout}>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CartPage;
