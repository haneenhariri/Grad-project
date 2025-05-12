import axiosInstance from "./axiosInstance";

// إذا كان هذا الملف موجود بالفعل، يمكننا إضافة تصدير للدالة هنا<|im_start|>
// لضمان التوافق مع الكود القديم

export const updateLessonProgress = async (courseId: number, lessonId: number, completed: boolean) => {
  try {
    const response = await axiosInstance.post(`/student-progress/update`, {
      course_id: courseId,
      lesson_id: lessonId,
      completed
    });
    
    console.log(`Lesson ${lessonId} progress update response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating lesson ${lessonId} progress:`, error);
    throw error;
  }
};

export const getCourseProgress = async (courseId: number) => {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/progress`);
    console.log(`Course ${courseId} progress response:`, response.data);
    
    if (response.data && response.data.status === "success") {
      return response.data.data || null;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching course ${courseId} progress:`, error);
    return null;
  }
};


