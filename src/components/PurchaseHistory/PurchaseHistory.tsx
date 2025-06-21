import { useEffect, useState } from "react";
import { userPayment } from "../../services/payment";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGraduationCap, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Payment {
  id: number;
  account_id: number;
  intended_account_id: number;
  amount: number;
  created_at: string;
  course: string;
  instructor: string;
  student?: string;
  course_cover:string;
}

export default function PurchaseHistory() {
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);

  // تجميع المدفوعات حسب التاريخ
  const groupedPayments = payments.reduce((groups: Record<string, Payment[]>, payment) => {
    const date = new Date(payment.created_at).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(payment);
    return groups;
  }, {});
  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await userPayment(lang);
        if (response && response.data) {
          const fixedData = response.data.map((item: any) => ({
            ...item,
            created_at: item.purchased_at,
            amount: item.total_price,
          }));
          setPayments(fixedData);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, [lang]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  const calculateTotalAmount = (payments: Payment[]) => {
    return payments.reduce((total, payment) => total + payment.amount, 0).toFixed(2);
  };
  
const toggleExpand = (date: string) => {
  setExpandedPayment(expandedPayment === date ? null : date);
};
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }
  
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">{t("No purchase history found")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="md:text-2xl text-lg font-semibold mb-6">{t("Purchase History")}</h2>
      
      {Object.entries(groupedPayments).map(([date, datePayments]) => {
        const isExpanded = expandedPayment === date;
        const totalAmount = calculateTotalAmount(datePayments);
        
        return (
          <div key={date} className="border rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Header - Always visible */}
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(date)}
            >
              <div>
                <h3 className="font-medium">{date}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-violet-100 text-violet-600 rounded-full">
                      <FaGraduationCap size={12} />
                    </span>
                    <span>{datePayments.length} {t("Courses")}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-violet-600">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-violet-100 text-violet-600 rounded-full">
                      <FaMoneyBillWave size={12} />
                    </span>
                    <span>${totalAmount}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 text-green-600 rounded-full">
                      <FaWallet size={12} />
                    </span>
                    <span>{t("App Wallet")}</span>
                  </div>
                </div>
              </div>
              
              <div>
                {isExpanded ? (
                  <FiChevronUp className="text-gray-500" size={20} />
                ) : (
                  <FiChevronDown className="text-gray-500" size={20} />
                )}
              </div>
            </div>
            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t">
                {datePayments.map((payment) => (
                  <div key={payment.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                    <div className="flex  gap-4">
                      <div className="w-1/2 flex gap-4 ">
                        <img src={`http://127.0.0.1:8000/storage/${payment.course_cover}`} className="w-40 h-32 object-cover rounded" alt="" />
                        <div className=" flex justify-between  flex-col">
                        <h4 className="font-medium line-clamp-2">{payment.course}</h4>
                        <p className="text-sm text-gray-500 mt-1">{t("Created by:")}: {payment.instructor}</p>
                        </div>
                      </div>
                      <div className="w-1/4 flex items-center justify-center">
                        <span className="text-violet-600 font-semibold">${payment.amount.toFixed(2)}</span>
                      </div>
                      <div className="w-1/4">
                        <div className="flex justify-between h-full  flex-col items-end">
                          <p className="text-lg font-medium">{formatDate(payment.created_at)}</p>
                          <div className="flex  gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{payment.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaWallet size={16} className="text-gray-500" />
                              <span>{t("App Wallet")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
