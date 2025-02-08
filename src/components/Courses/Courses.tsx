import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../CourseCrad/CourseCard";
import Title from "../Title/Title";
import { allCourses } from "../../services/courses"; // استدعاء API
interface Course {
  id: number ;
  cover: string;
  duration: string;
  level: string;
  instructor: string;
  title: string;
  description: string;
}

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const location = useLocation();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses();  
        setCourses(data); 
      } catch (err: any) {
        setError("حدث خطأ أثناء تحميل البيانات!");  
        console.error("Error fetching courses:", err.message);     
      } finally {
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  const handleViewAllCourses = () => {
    navigate("/courses");
  };
  return (
    <section className="mb-20">
      <Title title="CourseTitle" p="CourseP" btn="VisitCourses" onClick={handleViewAllCourses} />
      {loading && <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses?.slice(0, 6).map((course, i) => (
            <CourseCard
              key={i}
              id={course.id}
              img={course.cover}
              weeks={course.duration}
              level={course.level}
              instructor={course.instructor}
              title={course.title}
              des={course.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
