import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CreditCard, Calendar, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { VendorLedger } from "@/types/payLater";

// Mock data - in real app, this would come from an API
const mockLedgerData: VendorLedger = {
  vendorId: "vendor123",
  totalCreditLimit: 3000,
  usedCredit: 1200,
  dueDate: "2025-08-25",
  interestRate: 0.05,
  isEnrolled: true,
  isBlocked: false,
  bankDetails: {
    aadhar: "XXXX XXXX XXXX",
    pan: "ABCDE1234F",
    accountNumber: "123456789",
    ifsc: "HDFC0001234",
    upi: "vendor@upi"
  }
};

const PayLaterSection = () => {
  const ledger = mockLedgerData;
  const remainingCredit = ledger.totalCreditLimit - ledger.usedCredit;
  const creditUsagePercentage = (ledger.usedCredit / ledger.totalCreditLimit) * 100;
  
  // Calculate if overdue and interest
  const today = new Date();
  const dueDate = ledger.dueDate ? new Date(ledger.dueDate) : null;
  const isOverdue = dueDate && today > dueDate;
  const monthsOverdue = isOverdue && dueDate ? 
    Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
  const interestAmount = isOverdue ? ledger.usedCredit * ledger.interestRate * monthsOverdue : 0;
  const totalPayable = ledger.usedCredit + interestAmount;

  if (!ledger.isEnrolled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay Later Credit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Get instant credit up to ₹3,000 for your purchases
            </p>
            <Link to="/pay-later">
              <Button>Enroll in Pay Later</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pay Later Credit
          {ledger.isBlocked && (
            <Badge variant="destructive" className="ml-auto">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Blocked
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credit Overview */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Credit Usage</span>
            <span className="text-sm font-medium">
              ₹{ledger.usedCredit.toLocaleString()} / ₹{ledger.totalCreditLimit.toLocaleString()}
            </span>
          </div>
          <Progress value={creditUsagePercentage} className="h-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-primary">
                ₹{remainingCredit.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Available Credit</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-foreground">
                ₹{ledger.usedCredit.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Used Credit</p>
            </div>
          </div>
        </div>

        {/* Due Date and Interest */}
        {ledger.usedCredit > 0 && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Due Date</span>
              </div>
              <span className={`text-sm ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                {dueDate?.toLocaleDateString('en-IN')}
              </span>
            </div>
            
            {isOverdue && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Interest</span>
                </div>
                <span className="text-sm font-medium text-destructive">
                  ₹{interestAmount.toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Total Payable</span>
              <span className={`font-bold ${isOverdue ? 'text-destructive' : 'text-foreground'}`}>
                ₹{totalPayable.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/pay-later" className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          {ledger.usedCredit > 0 && (
            <Link to="/pay-later?tab=repay" className="flex-1">
              <Button className="w-full">
                {isOverdue ? 'Pay Now' : 'Repay'}
              </Button>
            </Link>
          )}
        </div>

        {ledger.isBlocked && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-destructive">
              Your Pay Later service is blocked due to overdue payment. Please repay to reactivate.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PayLaterSection;
