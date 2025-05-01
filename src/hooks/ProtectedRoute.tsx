import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import WatchCourse from '../pages/WatchCourse/WatchCourse';

const ProtectedRoute = () => {
  const { id } = useParams(); // الحصول على معرف الكورس من الرابط
  const [isPaid, setIsPaid] = useState(false); // حالة الدفع
  const [loading, setLoading] = useState(true); // حالة التحميل


  if (loading) {
    return <p>Loading...</p>; // عرض رسالة تحميل
  } 

  if (!isPaid) {
    return <Navigate to="/payment-required" />; // إعادة التوجيه إذا لم يكن    قد دفع
  }

  return <WatchCourse/>; // عرض WatchCourse إذا كان الطالب قد دفع
};

export default ProtectedRoute; 