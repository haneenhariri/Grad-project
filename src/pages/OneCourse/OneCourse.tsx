import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourse } from '../../services/courses';
// استيراد باقي الصور والايقونات حسب الحاجة

export default function OneCourse() {
  // استخرج الـ id من الـ URL
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // استخدم حالة لتخزين بيانات الكورس؛ نبدأ بالقيمة null بدلاً من مصفوفة
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // على سبيل المثال (لحالة الشراء)
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(150);
  const coursePrice = 100;
  const [message, setMessage] = useState("");

  // دالة استدعاء بيانات الكورس
  useEffect(() => {
    const getCourseData = async () => {
      try {
        if (!courseId) {
          setError("No course ID provided");
          return;
        }
        // تحويل الـ courseId إلى رقم إذا كانت الدالة تقبل رقمًا
        const courseIdNumber = Number(courseId);
        const data = await fetchCourse(courseIdNumber);
        setCourse(data);
      } catch (err: any) {
        setError("Error fetching course details");
        console.error("Error fetching course:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getCourseData();
  }, [courseId]);

  // يمكن عرض رسالة تحميل أو خطأ في حال لم يتم جلب البيانات
  if (loading) {
    return <div className="p-10 text-center">Loading course details...</div>;
  }
  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }
  if (!course) {
    return <div className="p-10 text-center">No course data available.</div>;
  }

  // بقية الكود الخاص بعرض تفاصيل الكورس والتعامل مع الشراء
  return (
    <section className="px-4 py-20 lg:px-20 desktop:px-40 gap-6 flex">
      <div className="w-10/12">
        {/* مثال لعرض عنوان الكورس */}
        <h2 className="text-4xl font-semibold">{course.title}</h2>
        <p className="my-6 text-gray-800">{course.description}</p>

        {/* عرض صورة الكورس، مع مراعاة أن خاصية الصورة قد تكون مثلاً cover أو img */}
        <img
          src={`http://127.0.0.1:8000/storage/${course.img || course.cover}`}
          alt="Course"
          className="mb-10"
        />

        {/* باقي تفاصيل الكورس مثل الوصف، المنهج، ومتطلبات الكورس */}
        {/* ... */}
      </div>

      {/* قسم السعر وعمليات الشراء */}
      <div className="shadow-md w-1/3 bg-white h-max">
        {/* عرض السعر والتفاصيل الأخرى */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-semibold">${course.price || "14.00"}</p>
            <p className="py-1.5 px-3 bg-violet-200 text-xs text-violet-600">
              {course.discount || "56% off"}
            </p>
          </div>
          {/* باقي تفاصيل السعر */}
        </div>
        <div className="p-6 border-b">
          <button onClick={() => setIsOpen(true)} className="w-full p-3 bg-violet-950 text-white">
            Buy now
          </button>
        </div>
        {/* عرض المودال عند الضغط على شراء */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-1/2 h-1/2 p-6 flex flex-col justify-evenly rounded-lg shadow-lg">
              <p className="text-3xl font-bold text-center mb-10">{message}</p>
              <div className="flex justify-center items-stretch gap-4 mt-4">
                {message === "Do you want to purchase this course?" ? (
                  <>
                    <button onClick={() => {
                      if (balance >= coursePrice) {
                        setBalance(balance - coursePrice);
                        setMessage("Payment successful! Do you want to view the course or go to the dashboard?");
                      } else {
                        setMessage("Insufficient balance!");
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      YES
                    </button>
                    <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                      Cancel
                    </button>
                  </>
                ) : message === "Payment successful! Do you want to view the course or go to the dashboard?" ? (
                  <>
                    <button onClick={() => navigate(`/watch/${courseId}`)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View Course
                    </button>
                    <button onClick={() => navigate('/User')} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      Dashboard
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
