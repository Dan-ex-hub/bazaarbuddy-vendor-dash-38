import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IndianRupee, CreditCard, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for current outstanding
const mockOutstanding = {
  principal: 1200,
  interest: 60,
  dueDate: "2025-08-25",
  isOverdue: true,
  daysPastDue: 5,
};

const repaymentSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  paymentMethod: z.enum(["upi", "bank_transfer", "cash"], {
    message: "Please select a payment method",
  }),
  transactionId: z.string().min(1, "Transaction ID is required"),
});

type RepaymentForm = z.infer<typeof repaymentSchema>;

interface PayLaterRepaymentProps {
  onRepaymentComplete?: () => void;
}

const PayLaterRepayment = ({ onRepaymentComplete }: PayLaterRepaymentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalAmount = mockOutstanding.principal + mockOutstanding.interest;

  const form = useForm<RepaymentForm>({
    resolver: zodResolver(repaymentSchema),
    defaultValues: {
      amount: totalAmount,
      paymentMethod: undefined,
      transactionId: "",
    },
  });

  const selectedAmount = form.watch("amount");

  const onSubmit = async (data: RepaymentForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `₹${data.amount.toLocaleString()} has been credited to your account.`,
      });
      
      onRepaymentComplete?.();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Outstanding Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Outstanding Amount
            {mockOutstanding.isOverdue && (
              <Badge variant="destructive" className="ml-auto">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {mockOutstanding.daysPastDue} days overdue
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Principal Amount</span>
              <span className="font-medium">₹{mockOutstanding.principal.toLocaleString()}</span>
            </div>
            
            {mockOutstanding.interest > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest (5% monthly)</span>
                <span className="font-medium text-destructive">₹{mockOutstanding.interest.toLocaleString()}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total Payable</span>
              <span className="font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due Date: {new Date(mockOutstanding.dueDate).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Make Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          ₹
                        </span>
                        <Input
                          type="number"
                          className="pl-7"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => form.setValue("amount", mockOutstanding.principal)}
                        >
                          Principal Only (₹{mockOutstanding.principal})
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => form.setValue("amount", totalAmount)}
                        >
                          Full Amount (₹{totalAmount})
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upi">UPI Payment</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="cash">Cash Payment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID / Reference Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter transaction ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Summary */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium">Payment Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Payment Amount</span>
                  <span>₹{selectedAmount?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining Balance</span>
                  <span>₹{Math.max(0, totalAmount - (selectedAmount || 0)).toLocaleString()}</span>
                </div>
                {selectedAmount >= totalAmount && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>This will clear your entire outstanding balance</span>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing Payment..." : `Pay ₹${selectedAmount?.toLocaleString() || 0}`}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>UPI Payment:</strong> Use your registered UPI ID to make the payment
          </div>
          <div>
            <strong>Bank Transfer:</strong> Transfer to the provided account and enter the reference number
          </div>
          <div>
            <strong>Cash Payment:</strong> Visit our office and collect the receipt
          </div>
          <div className="text-xs">
            <strong>Note:</strong> Payments may take 2-24 hours to reflect. Please keep the transaction reference for your records.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayLaterRepayment;