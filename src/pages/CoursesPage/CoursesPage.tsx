import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "../../components/CourseCrad/CourseCard";
import nextIcon from '../../assets/slider/ArrowLeft (1).png';
import prevIcon from '../../assets/slider/ArrowRight (1).png';
import { allCourses } from "../../services/courses";
import Spinner from "../../components/Spinner/Spinner";
import { showToast } from "../../utils/toast";
import Suggestion from "../../components/Suggestion/Suggestion";
import FilterButton from "./FilterButton";
import Sort from "./Sort";
import { useTranslation } from "react-i18next";
import FilterPopupMobile from "./FilterPopupMobile";
import FilterSide from "./FilterSide";


export default function CoursesPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isFilterVisible ? 8 : 8;
  const {t} = useTranslation();
  const lang = localStorage.getItem('language') as 'ar' | 'en' || 'en';
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses(lang);
        setCourses(data);
        setResults(data);  
      } catch (error: any) {
        console.error("Error fetching courses:", error.message);
        showToast(` Error fetching courses:", ${error.message}`, 'error')
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lang]);

  useEffect(() => {
    let filtered = [...courses];
    if (query.trim()) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
    }
if (selectedCategories.length > 0) {
  filtered = filtered.filter((course) => {
    const courseCategoryId = course.sub_category?.main_category?.id; 
    return selectedCategories.includes(String(courseCategoryId)); 
  });
}

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((course) => {
        const courseRating = parseFloat(course.rating ?? course.Rating ?? "0");     
        return selectedRatings.some((rating) => courseRating >= rating);
      });
    }
    
    
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) =>
        selectedLevels.some(level => course.level?.toLowerCase() === level.toLowerCase())
      );
    }


    if (selectedOption === "Trending") {
      filtered = [...filtered]
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0)) 
        .slice(0, 2);
    } else if (selectedOption === "Most Popular") {
      filtered = [...filtered]
        .sort((a, b) => (b.rating ?? b.Rating ?? 0) - (a.rating ?? a.Rating ?? 0))
        .slice(0, 8);
    }
    
    setResults(filtered);
    setCurrentPage(1); 
  }, [
    query,
    selectedCategories,
    selectedRatings,
    selectedLevels,
    selectedOption,
    courses,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const toggleFilter = <T extends string | number>(
    setFilter: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setFilter((prev: T[]) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const handelSort = (e : any) => 
  {
    setSelectedOption(e.target.value)
  }
  return (
    <section className="pt-[140px] pb-12 px-4 lg:px-10 desktop:px-40">
      <div className="flex sm:justify-between sm:flex-row flex-col gap-y-3 sm:items-center">
        <FilterButton onClick={() => setIsFilterVisible((prev) => !prev)}/>
        <Sort selectedOption={selectedOption} onClick={handelSort} />
      </div>
      {isFilterVisible && isMobile && (
       <FilterPopupMobile setSelectedRatings={setSelectedRatings}   selectedRatings={selectedRatings} setSelectedCategories={setSelectedCategories} toggleFilter={toggleFilter} selectedCategories={selectedCategories}  setIsFilterVisible={setIsFilterVisible} selectedLevels={selectedLevels}  setSelectedLevels={setSelectedLevels} selectedCategories={selectedCategories}/>
      )}
      <Suggestion/>
      {loading && (
        <Spinner/>      )}
      {!loading  && (
        <div className="flex gap-6 mt-10">
          {/* filter side */}
         {!isMobile && isFilterVisible && (
            <FilterSide setSelectedRatings={setSelectedRatings}   selectedRatings={selectedRatings} setSelectedCategories={setSelectedCategories} toggleFilter={toggleFilter} selectedCategories={selectedCategories}  setIsFilterVisible={setIsFilterVisible} selectedLevels={selectedLevels}  setSelectedLevels={setSelectedLevels} selectedCategories={selectedCategories}/>
          )}
          {/* courses */}
          <div className={`grid gap-6 ${isFilterVisible ? "lg:grid-cols-3 md:grid-cols-2" : "grid-cols-1 lg:grid-cols-4 sm:grid-cols-2" } w-full`}>
            {currentItems?.map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                cover={course.cover} 
                duration={course.duration}
                level={course.level}
                instructor={course.instructor}
                title={course.title}
                rating={course.rating}
                price={course.price}
                mainCategoryName={course?.sub_category.main_category?.name}
              />
            ))}
          </div>
        </div>
      )}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border border-violet-950"
            >
              <img src={nextIcon} alt="prev" />
            </button>
          )}
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 border border-violet-950"
            >
              <img src={prevIcon} alt="next" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
