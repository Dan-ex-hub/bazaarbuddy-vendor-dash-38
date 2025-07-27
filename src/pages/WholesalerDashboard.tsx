import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Plus,
  Edit,
  BarChart3,
  Store
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WholesalerDashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product form would open here. Adding mock product to your inventory.",
    });

    // Simulate adding a new product
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      category: "Vegetables",
      price: 50,
      stock: 100,
      status: "In Stock"
    };

    // Update products state (for demo purposes)
    setProducts(prev => [...prev, newProduct]);

    toast({
      title: "Product Added Successfully!",
      description: `${newProduct.name} has been added to your inventory.`,
    });
  };

  const handleEditProduct = (product: any) => {
    toast({
      title: "Edit Product",
      description: `Editing ${product.name}. Product edit form would open here.`,
    });
  };

  // Mock data for wholesaler dashboard
  const [products] = useState([
    { id: 1, name: "Organic Tomatoes", category: "Vegetables", price: 45, stock: 500, status: "In Stock" },
    { id: 2, name: "Fresh Spinach", category: "Vegetables", price: 25, stock: 200, status: "Low Stock" },
    { id: 3, name: "Premium Carrots", category: "Vegetables", price: 35, stock: 300, status: "In Stock" },
    { id: 4, name: "Red Onions", category: "Vegetables", price: 30, stock: 400, status: "In Stock" },
    { id: 5, name: "Basmati Rice", category: "Grains", price: 85, stock: 150, status: "In Stock" },
  ]);

  const [orders] = useState([
    { id: "#1234", vendor: "Raj Patel", product: "Organic Tomatoes", quantity: 50, amount: 2250, status: "pending" },
    { id: "#1235", vendor: "Priya Shah", product: "Fresh Spinach", quantity: 30, amount: 750, status: "completed" },
    { id: "#1236", vendor: "Amit Kumar", product: "Red Onions", quantity: 25, amount: 750, status: "processing" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Store className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sahaayak</h1>
              <p className="text-sm text-muted-foreground">Wholesaler Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 border border-primary/20">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-muted-foreground mb-4">
              Manage your wholesale business and track performance on Sahaayak
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Store className="w-3 h-3 mr-1" />
                Wholesaler Account
              </Badge>
              <Badge variant="outline">
                Trust Score: 4.7/5.0
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,45,670</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Products</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          product.status === 'In Stock' ? 'secondary' : 
                          product.status === 'Low Stock' ? 'outline' : 'destructive'
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-semibold">₹{product.price}/kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Stock:</span>
                        <span>{product.stock} kg</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Vendor</th>
                        <th className="p-4 font-medium">Product</th>
                        <th className="p-4 font-medium">Quantity</th>
                        <th className="p-4 font-medium">Amount</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.vendor}</td>
                          <td className="p-4">{order.product}</td>
                          <td className="p-4">{order.quantity} kg</td>
                          <td className="p-4">₹{order.amount}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                order.status === 'completed' ? 'secondary' :
                                order.status === 'processing' ? 'outline' : 'destructive'
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {order.status === 'pending' && (
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Accept</Button>
                                <Button size="sm" variant="destructive">Reject</Button>
                              </div>
                            )}
                            {order.status === 'processing' && (
                              <Button size="sm">Complete</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-lg font-semibold">Performance Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Revenue chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Organic Tomatoes</span>
                      <span className="font-semibold">₹45,680</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Red Onions</span>
                      <span className="font-semibold">₹38,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Basmati Rice</span>
                      <span className="font-semibold">₹32,150</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Insights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm">Repeat Customers</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm">Satisfaction</span>
                        <span className="font-semibold">4.7/5.0</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Raj Patel</p>
                        <p className="text-sm text-muted-foreground">Ghatkopar</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹25,400</p>
                        <p className="text-sm text-muted-foreground">12 orders</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Priya Shah</p>
                        <p className="text-sm text-muted-foreground">Andheri</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹18,900</p>
                        <p className="text-sm text-muted-foreground">8 orders</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Order #485 completed</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New order #486 received</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New 5-star review</p>
                        <p className="text-xs text-muted-foreground">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WholesalerDashboard;
