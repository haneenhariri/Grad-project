import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import CourseCard from "../CourseCrad/CourseCard";
import { allCourses } from "../../services/courses"; // استدعاء API
import Spinner from "../Spinner/Spinner";
import { Course, CourseTypeProps } from "../../types/interfaces";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseTypeProps[]>([]); 
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
      <div className="flex justify-center">
        <SectionsTitle title="CoursesSection.title"/>
      </div>
      {loading && <Spinner/>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1  md:grid-cols-4 grid-rows-2 h-full gap-6">
        {courses?.slice(0, 8).map((course, i) => (
          <CourseCard
            key={i}
            level={course.level}
            index={i}
            totalCards={8}
            mainCategoryName={course.sub_category.main_category.name}
            id={course.id}
            cover={course.cover}
            rating={course.rating}
            duration={course.duration}
            instructor={course.instructor}
            title={course.title}
            price={course.price}
          />
        ))}
        </div>
      )}
    </section>
  );
}
