export interface BankDetails {
  aadhar: string;
  pan?: string;
  accountNumber: string;
  ifsc: string;
  upi: string;
}

export interface VendorLedger {
  vendorId: string;
  totalCreditLimit: number;
  usedCredit: number;
  dueDate?: string;
  interestRate: number;
  bankDetails?: BankDetails;
  isEnrolled: boolean;
  isBlocked: boolean;
}

export interface LedgerTransaction {
  id: string;
  vendorId: string;
  amount: number;
  type: 'purchase' | 'repayment' | 'interest';
  date: string;
  description: string;
}