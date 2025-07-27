import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Heart, Clock, MapPin, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodDonation {
  id: string;
  foodType: string;
  quantity: string;
  pickupAddress: string;
  pickupTime: string;
  status: string;
  createdAt: string;
}

const formSchema = z.object({
  foodType: z.string().min(3, "Please describe the food type (minimum 3 characters)"),
  quantity: z.string().min(1, "Please specify the quantity"),
  pickupAddress: z.string().min(5, "Please provide a complete pickup address"),
  pickupTime: z.string().min(1, "Please select a pickup time"),
});

const FoodDonationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodType: "",
      quantity: "",
      pickupAddress: "",
      pickupTime: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create donation object
    const donation: FoodDonation = {
      id: Date.now().toString(),
      foodType: values.foodType,
      quantity: values.quantity,
      pickupAddress: values.pickupAddress,
      pickupTime: values.pickupTime,
      status: "Pending",
      createdAt: new Date().toLocaleDateString()
    };

    // Save to localStorage
    const existingDonations = JSON.parse(localStorage.getItem("foodDonations") || "[]");
    localStorage.setItem("foodDonations", JSON.stringify([...existingDonations, donation]));

    // Show success message
    setIsSubmitted(true);
    
    toast({
      title: "Donation Submitted Successfully!",
      description: "Thank you for your kindness. We'll be in touch soon.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center border-green-200 shadow-lg">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">
              Thank You For Your Kindness!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Your leftover food will be collected and given to those in need.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Your Reward is Coming!</h3>
              </div>
              <p className="text-orange-700 text-sm leading-relaxed">
                After successful pickup, you'll receive a discount code for your next order. 
                The discount amount will be determined based on the quantity and quality of your donation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="w-full"
              >
                Return to Homepage
              </Button>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Donate More Food
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg border-green-100">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl text-green-700 mb-3">
            Have Leftover Food? Give & Get Rewarded!
          </CardTitle>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Donate your leftover food to help those in need and get a discount on your next purchase!
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="foodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Package className="w-4 h-4 text-green-600" />
                      Type of Food/Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g. Rice, Samosa, Curry, Bread, etc."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Package className="w-4 h-4 text-green-600" />
                      Quantity (approx)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 3 kg or 25 servings"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Pickup Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your complete pickup address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Clock className="w-4 h-4 text-green-600" />
                      Preferred Pickup Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Donate & Get Discount"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodDonationForm;