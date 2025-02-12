import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import CourseCard from "../CourseCrad/CourseCard";
import Title from "../Title/Title";
import { allCourses } from "../../services/courses"; // استدعاء API
import Spinner from "../Spinner/Spinner";
import { Course } from "../../types/interfaces";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses();  
        setCourses(data); 
      } catch (err : any) {
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
    <section className="sm:mb-20 mb-10">
      <Title title="CourseTitle" p="CourseP" btn="VisitCourses" onClick={handleViewAllCourses} />
      {loading && <Spinner/>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses?.slice(0, 6).map((course, i) => (
            <CourseCard
              key={i}
              id={course.id}
              cover={course.cover}
              duration={course.duration}
              level={course.level}
              instructor={course.instructor}
              title={course.title}
              description={course.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
