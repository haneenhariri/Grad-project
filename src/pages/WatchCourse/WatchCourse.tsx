import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { watchSingleCourse } from "../../services/courses";
import { updateLessonProgress, getCourseProgress } from "../../services/courseProgress"; // تغيير المسار هنا
import Spinner from "../../components/Spinner/Spinner";
import { showToast } from "../../utils/toast";
import Comment from "../../components/Comment/Comment";
import Head from "./Head";

export default function WatchCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [completedPercentage, setCompletedPercentage] = useState(0);
  // إضافة سجل تصحيح الأخطاء للتحقق من قيمة id
  useEffect(() => {
    console.log("Course ID from params:", id);
  }, [id]);
  // دالة لتحميل تقدم الطالب في الكورس
  const loadCourseProgress = async () => {
    try {
      if (!id) return;
      
      const progressData = await getCourseProgress(Number(id));
      console.log("Progress data:", progressData);
      
      // تحديث الدروس المكتملة
      const completedLessonIds = new Set(
        progressData.lessons_progress
          .filter((lessonProgress) => lessonProgress.completed)
          .map((lessonProgress) => lessonProgress.lesson_id)
      );
      
      setCompletedLessons(completedLessonIds);
      
      // تحديث النسبة المئوية الإجمالية للتقدم
      if (progressData.overall_progress && 
          typeof progressData.overall_progress.overall_progress === 'number') {
        setCompletedPercentage(progressData.overall_progress.overall_progress);
      } else if (progressData.overall_progress) {
        setCompletedPercentage(progressData.overall_progress);
      } else {
        // حساب النسبة المئوية يدويًا إذا لم تكن متوفرة
        const totalLessons = course?.lessons?.length || 0;
        const completedCount = completedLessonIds.size;
        
        if (totalLessons > 0) {
          const percentage = (completedCount / totalLessons) * 100;
          setCompletedPercentage(percentage);
        } else {
          setCompletedPercentage(0);
        }
      }
    } catch (error) {
      console.error("Error loading course progress:", error);
      // في حالة الفشل، نستمر بدون بيانات التقدم
      setCompletedPercentage(0);
    }
  };

  // دالة لتحديث تقدم الطالب عند إكمال درس
  const markLessonAsCompleted = async (lessonId: number) => {
    try {
      if (!id) return;
      
      // تحديث واجهة المستخدم أولاً (Optimistic UI Update)
      setCompletedLessons(prev => {
        const newSet = new Set(prev);
        newSet.add(lessonId);
        return newSet;
      });
      
      // طباعة القيم المرسلة للتأكد من صحتها
      const courseIdNum = Number(id);
      const lessonIdNum = Number(lessonId);
      
      // استخدام دالة updateLessonProgress من الخدمة
      await updateLessonProgress(courseIdNum, lessonIdNum, true);
      
      // إعادة تحميل تقدم الطالب للحصول على النسبة المئوية المحدثة
      await loadCourseProgress();
      
      showToast("Lesson marked as completed!", "success");
    } catch (error) {
      // تحسين معالجة الخطأ لعرض المزيد من التفاصيل
      console.error("Full error object:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        showToast(`Error: ${error.response.data.message || "Unknown error"}`, "error");
      } else {
        console.error("Error marking lesson as completed:", error);
        showToast("Error marking lesson as completed", "error");
      }
      
      // إلغاء التحديث في واجهة المستخدم في حالة الفشل
      setCompletedLessons(prev => {
        const newSet = new Set(prev);
        newSet.delete(lessonId);
        return newSet;
      });
    }
  };





  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await watchSingleCourse(Number(id));
        setCourse(data);
        if (data.lessons.length > 0) {
          setSelectedLesson(data.lessons[0]); 
        }
        
        await loadCourseProgress();
      } catch (error) {
        showToast("Error loading course", 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <Spinner />;

  const renderSelectedLesson = () => {
    if (!selectedLesson) return null;
    console.log("Selected lesson:", selectedLesson);
    return (
      <div className=" rounded-lg   overflow-hidden mb-6">
        {selectedLesson.files && selectedLesson.files.length > 0 ? (
          selectedLesson.files.map((file: any, index: number) => {
            console.log("File data:", file);
            return (
              <div key={index} className="mb-4">
                {file.type === 'video' && (
                  <>
                    <video 
                      src={`http://127.0.0.1:8000/storage/${file.path}`} 
                      controls 
                      className="w-full h-auto"
                      onError={(e) => console.error("Video error:", e)}
                      onEnded={() => {
                        if (!completedLessons.has(selectedLesson.id)) {
                          markLessonAsCompleted(selectedLesson.id);
                        }
                      }}
                    />
                  </>
                )}
                {file.type === 'image' && (
                  <>
                    <img 
                      src={`http://127.0.0.1:8000/storage/${file.path}`} 
                      alt={selectedLesson.title} 
                      className="w-full h-auto"
                      onError={(e) => console.error("Image error:", e)}
                    />
                  </>
                )}
                {file.type === 'pdf' && (
                  <div className="p-4 border rounded">
                    <a 
                      href={`http://127.0.0.1:8000/storage/${file.path}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      View PDF Document
                    </a>
                  </div>
                )}
                {!['video', 'image', 'pdf'].includes(file.type) && (
                  <div className="p-4 border rounded">
                    <a 
                      href={`http://127.0.0.1:8000/storage/${file.path}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Download File ({file.origin_name})
                    </a>
                  </div>
                )} 
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">
            No files available for this lesson
          </div>
        )}
        <div className="">
          <h2 className="text-xl font-semibold mb-2">{selectedLesson.title}</h2>
          <h2 className="text-xl font-semibold mb-2">Lectures Description</h2>
          <p  id="Description" className="text-gray-700  mb-4">{selectedLesson.description}</p>
          {!completedLessons.has(selectedLesson.id) && (
            <button 
              onClick={() => markLessonAsCompleted(selectedLesson.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
     <Head title={course?.title}/>
      <div className="px-4 lg:px-10 desktop:px-40 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className='w-full md:w-10/12'>
          {renderSelectedLesson()}
          
          {/* قسم التعليقات */}
          <div id="Comments">
          <Comment lesson_id={selectedLesson?.id || 0} />
          </div>
        </div>
        
        <div className='w-full md:w-5/12'>
          <div className='bg-white rounded-lg shadow-sm p-5'>
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <h2>Course Contents</h2>
                <p className='text-sm text-[#23BD33]'>
                  {isNaN(completedPercentage) ? '0' : Math.round(completedPercentage)}% Completed
                </p>
              </div>
              
              {/* شريط التقدم */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${isNaN(completedPercentage) ? 0 : completedPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* قائمة الدروس */}
            <div className='mt-7'>
              {course?.lessons.map((lesson: any) => (
                <div
                  key={lesson.id}
                  className={`p-4 border rounded-lg mb-2 cursor-pointer ${
                    selectedLesson?.id === lesson.id ? 'bg-violet-50' : 'bg-white'
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className='font-medium'>{lesson.title}</h3>
                      <p className='text-sm text-gray-500'>{lesson.files?.length || 0} files</p>
                    </div>
                    {completedLessons.has(lesson.id) ? (
                      <span className='text-sm text-green-600 flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <span className='text-sm text-gray-400'>Not completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}
