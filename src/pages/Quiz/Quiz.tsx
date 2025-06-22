import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import Editor from "@monaco-editor/react";
import { useTranslation } from "react-i18next";
import * as monaco from "monaco-editor";

interface QuizQuestion {
  id : number;
  course_id: number;
  question: string;
  options: string[] | null;
  correct_answer: string | null;
  mark: number;
  type: "multipleChoice" | "code";
}

export default function Quiz() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [languages, setLanguages] = useState<{ label: string; value: string }[]>([]);
  const [language, setLanguage] = useState("javascript"); // المتغير الصحيح للغة المختارة

    useEffect(() => {
      const loadedLanguages = monaco.languages
        .getLanguages()
        .map((lang) => ({
          label: lang.aliases?.[0] || lang.id,
          value: lang.id,
        }))
        .filter((lang) => !!lang.label); // نضمن أنه يوجد اسم ظاهر

      setLanguages(loadedLanguages);
    }, []);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`http://127.0.0.1:8000/api/exam/${id}`);
        setQuiz(response.data.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCodeAnswers({
        ...codeAnswers,
        [currentQuestion]: value
      });
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      // Get the current question
      const currentQuizQuestion = quiz[currentQuestion];
      
      // Prepare the answer based on question type
      let answer = "";
      
      if (currentQuizQuestion.type === "multipleChoice") {
        if (!selectedAnswer) {
          // Show error if no option selected
          console.error("Please select an answer");
          setIsSubmitting(false);
          return;
        }
        answer = selectedAnswer;
      } else if (currentQuizQuestion.type === "code") {
        if (!codeAnswers[currentQuestion] || codeAnswers[currentQuestion].trim() === "") {
          // Show error if code is empty
          console.error("Please write some code");
          setIsSubmitting(false);
          return;
        }
        answer = codeAnswers[currentQuestion];
      }
      
      // Get the current question ID
      const question_id = currentQuizQuestion.id || currentQuestion;
      
      // Submit answer to backend
      await axiosInstance.post(`http://127.0.0.1:8000/api/user-answers`, { 
        answer,
        question_id 
      });
      
      // Move to next question or complete quiz
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (quiz.length === 0) {
    return (
      <div className="mt-[108px] min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-btn text-xl">{t("Loading quiz...")}</div>
      </div>
    );
  }
  if (isCompleted) {
    return (
      <div className="mt-[108px] min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-green-600">{t("Quiz completed successfully!")}</h2>
      </div>
    );
  }

  const currentQuizQuestion = quiz[currentQuestion];

  return (
    <div className="mt-[108px] min-h-screen  pb-10">
      <div className="container mx-auto  py-8">
        {/* Quiz header */}
        <div className="bg-btn text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-xl font-bold">
            {t("QUESTION")} {currentQuestion + 1}/{quiz.length}
          </h2>
        </div>

        {/* Quiz content */}
        <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
          <div className="flex flex-col  gap-8">
            {/* Question section */}
            <div className="md:w-full flex flex-col">
              <div>
              <h3 className="text-xl font-medium mb-6 text-primary">
                {currentQuizQuestion.question}
              </h3>
              
              <div className="text-sm text-Grey/60 mb-4">
                {t("Points")}: {currentQuizQuestion.mark}
              </div>

              </div>

              {/* Multiple choice options */}
              {currentQuizQuestion.type === "multipleChoice" && currentQuizQuestion.options && (
                <div className="grid grid-cols-2 gap-6 my-10">
                  {currentQuizQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAnswer === option 
                          ? "border-btn bg-violet-100" 
                          : "border-Grey/40 hover:border-btn"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {/* Code editor */}
              {currentQuizQuestion.type === "code" && (
                <div className="mt-4">
                  <p className="text-Grey/60 mb-2">{t("Write your code below")}:</p> 
                                <label className="block mb-2 font-medium text-sm text-gray-600">
                {t("Select Language")}
              </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mb-4 border p-2 rounded-md w-full md:w-1/3"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>


                </div>
                
              )}
            </div>

            {/* Code editor section */}
            {currentQuizQuestion.type === "code" && (
              <div className="md:w-full h-[500px] border rounded-lg overflow-hidden" style={{ direction: "ltr" }}>
                <Editor
                  height="100%"
                  language={language}
                  value={codeAnswers[currentQuestion] || "// Write your code here"}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: {
                      other: true,
                      comments: true,
                      strings: true,
                    },             
                    wordBasedSuggestions: true,
                    snippetSuggestions: "inline",
                    automaticLayout: true,
                    readOnly: false,
                    contextmenu: false,
                    copyWithSyntaxHighlighting: false
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex rtl:flex-row-reverse flex-row justify-between items-center">
          {/* Progress indicators */}
          <div className="flex rtl:space-x-reverse space-x-2">
            {quiz.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-12 rounded-full ${
                  index === currentQuestion 
                    ? "bg-btn" 
                    : index < currentQuestion 
                      ? "bg-Grey/60" 
                      : "bg-Grey/30"
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          
          <button
            onClick={handleNextQuestion}
            disabled={isSubmitting}
            className="bg-btn hover:bg-violet-700 text-white py-3 px-6 rounded-lg flex rtl:flex-row-reverse items-center transition-colors"
          >
            {currentQuestion < quiz.length - 1 
              ? t("NEXT QUESTION") 
              : isSubmitting 
                ? t("SUBMITTING...") 
                : t("FINISH QUIZ")}
            {!isSubmitting && currentQuestion < quiz.length - 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
