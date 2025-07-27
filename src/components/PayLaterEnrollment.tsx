import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Shield, Clock, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const enrollmentSchema = z.object({
  aadhar: z.string().regex(/^\d{4}\s\d{4}\s\d{4}$/, "Enter valid Aadhar format (XXXX XXXX XXXX)"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter valid PAN format").optional().or(z.literal("")),
  accountNumber: z.string().min(9, "Account number must be at least 9 digits").max(18, "Account number too long"),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter valid IFSC code"),
  upi: z.string().email("Enter valid UPI ID").or(z.string().regex(/^\d{10}@[a-z]+$/, "Enter valid UPI ID")),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type EnrollmentForm = z.infer<typeof enrollmentSchema>;

interface PayLaterEnrollmentProps {
  onEnrollmentComplete?: () => void;
}

const PayLaterEnrollment = ({ onEnrollmentComplete }: PayLaterEnrollmentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      aadhar: "",
      pan: "",
      accountNumber: "",
      ifsc: "",
      upi: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: EnrollmentForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Enrollment Successful!",
        description: "Your Pay Later account has been activated with ₹3,000 credit limit.",
      });
      
      onEnrollmentComplete?.();
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAadhar = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted.substring(0, 14);
  };

  return (
    <div className="space-y-6">
      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay Later Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">₹3,000 Credit</h4>
                <p className="text-sm text-muted-foreground">Instant purchasing power</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">30 Days</h4>
                <p className="text-sm text-muted-foreground">Interest-free period</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Secure</h4>
                <p className="text-sm text-muted-foreground">Bank-grade security</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="aadhar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXX XXXX XXXX"
                        {...field}
                        onChange={(e) => field.onChange(formatAadhar(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ABCDE1234F"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ifsc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="HDFC0001234"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="upi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="vendor@upi or phone@paytm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Terms & Conditions
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Repayment must be made within 30 days of purchase</li>
                  <li>• Late payment attracts 5% monthly interest</li>
                  <li>• Service will be blocked if payment is overdue by more than 30 days</li>
                  <li>• Credit limit is fixed at ₹3,000 and non-transferable</li>
                </ul>
              </div>

              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to pay within 30 days or interest will be charged *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Enroll in Pay Later"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayLaterEnrollment;