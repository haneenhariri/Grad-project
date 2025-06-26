import axiosInstance from "./axiosInstance";

export const checkTestCompletion = async (courseId: number) => {
  const response = await axiosInstance.get(
    `/courses/${courseId}/check-test-completion`
  );
  return response;
};

export const submitQuizAnswer = async (data: {
  answer: string;
  question_id: number;
}) => {
  const response = await axiosInstance.post(`/user-answers`, data);
  return response;
};