import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCourses } from '../../redux/coursesSlice/coursesSlice';
import Spinner from '../Spinner/Spinner';
import CourseCard from '../CourseCrad/CourseCard';

export default function CoursesList() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state: RootState) => state.courses);
  const lang = useSelector((state: RootState) => state.language.lang);
  
  useEffect(() => {
    dispatch(fetchCourses(lang));
  }, [dispatch, lang]);
  
  if (loading) return <Spinner />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}