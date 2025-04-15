import { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import CourseCard from "../CourseCrad/CourseCard";
import { allCourses } from "../../services/courses"; 
import Spinner from "../Spinner/Spinner";
import { CourseTypeProps } from "../../types/interfaces";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import arrow from '../../assets/ArrowRight (3).png'
export default function Courses() {
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
      <div className=" flex justify-center items-center gap-2">
        <p>We have more Courses.</p>
        <NavLink to={'/courses'} className='flex justify-center items-center gap-2'>        
        <p className=" text-violet-700">Browse All</p>
        <img src={arrow} alt="arrow right" />
        </NavLink>

      </div>
    </section>
  );
}
