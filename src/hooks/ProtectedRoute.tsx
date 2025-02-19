import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const { id } = useParams(); // الحصول على معرف الكورس من الرابط
  const [isPaid, setIsPaid] = useState(false); // حالة الدفع
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const token = localStorage.getItem('token'); // الحصول على التوكن
        const userId = localStorage.getItem('user_id'); // الحصول على معرف المستخدم

        // جلب بيانات المدفوعات
        const response = await axios.get('http://127.0.0.1:8000/api/payments/all', {
          headers: {
            Authorization: `Bearer ${token}`, // إرسال التوكن
          },
        });

        // التحقق مما إذا كان الطالب قد دفع للكورس
        const hasPaid = response.data.data.some(payment => {
          return (
            payment.account_id === parseInt(userId) && // التحقق من معرف الطالب
            payment.course.toLowerCase() === id.toLowerCase() // التحقق من اسم الكورس
          );
        });

        setIsPaid(hasPaid); // تحديث حالة الدفع
      } catch (error) {
        console.error("Error checking payment status:", error);
        setIsPaid(false); // في حالة حدوث خطأ
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    checkPaymentStatus();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // عرض رسالة تحميل
  }

  if (!isPaid) {
    return <Navigate to="/payment-required" />; // إعادة التوجيه إذا لم يكن الطالب قد دفع
  }

  return <WatchCourse />; // عرض WatchCourse إذا كان الطالب قد دفع
};

export default ProtectedRoute;