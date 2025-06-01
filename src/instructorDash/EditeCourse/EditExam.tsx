import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuizQuestion } from "../AddExam/CreateExam";
import axiosInstance from "../../services/axiosInstance";
import { showToast } from "../../utils/toast";
import Editor from "@monaco-editor/react";

interface EditExamProps {
  courseId: number;
}

export default function EditExam({ courseId }: EditExamProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
const handleSingleQuestionSubmit = async (index: number) => {
  const question = questions[index];

  // Basic validation
  if (!question.question || !question.mark || !question.type) {
    showToast(t('Please complete all required fields'), 'error');
    return;
  }

  if (question.type === 'multipleChoice') {
    if (!question.options || question.options.length < 2 || !question.correct_answer) {
      showToast(t('Multiple choice questions must have at least 2 options and a correct answer'), 'error');
      return;
    }
  }

  setIsSubmitting(true);
  try {
    if (question.id) {
      await axiosInstance.post(`/questions/${question.id}?_method=PUT`, question);
    } else {
      await axiosInstance.post('/questions', { ...question, course_id: courseId });
    }

    showToast(t('Question updated successfully'), 'success');
  } catch (error) {
    console.error('Error updating question:', error);
    showToast(t('Failed to update the question'), 'error');
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/exam/${courseId}`);
        const fetchedQuestions = response.data.data.map((q: any) => ({
          id: q.id,
          course_id: q.course_id,
          question: q.question,
          options: q.type === 'multipleChoice' ? q.options : [],
          correct_answer: q.correct_answer,
          mark: q.mark,
          type: q.type,
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Failed to fetch quiz questions:', error);
        showToast(t('Failed to fetch quiz questions'), 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [courseId, t]);

  const validateQuestions = () => {
    for (const q of questions) {
      if (!q.question || !q.mark || !q.type) {
        showToast(t('Please complete all required fields'), 'error');
        return false;
      }
      if (q.type === 'multipleChoice') {
        if (!q.options || q.options.length < 2 || !q.correct_answer) {
          showToast(t('Multiple choice questions must have at least 2 options and a correct answer'), 'error');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateQuestions()) return;

    setIsSubmitting(true);

    try {
      for (const question of questions) {
        if (question.id) {
          await axiosInstance.post(`/questions/${question.id}?_method=PUT`, question);
        } else {
          await axiosInstance.post('/questions', { ...question, course_id: courseId });
        }
      }

      showToast(t('Exam questions updated successfully'), 'success');
    } catch (error) {
      console.error('Error updating questions:', error);
      showToast(t('Failed to update exam questions'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionChange = (index: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    if (updated[questionIndex].options) {
      updated[questionIndex].options![optionIndex] = value;
      setQuestions(updated);
    }
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    if (!updated[questionIndex].options) {
      updated[questionIndex].options = [];
    }
    updated[questionIndex].options!.push("");
    setQuestions(updated);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    if (updated[questionIndex].options) {
      updated[questionIndex].options!.splice(optionIndex, 1);
      setQuestions(updated);
    }
  };

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        question: "",
        options: [],
        correct_answer: "",
        mark: 1,
        type: "multipleChoice",
        course_id: courseId,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleTypeChange = (index: number, newType: string) => {
    const updated = [...questions];
    updated[index].type = newType;
    updated[index].options = newType === "multipleChoice" ? ["", ""] : null;
    updated[index].correct_answer = "";
    setQuestions(updated);
  };

  if (isLoading) return <p>{t('Loading...')}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                        <div key={questionIndex} className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-violet-950">
                  {t('Question')} {questionIndex + 1}
                </h2>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  {t('Remove Question')}
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  {t('Question Type')}
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-violet-600"
                      checked={question.type === "multipleChoice"}
                      onChange={() => handleTypeChange(questionIndex, "multipleChoice")}
                    />
                    <span className="ml-2">{t('Multiple Choice')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-violet-600"
                      checked={question.type === "code"}
                      onChange={() => handleTypeChange(questionIndex, "code")}
                    />
                    <span className="ml-2">{t('Code Question')}</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  {t('Question Text')}
                </label>
                <textarea
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-violet-500 focus:border-violet-500"
                  rows={3}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  {t('Points')}
                </label>
                <input
                  type="number"
                  value={question.mark}
                  onChange={(e) => handleQuestionChange(questionIndex, "mark", Number(e.target.value))}
                  className="w-full p-3 border rounded-md focus:ring-violet-500 focus:border-violet-500"
                  min="1"
                  required
                />
              </div>
              
              {question.type === "multipleChoice" && (
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    {t('Options')}
                  </label>
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`correct_${questionIndex}`}
                        checked={question.correct_answer === option}
                        onChange={() => handleQuestionChange(questionIndex, "correct_answer", option)}
                        className="mr-2 text-violet-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:ring-violet-500 focus:border-violet-500"
                        placeholder={`${t('Option')} ${optionIndex + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        {t('Remove')}
                      </button>
                      
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                    className="mt-2 text-violet-600 hover:text-violet-800"
                  >
                    {t('Add Option')}
                  </button>
                  <button
  type="button"
  onClick={() => handleSingleQuestionSubmit(questionIndex)}
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  {t('Save This Question')}
</button>
                </div>
              )}
              
              {question.type === "code" && (
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    {t('Preview Code Editor')}
                  </label>
                  <div className="h-[200px] border rounded-md overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      value="// Students will write their code here"
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {t('Students will use this editor to write their code answers')}
                  </p>
                  <button
  type="button"
  onClick={() => handleSingleQuestionSubmit(questionIndex)}
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  {t('Save This Question')}
</button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between mb-8">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-violet-100 text-violet-700 px-4 py-2 rounded-md hover:bg-violet-200"
          >
            {t('Add Another Question')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? t("Saving...") : t("Save Changes")}
          </button>
        </div>
      </form>
    </div>
  );
}
