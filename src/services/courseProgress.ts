import axiosInstance from "./axiosInstance";

// دالة للحصول على الكورسات المسجل فيها الطالب مع التقدم
export const getAllCoursesProgress = async () => {
  try {
    const response = await axiosInstance.get('/student-progress/all-courses');
    console.log("All courses progress response:", response.data);
    
    if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching all courses progress:", error);
    throw error;
  }
};

// دالة للحصول على تقدم كورس محدد - تم تصحيح المسار بناءً على توثيق API
export const getCourseProgress = async (courseId: number) => {
  try {
    const courseIdNum = Number(courseId);
    console.log(`Fetching progress for course ID: ${courseIdNum}`);
    
    // استخدام المسار الصحيح من توثيق API
    const response = await axiosInstance.get(`/student-progress/course/${courseIdNum}`);
    console.log(`Course progress response:`, response.data);
    
    if (response.data && response.data.status === "success") {
      return response.data.data || { lessons_progress: [] };
    }
    
    return { lessons_progress: [] };
  } catch (error) {
    console.error(`Error fetching course progress:`, error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
    }
    return { lessons_progress: [] };
  }
};

// دالة لتحديث تقدم درس معين
export const updateLessonProgress = async (courseId: number, lessonId: number, completed: boolean) => {
  try {
    // تأكد من أن المعرفات أرقام
    const courseIdNum = Number(courseId);
    const lessonIdNum = Number(lessonId);
    
    console.log(`Sending progress update - Course ID: ${courseIdNum}, Lesson ID: ${lessonIdNum}, Completed: ${completed}`);
    
    // استخدام المسار الصحيح
    const response = await axiosInstance.post(`/student-progress/update`, {
      course_id: courseIdNum,
      lesson_id: lessonIdNum,
      completed
    });
    
    console.log(`Lesson progress update response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating lesson progress:`, error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
    }
    throw error;
  }
};




