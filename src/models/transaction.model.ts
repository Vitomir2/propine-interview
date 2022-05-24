export interface Transaction {
  timestamp: number;
  transaction_type: "DEPOSIT" | "WITHDRAWAL";
  token: string;
  amount: number;
}
