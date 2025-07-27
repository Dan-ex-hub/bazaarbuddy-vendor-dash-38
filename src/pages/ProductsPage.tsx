import React, { useState, useMemo } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, Star, Plus, Minus } from "lucide-react";
import { mockProducts, categories, getProductsByCategory, searchProducts, type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductsPageProps {
  selectedCategory?: string;
  searchQuery?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ selectedCategory, searchQuery: initialSearchQuery }) => {
  const { user } = useAuth();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    // Filter by search query
    if (searchQuery) {
      products = searchProducts(searchQuery);
    }

    // Filter by category
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      products = getProductsByCategory(selectedCategoryFilter);
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return products;
  }, [searchQuery, selectedCategoryFilter, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      category: product.category,
      wholesaler: product.wholesaler,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getCartQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateQuantity = (productId: string, change: number) => {
    const currentQuantity = getCartQuantity(productId);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                Products
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search products... (try 'tamatar' or 'टमाटर')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="discount">Best Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results info */}
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategoryFilter !== 'all' && ` in ${selectedCategoryFilter}`}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const cartQuantity = getCartQuantity(product.id);
                
                return (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {product.nameHindi}
                          </CardDescription>
                        </div>
                        {product.discount && (
                          <Badge variant="secondary" className="text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold text-primary">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{product.unit}</span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          by {product.wholesaler}
                        </div>

                        {cartQuantity > 0 ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(product.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-medium">{cartQuantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(product.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Badge variant="secondary">In Cart</Badge>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="w-full"
                            disabled={!product.inStock}
                            size="sm"
                          >
                            <ShoppingCart className="w-3 h-3 mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No products found {searchQuery && `for "${searchQuery}"`}
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategoryFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;
