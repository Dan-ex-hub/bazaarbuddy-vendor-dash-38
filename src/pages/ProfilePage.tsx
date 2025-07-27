import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Edit, 
  Save, 
  Star,
  ShoppingBag,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: 'raj.patel@example.com',
    location: (user as any)?.location || 'Mumbai',
    bio: 'Experienced street vendor specializing in fresh chaat and snacks. Serving the Ghatkopar community for over 5 years.',
    businessName: 'Raj\'s Fresh Chaat Corner',
    experience: '5 years'
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  const stats = [
    { label: "Total Orders", value: "127", icon: ShoppingBag, color: "text-blue-600" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "text-yellow-600" },
    { label: "Monthly Growth", value: "+12%", icon: TrendingUp, color: "text-green-600" },
    { label: "Member Since", value: "2019", icon: Calendar, color: "text-purple-600" }
  ];

  const recentOrders = [
    { id: "#1234", items: "Organic Tomatoes, Red Onions", amount: "₹350", date: "2 days ago", status: "Delivered" },
    { id: "#1235", items: "Fresh Spinach, Green Chilies", amount: "₹180", date: "1 week ago", status: "Delivered" },
    { id: "#1236", items: "Basmati Rice, Wheat Flour", amount: "₹520", date: "2 weeks ago", status: "Delivered" },
  ];

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
                My Profile
              </h1>
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"} 
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/api/placeholder/100/100" />
                      <AvatarFallback className="text-lg">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 text-center sm:text-left">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="text-lg font-semibold"
                          />
                          <Input
                            value={profileData.businessName}
                            onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                            placeholder="Business Name"
                          />
                        </div>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold">{profileData.name}</h2>
                          <p className="text-muted-foreground">{profileData.businessName}</p>
                        </>
                      )}
                      
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                        <Badge variant="secondary">
                          <User className="w-3 h-3 mr-1" />
                          Vendor
                        </Badge>
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {profileData.location}
                        </Badge>
                        <Badge variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          4.8 Rating
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="flex flex-col items-center p-4">
                      <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground text-center">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Profile Details and Orders */}
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Profile Details</TabsTrigger>
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Manage your account details and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            {isEditing ? (
                              <Input
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              />
                            ) : (
                              <span>{profileData.phone}</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            {isEditing ? (
                              <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              />
                            ) : (
                              <span>{profileData.email}</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {isEditing ? (
                              <Input
                                id="location"
                                value={profileData.location}
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                              />
                            ) : (
                              <span>{profileData.location}</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience</Label>
                          {isEditing ? (
                            <Input
                              id="experience"
                              value={profileData.experience}
                              onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                            />
                          ) : (
                            <span>{profileData.experience}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        Your latest purchases and order history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{order.id}</span>
                                <Badge variant="secondary">{order.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{order.items}</p>
                              <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{order.amount}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
