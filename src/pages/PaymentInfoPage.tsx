import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Wallet, 
  Building, 
  Plus, 
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentInfoPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const paymentMethods = [
    {
      id: "1",
      type: "UPI",
      details: "raj.patel@paytm",
      lastUsed: "2 days ago",
      isDefault: true,
      icon: Wallet,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "2",
      type: "Credit Card",
      details: "**** **** **** 4532",
      lastUsed: "1 week ago",
      isDefault: false,
      icon: CreditCard,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "3",
      type: "Bank Account",
      details: "SBI ***6789",
      lastUsed: "2 weeks ago",
      isDefault: false,
      icon: Building,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const transactions = [
    { id: "T001", date: "2024-01-25", amount: "₹350", status: "Success", method: "UPI", description: "Purchase from Fresh Valley Wholesalers" },
    { id: "T002", date: "2024-01-22", amount: "₹180", status: "Success", method: "Credit Card", description: "Purchase from Spice Garden Suppliers" },
    { id: "T003", date: "2024-01-20", amount: "₹520", status: "Pending", method: "Bank Transfer", description: "Purchase from Grain Master Ltd" },
    { id: "T004", date: "2024-01-18", amount: "₹275", status: "Failed", method: "UPI", description: "Purchase from Premium Fruit Mart" },
  ];

  const handleAddPaymentMethod = () => {
    setIsAddingCard(true);
    toast({
      title: "Add Payment Method",
      description: "Feature coming soon! This will integrate with payment gateways.",
    });
  };

  const handleSetDefault = (methodId: string) => {
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been changed.",
    });
  };

  const handleDeleteMethod = (methodId: string) => {
    toast({
      title: "Payment method removed",
      description: "The payment method has been deleted from your account.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return CheckCircle;
      case 'Pending': return AlertTriangle;
      case 'Failed': return AlertTriangle;
      default: return AlertTriangle;
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
                Payment Information
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">₹1,325</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Payment Methods</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wallet className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold">₹0</div>
                      <div className="text-xs text-muted-foreground">Pending Amount</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="methods" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                  <TabsTrigger value="history">Transaction History</TabsTrigger>
                </TabsList>

                <TabsContent value="methods" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
                    <Button onClick={handleAddPaymentMethod}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Method
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <Card key={method.id}>
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-lg ${method.color}`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">{method.type}</h4>
                                  {method.isDefault && (
                                    <Badge variant="secondary" className="text-xs">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{method.details}</p>
                                <p className="text-xs text-muted-foreground">Last used: {method.lastUsed}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {!method.isDefault && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleSetDefault(method.id)}
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteMethod(method.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Recent Transactions</h3>
                    <div className="text-sm text-muted-foreground">
                      Last 30 days
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b">
                            <tr className="text-left">
                              <th className="p-4 font-medium">Transaction ID</th>
                              <th className="p-4 font-medium">Date</th>
                              <th className="p-4 font-medium">Amount</th>
                              <th className="p-4 font-medium">Method</th>
                              <th className="p-4 font-medium">Status</th>
                              <th className="p-4 font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction) => {
                              const StatusIcon = getStatusIcon(transaction.status);
                              return (
                                <tr key={transaction.id} className="border-b">
                                  <td className="p-4 font-mono text-sm">{transaction.id}</td>
                                  <td className="p-4 text-sm">{transaction.date}</td>
                                  <td className="p-4 font-semibold">{transaction.amount}</td>
                                  <td className="p-4 text-sm">{transaction.method}</td>
                                  <td className="p-4">
                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                                      <StatusIcon className="w-3 h-3 mr-1" />
                                      {transaction.status}
                                    </div>
                                  </td>
                                  <td className="p-4 text-sm text-muted-foreground">
                                    {transaction.description}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Security Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Security & Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Payment Security</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• All payments are encrypted with 256-bit SSL</li>
                        <li>• PCI DSS compliant payment processing</li>
                        <li>• Two-factor authentication available</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Privacy Protection</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Card details are never stored on our servers</li>
                        <li>• Transaction data is encrypted at rest</li>
                        <li>• Regular security audits performed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PaymentInfoPage;
