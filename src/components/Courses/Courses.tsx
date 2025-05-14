import { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import CourseCard from "../CourseCrad/CourseCard";
import { allCourses } from "../../services/courses"; 
import Spinner from "../Spinner/Spinner";
import { CourseTypeProps } from "../../types/interfaces";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import arrow from '../../assets/ArrowRight (3).png'
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export default function Courses() {
    const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const [courses, setCourses] = useState<CourseTypeProps[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [intervalValue ] = useState(0.5);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses(lang);  // تمرير اللغة هنا
        setCourses(data); 
      } catch (err: unknown) {
        setError("حدث خطأ أثناء تحميل البيانات!");  
        if (err instanceof AxiosError) {
          throw err.response?.data || { message: "Error fetching courses:" };
        }
      } finally {
        setLoading(false); 
      }
    };
    const timerId = setTimeout(() => {
      fetchCourses();
    }, intervalValue * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [lang]);

  return (
    <section className="sm:mb-20  mb-10">
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
      <div className=" flex lg:mt-32 mt-10 justify-center items-center gap-2">
        <p>{t("CoursesSection.more")}</p>
        <NavLink to={'/courses'} className='flex justify-center  items-center gap-2'>        
        <p className=" text-violet-700">{t("CoursesSection.Browse")}</p>
        <img src={arrow} className=" rtl:rotate-180" alt="arrow right" />
        </NavLink>
      </div>
    </section>
  );
}
 