import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import VendorNavbar from "@/components/VendorNavbar";
import PayLaterEnrollment from "@/components/PayLaterEnrollment";
import PayLaterRepayment from "@/components/PayLaterRepayment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, CreditCard, History, Receipt, AlertTriangle } from "lucide-react";

// Mock data
const mockLedgerData = {
  vendorId: "vendor123",
  totalCreditLimit: 3000,
  usedCredit: 1200,
  dueDate: "2025-08-25",
  isEnrolled: true,
  isBlocked: false,
};

const mockTransactions = [
  {
    id: "txn1",
    date: "2025-07-20",
    type: "purchase",
    amount: 500,
    description: "Grocery purchase - Invoice #12345",
    status: "completed"
  },
  {
    id: "txn2", 
    date: "2025-07-18",
    type: "purchase",
    amount: 700,
    description: "Wholesale vegetables - Invoice #12344",
    status: "completed"
  },
  {
    id: "txn3",
    date: "2025-07-15",
    type: "repayment",
    amount: -800,
    description: "Payment via UPI - TXN789123",
    status: "completed"
  },
];

const PayLaterPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const remainingCredit = mockLedgerData.totalCreditLimit - mockLedgerData.usedCredit;
  const today = new Date();
  const dueDate = new Date(mockLedgerData.dueDate);
  const isOverdue = today > dueDate;

  if (!mockLedgerData.isEnrolled) {
    return (
      <div className="min-h-screen bg-background">
        <VendorNavbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Pay Later Service
              </h1>
              <p className="text-muted-foreground">
                Get instant credit up to ₹3,000 for your business needs
              </p>
            </div>
            
            <PayLaterEnrollment onEnrollmentComplete={() => window.location.reload()} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorNavbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Pay Later Account
              </h1>
              <p className="text-muted-foreground">
                Manage your credit account and payments
              </p>
            </div>
            {mockLedgerData.isBlocked && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Account Blocked
              </Badge>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="repay" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Repay
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Credit Limit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{mockLedgerData.totalCreditLimit.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Available Credit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      ₹{remainingCredit.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Used Credit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${isOverdue ? 'text-destructive' : 'text-foreground'}`}>
                      ₹{mockLedgerData.usedCredit.toLocaleString()}
                    </div>
                    {isOverdue && (
                      <p className="text-sm text-destructive mt-1">
                        Overdue since {dueDate.toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {mockLedgerData.usedCredit > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Due</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Due Date</span>
                        <span className={isOverdue ? 'text-destructive font-medium' : 'text-foreground'}>
                          {dueDate.toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Amount Due</span>
                        <span className="font-bold text-lg">
                          ₹{mockLedgerData.usedCredit.toLocaleString()}
                        </span>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => setActiveTab('repay')}
                        variant={isOverdue ? "destructive" : "default"}
                      >
                        {isOverdue ? 'Pay Now (Overdue)' : 'Make Payment'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="repay" className="space-y-6">
              <PayLaterRepayment onRepaymentComplete={() => window.location.reload()} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString('en-IN')}
                          </TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === 'purchase' ? 'secondary' : 'outline'}>
                              {transaction.type === 'purchase' ? 'Purchase' : 'Repayment'}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className={`text-right font-medium ${
                            transaction.amount > 0 ? 'text-destructive' : 'text-green-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PayLaterPage;