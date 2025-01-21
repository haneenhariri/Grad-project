import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import filter from "../../assets/Faders.png";
import CourseCard from "../../components/CourseCrad/CourseCard";
import { courseData } from "../../data/Courses";

export default function CoursesPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";

  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const [results, setResults] = useState(courseData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isFilterVisible ? 2 : 6;

  useEffect(() => {
    console.log('Query:', query);
    let filtered = courseData;

    if (query.trim()) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.Category)
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((course) =>
        selectedRatings.some((rating) => course.Rating >= rating)
      );
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) =>
        selectedLevels.includes(course.level)
      );
    }

    if (selectedOption === "Trending") {
      filtered = filtered.slice(0, 6);
    } else if (selectedOption === "Most Popular") {
      filtered = [...filtered]
        .sort((a, b) => (b.stdNum ?? 0) - (a.stdNum ?? 0))
        .slice(0, 6);
    }

    setResults(filtered);
  }, [query, selectedCategories, selectedRatings, selectedLevels, selectedOption]);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the current items based on the page
  const currentItems = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const toggleFilter = <T extends string | number>(
    setFilter: React.Dispatch<React.SetStateAction<T[]>>, 
    value: T
  ) => {
    setFilter((prev: T[]) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <section className="pt-7.5 pb-12 px-4 lg:px-20 desktop:px-40">
      <div className="flex justify-between items-center">
        <button
          className="flex gap-2.5 items-center py-2.5 px-5 border border-violet-950"
          onClick={() => setIsFilterVisible((prev) => !prev)}
        >
          <img src={filter} alt="filter" />
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

      {/* Suggestion */}
      <div className="flex items-center gap-2.5 pt-6 pb-4 border-b border-violet-950">
        <h3>Suggestion:</h3>
        <button className="text-violet-800">user interface</button>
        <button className="text-violet-800">user experience</button>
        <button className="text-violet-800">web design</button>
        <button className="text-violet-800">interface</button>
        <button className="text-violet-800">app</button>
      </div>

      {/* Main Section */}
      <div className="flex gap-6 mt-10">
        {isFilterVisible && (
          <div className="h-max bg-white w-3/12 border border-violet-950">
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
                  <label className=" text-sm mx-1" htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
            <div className="p-2">
              <h3 className="font-bold">Rating</h3>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating}>
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onChange={() => toggleFilter(setSelectedRatings, rating)}
                  />
                  <label className=" text-sm mx-1"  htmlFor={`rating-${rating}`}>{rating} Star & up</label>
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
                  <label className=" text-sm mx-1"  htmlFor={level}>{level}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`grid gap-6 ${isFilterVisible ? "grid-cols-2 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"} w-full`}
        >
          {currentItems.map((course, index) => (
            <CourseCard
              id={course.id}
              key={index}
              img={course.img}
              weeks={course.weeks}
              level={course.level}
              instructor={course.instructor}
              title={course.title}
              des={course.des}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border border-violet-950"
          >
            Previous
          </button>
        )}
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border border-violet-950"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}
