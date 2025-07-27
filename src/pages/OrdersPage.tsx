import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ShoppingBag,
  Calendar,
  Filter
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  wholesaler: string;
  deliveryDate?: string;
}

const OrdersPage = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const mockOrders: Order[] = [
    {
      id: "ORD-001",
      date: "2024-01-25",
      items: [
        { name: "Organic Tomatoes", quantity: 10, price: 25 },
        { name: "Red Onions", quantity: 5, price: 30 }
      ],
      total: 400,
      status: "completed",
      wholesaler: "Fresh Valley Wholesalers",
      deliveryDate: "2024-01-26"
    },
    {
      id: "ORD-002", 
      date: "2024-01-23",
      items: [
        { name: "Basmati Rice", quantity: 2, price: 120 },
        { name: "Turmeric Powder", quantity: 1, price: 180 }
      ],
      total: 420,
      status: "processing",
      wholesaler: "Spice Garden Suppliers",
      deliveryDate: "2024-01-27"
    },
    {
      id: "ORD-003",
      date: "2024-01-22",
      items: [
        { name: "Fresh Spinach", quantity: 8, price: 20 },
        { name: "Green Chilies", quantity: 2, price: 120 }
      ],
      total: 400,
      status: "pending",
      wholesaler: "Fresh Valley Wholesalers"
    },
    {
      id: "ORD-004",
      date: "2024-01-20",
      items: [
        { name: "Fresh Milk", quantity: 5, price: 55 },
        { name: "Paneer", quantity: 1, price: 320 }
      ],
      total: 595,
      status: "completed",
      wholesaler: "Dairy Fresh Co.",
      deliveryDate: "2024-01-21"
    },
    {
      id: "ORD-005",
      date: "2024-01-18",
      items: [
        { name: "Red Chili Powder", quantity: 1, price: 200 }
      ],
      total: 200,
      status: "cancelled",
      wholesaler: "Spice Master Inc"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Clock;
      case 'pending': return AlertTriangle;
      case 'cancelled': return AlertTriangle;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === statusFilter);

  const orderStats = {
    total: mockOrders.length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    totalSpent: mockOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
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
                My Orders
              </h1>
            </div>
            <Badge variant="secondary">
              <ShoppingBag className="w-3 h-3 mr-1" />
              {orderStats.total} Orders
            </Badge>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Order Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">{orderStats.total}</div>
                      <div className="text-xs text-muted-foreground">Total Orders</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">{orderStats.completed}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">{orderStats.processing + orderStats.pending}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">₹{orderStats.totalSpent}</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter by status:</span>
                    <div className="flex space-x-2">
                      {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                        <Button
                          key={status}
                          variant={statusFilter === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setStatusFilter(status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  
                  return (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <span>{order.id}</span>
                              <Badge className={`${getStatusColor(order.status)} text-xs`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {order.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-1">
                              <span>Ordered: {new Date(order.date).toLocaleDateString()}</span>
                              {order.deliveryDate && (
                                <span>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                              )}
                              <span>From: {order.wholesaler}</span>
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">₹{order.total}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Items:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                <span className="text-sm">{item.name}</span>
                                <span className="text-sm font-medium">
                                  {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {(order.status === 'pending' || order.status === 'processing') && (
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              Contact Wholesaler
                            </Button>
                            {order.status === 'pending' && (
                              <Button variant="destructive" size="sm">
                                Cancel Order
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredOrders.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders found</h3>
                    <p className="text-muted-foreground mb-4">
                      {statusFilter === 'all' 
                        ? "You haven't placed any orders yet." 
                        : `No ${statusFilter} orders found.`}
                    </p>
                    <Button onClick={() => setStatusFilter('all')}>
                      {statusFilter === 'all' ? 'Browse Products' : 'View All Orders'}
                    </Button>
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

export default OrdersPage;
