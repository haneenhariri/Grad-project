import { useState } from "react";
import img from '../assets/Search (1).png'
import Button from "../Ui/Button/Button";

interface Payment {
  studentName: string;
  amount: number;
  date: string;
}

const paymentsData: Payment[] = [
  { studentName: "John Doe", amount: 100, date: "2024-01-15" },
  { studentName: "Jane Smith", amount: 150, date: "2024-02-10" },
  { studentName: "Emily Johnson", amount: 200, date: "2024-03-05" },
  { studentName: "Michael Brown", amount: 120, date: "2024-04-22" },
  { studentName: "Sarah Wilson", amount: 180, date: "2024-05-12" },
  { studentName: "John Doe", amount: 100, date: "2024-01-15" },
  { studentName: "Jane Smith", amount: 150, date: "2024-02-10" },
  { studentName: "Emily Johnson", amount: 200, date: "2024-03-05" },
  { studentName: "Michael Brown", amount: 120, date: "2024-04-22" },
  { studentName: "Sarah Wilson", amount: 180, date: "2024-05-12" },
  { studentName: "John Doe", amount: 100, date: "2024-01-15" },
  { studentName: "Jane Smith", amount: 150, date: "2024-02-10" },
  { studentName: "Emily Johnson", amount: 200, date: "2024-03-05" },
  { studentName: "Michael Brown", amount: 120, date: "2024-04-22" },
  { studentName: "Sarah Wilson", amount: 180, date: "2024-05-12" }
];
export default function Earning() {
  const [payments, setPayments] = useState<Payment[]>(paymentsData);
  return (
    <div>
      <div className="flex gap-4 justify-between items-center mb-4">
        <h1 className=" text-3xl font-semibold">Payment History</h1>
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
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">{payment.studentName}</td>
                  <td className="p-3 border-b border-gray-200">${payment.amount}</td>
                  <td className="p-3 border-b border-gray-200">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
