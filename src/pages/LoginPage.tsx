import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Store, ShoppingCart, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [vendorForm, setVendorForm] = useState({ phone: '', password: '' });
  const [wholesalerForm, setWholesalerForm] = useState({ phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleVendorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(vendorForm.phone, vendorForm.password, 'vendor');
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as vendor.",
        });
        navigate('/vendor-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials or account not approved.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWholesalerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(wholesalerForm.phone, wholesalerForm.password, 'wholesaler');
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as wholesaler.",
        });
        navigate('/wholesaler-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials or account not approved.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Sahaayak
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Tabs */}
        <Tabs defaultValue="vendor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vendor" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Vendor</span>
            </TabsTrigger>
            <TabsTrigger value="wholesaler" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Wholesaler</span>
            </TabsTrigger>
          </TabsList>

          {/* Vendor Login */}
          <TabsContent value="vendor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span>Vendor Login</span>
                </CardTitle>
                <CardDescription>
                  Access your vendor dashboard and manage orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVendorLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendor-phone">Phone Number</Label>
                    <Input
                      id="vendor-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={vendorForm.phone}
                      onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-password">Password</Label>
                    <Input
                      id="vendor-password"
                      type="password"
                      placeholder="Enter your password"
                      value={vendorForm.password}
                      onChange={(e) => setVendorForm({ ...vendorForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In as Vendor"}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Demo Vendors:</strong><br />
                    • Raj Patel: 9876543210 / vendor123<br />
                    • Priya Shah: 9876543211 / vendor123<br />
                    • Amit Kumar: 9876543212 / vendor123
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wholesaler Login */}
          <TabsContent value="wholesaler">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-primary" />
                  <span>Wholesaler Login</span>
                </CardTitle>
                <CardDescription>
                  Access your wholesaler dashboard and manage inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWholesalerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wholesaler-phone">Phone Number</Label>
                    <Input
                      id="wholesaler-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={wholesalerForm.phone}
                      onChange={(e) => setWholesalerForm({ ...wholesalerForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wholesaler-password">Password</Label>
                    <Input
                      id="wholesaler-password"
                      type="password"
                      placeholder="Enter your password"
                      value={wholesalerForm.password}
                      onChange={(e) => setWholesalerForm({ ...wholesalerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In as Wholesaler"}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Demo Wholesalers:</strong><br />
                    • Mumbai Fresh Mart: 9999999999 / password123<br />
                    • Gupta Fresh Veggies: 9000000001 / gupta123<br />
                    • Sharma Masala: 9000000002 / sharma123
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
