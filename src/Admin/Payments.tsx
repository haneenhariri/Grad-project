import { useState } from "react";
import Button from "../Ui/Button/Button";
import img from "../assets/Search (1).png";

interface PaymentHistory {
  accountName: string;
  accountType: "Student" | "Instructor";
  amount: number;
  transactionDate: string;
}

const paymentHistoryData: PaymentHistory[] = [
  { 
    accountName: "John Doe", 
    accountType: "Student", 
    amount: 150, 
    transactionDate: "2023-12-01" 
  },
  { 
    accountName: "Jane Smith", 
    accountType: "Instructor", 
    amount: 200, 
    transactionDate: "2023-12-05" 
  },
  { 
    accountName: "Mark Johnson", 
    accountType: "Student", 
    amount: 120, 
    transactionDate: "2023-12-10" 
  },
  { 
    accountName: "John Doe", 
    accountType: "Student", 
    amount: 150, 
    transactionDate: "2023-12-01" 
  },
  { 
    accountName: "Jane Smith", 
    accountType: "Instructor", 
    amount: 200, 
    transactionDate: "2023-12-05" 
  },
  { 
    accountName: "John Doe", 
    accountType: "Student", 
    amount: 150, 
    transactionDate: "2023-12-01" 
  },
  { 
    accountName: "Jane Smith", 
    accountType: "Instructor", 
    amount: 200, 
    transactionDate: "2023-12-05" 
  },
  { 
    accountName: "Mark Johnson", 
    accountType: "Student", 
    amount: 120, 
    transactionDate: "2023-12-10" 
  },
];

  
export default function Payments() {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>(paymentHistoryData);

  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <img src={img} alt="" className="border-2 border-violet-950" />
        <Button Bg="bg-btn" text="Add Payment" textColor="text-white" />
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-3 text-gray-600 border-b border-gray-200">Account Name</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Account Type</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Amount</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Transaction Date</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{payment.accountName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-sm font-semibold rounded-md ${payment.accountType === "Student" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {payment.accountType}
                    </span>
                  </td>
                  <td className="p-3">${payment.amount}</td>
                  <td className="p-3">{payment.transactionDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-sm font-semibold rounded-md ${payment.accountType === "Student" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {payment.accountType === "Student" ? "Payment Made" : "Payment Received"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
