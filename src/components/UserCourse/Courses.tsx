import { useEffect, useState } from "react";
import { getAllCoursesProgress } from "../../services/courseProgress";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner/Spinner";

interface CourseProgress {
  total_lessons: number;
  completed_lessons: number;
  overall_progress: number;
}

interface CourseData {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  duration: number;
  level: string;
  cover: string;
  price: number;
  instructor_id: number;
  pivot: any;
}

interface EnrolledCourse {
  course: CourseData;
  progress: CourseProgress;
}

export default function MyCourses() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // دالة مساعدة للتعامل مع النصوص متعددة اللغات
  const getLocalizedText = (textObj: any, fallback: string = ""): string => {
    if (!textObj) return fallback;
    
    // إذا كان النص كائنًا يحتوي على مفاتيح لغات
    if (typeof textObj === 'object' && (textObj.en || textObj.ar)) {
      return textObj[currentLang] || textObj.en || textObj.ar || fallback;
    }
    
    // إذا كان النص نصًا عاديًا
    return String(textObj);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        
        // جلب الكورسات مع بيانات التقدم
        const response = await getAllCoursesProgress();
        console.log("API Response:", response);
        
        if (response && Array.isArray(response)) {
          setCourses(response);
        } else {
          console.error("Unexpected response format:", response);
          setError("Unexpected data format received from server");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getCourses();
  }, []);

  if (loading) {
    return <div className="py-10 p-5 text-center"><Spinner /></div>;
  }

  if (error) {
    return <div className="py-10 p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-10 p-5 border border-violet-400 rounded-b">  
      {courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{t('You have not enrolled in any courses yet')}</p>
          <Link to="/courses" className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700">
            {t('Browse Courses')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((enrolledCourse, index) => {
            const course = enrolledCourse.course;
            const progress = enrolledCourse.progress;
            
            return (
              <div key={index} className="p-5 bg-gray-300/15 rounded-lg flex flex-col">
                {course.cover && (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${course.cover}`} 
                    alt={getLocalizedText(course.title, "Course")} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=Course+Image";
                    }}
                  />
                )}
                
                <div className="flex justify-between items-center mt-4 mb-2">
                  <div className="flex gap-2">
                    <span className="p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">
                      {course.duration} {t('weeks')}
                    </span>
                    <span className="p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-2">{getLocalizedText(course.title, "Course")}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {getLocalizedText(course.description, "")}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-auto">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t('Progress')}</span>
                    <span>{Math.round(progress.overall_progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-violet-600 h-2.5 rounded-full" 
                      style={{ width: `${progress.overall_progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{progress.completed_lessons} / {progress.total_lessons} {t('lessons completed')}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/watch/${course.id}`} 
                  className="mt-4 px-4 py-2 bg-violet-600 text-white text-center rounded-md hover:bg-violet-700 transition-colors"
                >
                  {progress.overall_progress === 100 ? t('Review Course') : t('Continue Learning')}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
