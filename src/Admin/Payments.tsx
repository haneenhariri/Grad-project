import { useState, useEffect } from "react";
import Button from "../Ui/Button/Button";
import img from "../assets/Search (1).png";
import axiosInstance from "../services/axiosInstance";

interface PaymentHistory {
  student: string;
  accountType: "Student" | "Instructor";
  amount: number;
  transactionDate: string;
  course: string;
  account_id:string;
}

export default function Payments() {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get('/payments/all');
        if (response.data.status === "success") {
          const transformedData = response.data.data.map((payment: any) => ({
            student: `${payment.student}`, 
            accountType: payment.instructor === "instructor" ? "Instructor" : "Student",
            amount: payment.amount,
            account_id: payment.account_id,
            transactionDate: new Date(payment.created_at).toLocaleDateString(),
            course: payment.course,
          }));
          setPaymentHistory(transformedData);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <img src={img} alt="" className="border-2 border-violet-950" />
        <Button Bg="bg-btn" text="Add Payment" textColor="text-white" />
      </div>
      <div className="p-6 h-screen bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full h-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-3 text-gray-600 border-b border-gray-200">Account Name</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Account Id</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Account Type</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Amount</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Transaction Date</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Course</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{payment.student}</td>
                  <td className="p-3 text-center">{payment.account_id}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-sm font-semibold rounded-md ${payment.accountType === "Student" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {payment.accountType}
                    </span>
                  </td>
                  <td className="p-3">${payment.amount}</td>
                  <td className="p-3">{payment.transactionDate}</td>
                  <td className="p-3">{payment.course}</td>
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
  );
}
