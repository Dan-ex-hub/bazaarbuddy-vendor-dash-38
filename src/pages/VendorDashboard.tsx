import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoriesSection from "@/components/CategoriesSection";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import RecentOrdersSection from "@/components/RecentOrdersSection";
import BudgetSection from "@/components/BudgetSection";
import WholesalersSection from "@/components/WholesalersSection";

const VendorDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                {t('nav.welcome')}, {user?.name}!
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
              
              {/* Welcome Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 border border-primary/20">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome to your Vendor Dashboard
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Manage your orders, find wholesalers, and track your business growth
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      Vendor Account
                    </Badge>
                    <Badge variant="outline">
                      Status: Active
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">
                      Currently processing
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Savings
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹3,240</div>
                    <p className="text-xs text-muted-foreground">
                      Through bulk orders
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Voice Search Bar */}
              <div className="mb-8">
                <VoiceSearchBar />
              </div>

              {/* Categories Section */}
              <div className="mb-12">
                <CategoriesSection />
              </div>
              
              {/* Recent Orders Section */}
              <div className="mb-12">
                <RecentOrdersSection />
              </div>
              
              {/* Budget Section */}
              <div className="mb-12">
                <BudgetSection />
              </div>
              
              {/* Wholesalers Section */}
              <div className="mb-12">
                <WholesalersSection />
              </div>

              {/* Recent Activity */}
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest orders and activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order #1234 completed</p>
                          <p className="text-xs text-muted-foreground">Organic Tomatoes - 10kg</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order #1235 in transit</p>
                          <p className="text-xs text-muted-foreground">Fresh Spinach - 5kg</p>
                        </div>
                        <Badge variant="outline">In Transit</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order #1236 pending</p>
                          <p className="text-xs text-muted-foreground">Basmati Rice - 25kg</p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VendorDashboard;
