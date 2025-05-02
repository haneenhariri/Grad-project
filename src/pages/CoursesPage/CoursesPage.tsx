import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import filterIcon from "../../assets/Faders.png";
import CourseCard from "../../components/CourseCrad/CourseCard";
import nextIcon from '../../assets/slider/ArrowLeft (1).png';
import prevIcon from '../../assets/slider/ArrowRight (1).png';
import { allCourses } from "../../services/courses";
import Spinner from "../../components/Spinner/Spinner";
import { showToast } from "../../utils/toast";


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
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses();
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
  }, []);

  useEffect(() => {
    let filtered = [...courses];
    if (query.trim()) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
    }
if (selectedCategories.length > 0) {
  filtered = filtered.filter((course) => {
    const courseCategoryId = course.category_id; 
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
        .slice(0, 6);
    } else if (selectedOption === "Most Popular") {
      filtered = [...filtered]
        .sort((a, b) => (b.rating ?? b.Rating ?? 0) - (a.rating ?? a.Rating ?? 0))
        .slice(0, 6);
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

  return (
    <section className="pt-[120px] pb-12 px-4 lg:px-10 desktop:px-40">
      <div className="flex sm:justify-between sm:flex-row flex-col gap-y-3 sm:items-center">
      <button
          className="flex w-max gap-2.5 items-center py-2.5 px-5 border border-violet-950"
          onClick={() => setIsFilterVisible((prev) => !prev)}
        >
          <img src={filterIcon} alt="filter" />
          Filter
        </button>
        <div className="flex items-center gap-2.5">
          <label htmlFor="sort" className="block">
            Sort by:
          </label>
          <select
            id="sort"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="bg-transparent border border-violet-950 py-2.5 px-5"
          >
            <option value="All Courses">All Courses</option>
            <option value="Trending">Trending</option>
            <option value="Most Popular">Most Popular</option>
          </select>
        </div>
      </div>
      {isFilterVisible && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 w-10/12 max-w-md rounded-md">

            <div className="p-2">
            <button
              className=" w-full text-right text-lg font-bold"
              onClick={() => setIsFilterVisible(false)}
            >
              &times;
            </button>
                <h3 className="font-bold">Category</h3>
                {["Web development", "Mobile Development", "AI", "Design", "Programming languages"].map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(setSelectedCategories, category)}
                    />
                    <label className=" text-sm mx-1" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">Rating</h3>
                {[5.000, 4, 3, 2, 1].map((rating) => (
                  <div key={rating}>
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleFilter(setSelectedRatings, rating)}
                    />
                    <label className=" text-sm mx-1" htmlFor={`rating-${rating}`}>
                      {rating} Star & up
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">Course Level</h3>
                {["Beginner", "Intermediate", "Expert"].map((level) => (
                  <div key={level}>
                    <input
                      type="checkbox"
                      id={level}
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleFilter(setSelectedLevels, level)}
                    />
                    <label className=" text-sm mx-1" htmlFor={level}>
                      {level}
                    </label>
                  </div>
                ))}
              </div>
          </div>
        </div>
      )}
      <div className="lg:flex hidden flex-wrap items-center gap-2.5 pt-6 pb-4 border-b border-violet-950">
        <h3>Suggestion:</h3>
        <button className="text-violet-800">user interface</button>
        <button className="text-violet-800">user experience</button>
        <button className="text-violet-800">web design</button>
        <button className="text-violet-800">interface</button>
        <button className="text-violet-800">app</button>
      </div>
      {loading && (
        <Spinner/>      )}
      {!loading  && (
        <div className="flex gap-6 mt-10">
         {!isMobile && isFilterVisible && (
            <div className="h-max bg-white md:w-4/12 w-1/2 border border-violet-950">
              <div className="p-2">
                <h3 className="font-bold">Category</h3>
                {["Web development", "Mobile Development", "AI", "Design", "Programming languages"].map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(setSelectedCategories, category)}
                    />
                    <label className=" text-sm mx-1" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">Rating</h3>
                {[5.000, 4, 3, 2, 1].map((rating) => (
                  <div key={rating}>
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleFilter(setSelectedRatings, rating)}
                    />
                    <label className=" text-sm mx-1" htmlFor={`rating-${rating}`}>
                      {rating} Star & up
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">Course Level</h3>
                {["Beginner", "Intermediate", "Expert"].map((level) => (
                  <div key={level}>
                    <input
                      type="checkbox"
                      id={level}
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleFilter(setSelectedLevels, level)}
                    />
                    <label className=" text-sm mx-1" htmlFor={level}>
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            className={`grid gap-6 ${
              isFilterVisible
                ? "lg:grid-cols-3 md:grid-cols-2"
                : "grid-cols-1 lg:grid-cols-4 sm:grid-cols-2"
            } w-full`}
          >
            {currentItems?.map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                cover={course.cover} 
                duration={course.duration}
                level={course.level}
                instructor={course.instructor}
                title={course.title}
                rating={course.rate}
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
