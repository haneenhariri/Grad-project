import { useState, useEffect } from "react";
import img from "../assets/Search (1).png";
import axiosInstance from "../services/axiosInstance";

interface Payment {
  account_id: number;
  intended_account_id: number;
  amount: number;
  created_at: string;
  course: string;
  instructor: string;
  student:string;
}

export default function Earning() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get("/payments");
        console.log("API Response:", response.data);

        if (response.data && response.data.data) {
          setPayments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <div className="flex gap-4 justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Payment History</h1>
        <img src={img} alt="Search" className="border-2 border-violet-950" />
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-3 text-gray-600 border-b border-gray-200">Student Name</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Amount ($)</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Date</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Course</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-200">{` ${payment.student}`}</td>
                    <td className="p-3 border-b border-gray-200">${payment.amount}</td>
                    <td className="p-3 border-b border-gray-200">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b border-gray-200">{payment.course}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-3 text-gray-500">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
