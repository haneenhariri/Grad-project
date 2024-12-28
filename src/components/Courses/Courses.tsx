import { useNavigate } from "react-router-dom";
import { courseData } from "../../data/Courses";
import CourseCard from "../CourseCrad/CourseCard";
import Title from "../Title/Title";

export default function Courses() {
  const navigate = useNavigate();
  const handleViewAllCourses = () => {
      navigate("/courses");
  }
  return (
    <section className=" mb-20">
      <Title title="CourseTitle" p="CourseP" btn="VisitCourses" onClick={handleViewAllCourses}/>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {courseData.slice(0,6).map((e, i) => (
          <CourseCard
            id={e.id}
            key={i}
            img={e.img}
            weeks={e.weeks}
            level={e.level}
            instructor={e.instructor}
            title={e.title}
            des={e.des}
          />
        ))}
      </div>
    </section>
  );
}
