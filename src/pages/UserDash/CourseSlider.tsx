import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import UserCourseCard from "../../components/UserCourse/UserCourseCard";
import { EnrolledCourse, LocalizedText } from "../../types/interfaces";
import { getAllCoursesProgress } from "../../services/courseProgress";
import { Link } from "react-router-dom";

// Define a type for localized text objects


export default function CourseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [incompleteCourses, setIncompleteCourses] = useState<EnrolledCourse[]>([]);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'en'; 
  
  const getLocalizedText = (textObj: LocalizedText | string | undefined, fallback: string = ""): string => {
    if (!textObj) return fallback;
    
    if (typeof textObj === 'object' && (textObj.en || textObj.ar)) {
      return textObj[currentLang] || textObj.en || textObj.ar || fallback;
    }
    
    return String(textObj);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCoursesProgress();
        setCourses(data);
        console.log(courses);
        // Filter courses to show only incomplete ones (less than 100% progress)
        const incomplete = data.filter((course: EnrolledCourse) => 
          course.progress && course.progress.overall_progress < 100
        );
        setIncompleteCourses(incomplete);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, incompleteCourses.length - 4)); 
    }
  };
  
  const handleNext = () => {
    if (currentIndex < incompleteCourses.length - 4) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); 
    }
  };
  
  return (
    <div>
      {incompleteCourses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{t('You have completed all your courses')}</p>
          <Link to="/courses" className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700">
            {t('Browse Courses')}
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">{t("Let's start learning")}</h2>
            <div className="flex rtl:flex-row-reverse gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 bg-[#f1cff594] hover:bg-[#f2b3fa94] transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 bg-[#f1cff594] hover:bg-[#f2b3fa94] transition-colors"
              >
                <FaArrowRight className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {incompleteCourses.slice(currentIndex, currentIndex + 4).map((enrolledCourse, index) => {
              const course = enrolledCourse.course;
              const progress = enrolledCourse.progress;
              return (
                <UserCourseCard
                  key={index}
                  cover={course.cover}
                  title={getLocalizedText(course.title, "Course")}
                  overall_progress={progress.overall_progress}
                  completed_lessons={progress.completed_lessons}
                  total_lessons={progress.total_lessons}
                  id={course.id}
                />
              );
            })}
          </div>
        </>
      )}
    </div>  
  )
}
