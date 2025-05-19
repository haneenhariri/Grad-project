import { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { showToast } from '../../utils/toast';
import Button from '../../Ui/Button/Button';
import { useTranslation } from 'react-i18next';
import Editor from "@monaco-editor/react";

interface CreateExamProps {
  courseId: number;
}

interface QuizQuestion {
  course_id: number;
  question: string;
  options: string[] | null;
  correct_answer: string | null;
  mark: number;
  type: "multipleChoice" | "code";
}

export default function CreateExam({ courseId }: CreateExamProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      course_id: courseId,
      question: "",
      options: ["", "", ""],
      correct_answer: "",
      mark: 10,
      type: "multipleChoice"
    }
  ]);

  const handleQuestionChange = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = ["", "", ""];
    }
    updatedQuestions[questionIndex].options![optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        course_id: courseId,
        question: "",
        options: ["", "", ""],
        correct_answer: "",
        mark: 10,
        type: "multipleChoice"
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    } else {
      showToast(t('You must have at least one question'), 'error');
    }
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = [];
    }
    updatedQuestions[questionIndex].options!.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options!.length > 2) {
      updatedQuestions[questionIndex].options!.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    } else {
      showToast(t('You must have at least 2 options'), 'error');
    }
  };

  const handleTypeChange = (questionIndex: number, type: "multipleChoice" | "code") => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].type = type;
    
    // Reset options and correct_answer if changing to code type
    if (type === "code") {
      updatedQuestions[questionIndex].options = null;
      updatedQuestions[questionIndex].correct_answer = null;
    } else {
      updatedQuestions[questionIndex].options = ["", "", ""];
      updatedQuestions[questionIndex].correct_answer = "";
    }
    
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    for (const [index, question] of questions.entries()) {
      if (!question.question.trim()) {
        showToast(t(`Question ${index + 1} is empty`), 'error');
        return false;
      }

      if (question.mark <= 0) {
        showToast(t(`Question ${index + 1} must have a positive mark value`), 'error');
        return false;
      }

      if (question.type === "multipleChoice") {
        if (!question.options || question.options.some(opt => !opt.trim())) {
          showToast(t(`All options for question ${index + 1} must be filled`), 'error');
          return false;
        }

        if (!question.correct_answer) {
          showToast(t(`Please select a correct answer for question ${index + 1}`), 'error');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateQuestions()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Make sure all questions have the correct course_id
      const questionsToSubmit = questions.map(q => ({
        ...q,
        course_id: courseId
      }));
      
      // Submit each question individually
      for (const question of questionsToSubmit) {
        await axiosInstance.post('/questions', question);
      }
      
      showToast(t('Exam questions added successfully'), 'success');
      // Reset form
      setQuestions([
        {
          course_id: courseId,
          question: "",
          options: ["", "", ""],
          correct_answer: "",
          mark: 10,
          type: "multipleChoice"
        }
      ]);
    } catch (error) {
      console.error('Error adding exam questions:', error);
      showToast(t('Failed to add exam questions'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>        
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
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
                </div>
              )}
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
            
            <Button
              type="submit"
              text={isSubmitting ? t('Saving...') : t('Save Exam')}
              textColor="text-white"
              Bg="bg-violet-950"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    
  );
}
