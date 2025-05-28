import { useEffect, useState } from "react";
import { userPayment } from "../../services/payment";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import star from '../../assets/icons/Star (3).png';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGraduationCap, FaMoneyBillWave, FaWallet } from "react-icons/fa";

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
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null);
  
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
        const response = await userPayment();
        if (response && response.data) {
          setPayments(response.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);
  
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
    const dateTimestamp = new Date(date).getTime();
    setExpandedPayment(expandedPayment === dateTimestamp ? null : dateTimestamp);
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
      <h2 className="text-2xl font-semibold mb-6">{t("Purchase History")}</h2>
      
      {Object.entries(groupedPayments).map(([date, datePayments]) => {
        const isExpanded = expandedPayment === new Date(date).getTime();
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
                    <span>${totalAmount} USD</span>
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
                    <div className="flex gap-4">
                      <div className="w-1/3 flex ">
                        <img src={`http://127.0.0.1:8000/storage/${payment.course_cover}`} className=" w-44" alt="" />
                        <div>
                        <div className="flex items-center gap-2 mb-1">
                          
                          <div className="flex items-center">
                            <img src={star} alt="star" className="w-4 h-4" />
                            <span className="text-sm ml-1">4.7</span>
                          </div>
                          <span className="text-xs text-gray-500">(451 {t("Reviews")})</span>
                        </div>
                        <h4 className="font-medium line-clamp-2">{payment.course}</h4>
                        <p className="text-sm text-gray-500 mt-1">{t("Course by")}: {payment.instructor}</p>
                        </div>

                      </div>
                      
                      <div className="w-1/4 flex items-center justify-center">
                        <span className="text-violet-600 font-semibold">${payment.amount.toFixed(2)}</span>
                      </div>
                      
                      <div className="w-2/4">
                        <div className="flex flex-col items-end">
                          <p className="text-lg font-medium">{formatDate(payment.created_at)}</p>
                          <div className="flex gap-4 mt-2 text-sm">
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
