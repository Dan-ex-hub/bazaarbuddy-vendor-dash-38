import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import VendorNavbar from "@/components/VendorNavbar";

interface FoodDonation {
  id: string;
  foodType: string;
  quantity: string;
  pickupAddress: string;
  pickupTime: string;
  status: string;
  createdAt: string;
}

const FoodDonations = () => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    const savedDonations = JSON.parse(localStorage.getItem("foodDonations") || "[]");
    setDonations(savedDonations);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "collected":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VendorNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600 text-center">
              Your Food Donations
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Track your contributions to helping those in need
            </p>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No donations yet. Start donating leftover food to help those in need!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50">
                      <TableHead className="font-semibold text-green-700">Food</TableHead>
                      <TableHead className="font-semibold text-green-700">Qty</TableHead>
                      <TableHead className="font-semibold text-green-700">Status</TableHead>
                      <TableHead className="font-semibold text-green-700">Date</TableHead>
                      <TableHead className="font-semibold text-green-700">Pickup Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{donation.foodType}</div>
                            <div className="text-sm text-muted-foreground">
                              {donation.pickupAddress}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(donation.status)}>
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{donation.createdAt}</TableCell>
                        <TableCell>
                          {new Date(donation.pickupTime).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FoodDonations;