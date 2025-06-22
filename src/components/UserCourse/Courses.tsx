import { useEffect, useState } from "react";
import { getAllCoursesProgress } from "../../services/courseProgress";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner/Spinner";
import UserCourseCard from "./UserCourseCard";
import { EnrolledCourse, LocalizedText } from "../../types/interfaces";
import Sort from "../../pages/CoursesPage/Sort";

export default function MyCourses() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getLocalizedText = (textObj: LocalizedText | string | undefined, fallback: string = ""): string => {
    if (!textObj) return fallback;
    
    if (typeof textObj === 'object' && (textObj.en || textObj.ar)) {
      return textObj[currentLang] || textObj.en || textObj.ar || fallback;
    }
    
    return String(textObj);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        
        const response = await getAllCoursesProgress();
        console.log("API Response:", response);
        
        if (response && Array.isArray(response)) {
          setCourses(response);
          setFilteredCourses(response);
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

  useEffect(() => {
    // Apply search filter and sorting
    let result = [...courses];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(item => 
        getLocalizedText(item.course.title, "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (selectedOption === "Most Popular") {
      result.sort((a, b) => (b.course.rating || 0) - (a.course.rating || 0));
    } else if (selectedOption === "Trending") {
      // Sort by newest courses (assuming there's a created_at field)
      result.sort((a, b) => {
        const dateA = a.course.created_at ? new Date(a.course.created_at).getTime() : 0;
        const dateB = b.course.created_at ? new Date(b.course.created_at).getTime() : 0;
        return dateB - dateA;
      });
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, selectedOption]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  if (loading) {
    return <div className="py-10 p-5 text-center"><Spinner /></div>;
  }

  if (error) {
    return <div className="py-10 p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="">  
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t("Courses")} ({courses.length})</h2>
        <div className="flex flex-col-reverse sm:flex-row items-start justify-between mb-10">
          <Sort selectedOption={selectedOption} onClick={handleSort} />
          <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder={t('Search in your courses...')}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {filteredCourses.length === 0 ? (
        <div className="text-center py-10">
          {courses.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">{t('You have not enrolled in any courses yet')}</p>
              <Link to="/courses" className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700">
                {t('Browse Courses')}
              </Link>
            </>
          ) : (
            <p className="text-gray-500">{t('No courses match your search')}</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((enrolledCourse, index) => {
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
      )}
    </div>
  );
}
