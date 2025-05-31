import { useEffect, useState } from "react";
import { Lesson } from "../../types/interfaces";
import axiosInstance from "../../services/axiosInstance";

export default function EditLesson({course_id} : {course_id : number}) {
  const [lessons, setLessons] = useState<Lesson[]>([]); 
  useEffect(() => {
    const fetchCourse = async () => 
    {
      const response = await axiosInstance.get(`/lessons/${course_id}?lang=ar&all_translations=1`);
      setLessons(response.data);
    }
  }, [course_id])
  
  return (
    <form  className='p-5'>
      <div className='flex flex-col gap-5'>

      </div>
      
    </form>
  )
}
