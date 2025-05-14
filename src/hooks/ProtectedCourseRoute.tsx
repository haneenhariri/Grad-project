import { useEffect, useState } from 'react';
import { useParams, Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getSecureCookie } from '../utils/cookiesHelper';
import { imgProfile } from '../services/profileStd';

const ProtectedCourseRoute = () => {
  const { id } = useParams(); // الحصول على معرف الكورس من الرابط
  const [isPaid, setIsPaid] = useState<boolean | null>(null); // حالة الدفع
  const [loading, setLoading] = useState(true); // حالة التحميل
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = getSecureCookie('token');

  useEffect(() => {
    // التحقق من حالة الدفع فقط إذا كان المستخدم مسجل دخول
    if (isAuthenticated && token && id) {
      const checkCourseAccess = async () => {
        try {
          // استخدام imgProfile للحصول على قائمة الكورسات المشترك بها
          const response = await imgProfile();
          
          if (response.data && response.data.courses && Array.isArray(response.data.courses)) {
            // التحقق مما إذا كان الكورس موجودًا في قائمة الكورسات المشترك بها
            const isEnrolled = response.data.courses.some(
              (course: any) => course.id === Number(id)
            );
            
            setIsPaid(isEnrolled);
          } else {
            setIsPaid(false);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error checking course access:', error);
          setIsPaid(false);
          setLoading(false);
        }
      };
      
      checkCourseAccess();
    } else {
      // إذا لم يكن المستخدم مسجل دخول، فلا يمكنه الوصول
      setIsPaid(false);
      setLoading(false);
    }
  }, [id, isAuthenticated, token]);

  if (loading) {
    return <Spinner />; // عرض مؤشر التحميل
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: `/watch/${id}` }} />; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }

  if (!isPaid) {
    return <Navigate to={`/oneCourse/${id}`} />; // إعادة التوجيه إلى صفحة الكورس إذا لم يكن قد دفع
  }

  return <Outlet />; // عرض المحتوى المحمي إذا كان الطالب قد دفع
};

export default ProtectedCourseRoute;
