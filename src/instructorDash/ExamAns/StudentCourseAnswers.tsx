import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import Button from "../../Ui/Button/Button";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface UserAnswer {
  id: number;
  answer: string;
  mark: number | null;
}

interface Answer {
  id: number;
  course_id: number;
  question: string;
  options: null;
  correct_answer: null;
  mark: number;
  type: string;
  user_answer: UserAnswer;
}

interface ApiResponse {
  data: Answer[];
}

export default function StudentCourseAnswers() {
  const { courseId, userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMark, setTotalMark] = useState(0);
  const [totalMaxMark, setTotalMaxMark] = useState(0);
  const [editingMarks, setEditingMarks] = useState<
    Record<number, number | null>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // استقبال بيانات الطالب من location.state
  const { studentName, studentEmail } = location.state || {};
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchStudentAnswers = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get<ApiResponse>(
          `/user/${userId}/answers/${courseId}`
        );

        const responseData = response.data.data;
        setAnswers(responseData || []);

        // تهيئة حالة التحرير بالعلامات الحالية
        const initialEditingMarks: Record<number, number | null> = {};
        responseData.forEach((answer) => {
          initialEditingMarks[answer.user_answer.id] = answer.user_answer.mark;
        });
        setEditingMarks(initialEditingMarks);

        const calculatedTotalMark = responseData.reduce((sum, answer) => {
          return sum + (answer.user_answer.mark || 0);
        }, 0);

        const calculatedTotalMaxMark = responseData.reduce((sum, answer) => {
          return sum + answer.mark;
        }, 0);

        setTotalMark(calculatedTotalMark);
        setTotalMaxMark(calculatedTotalMaxMark);
      } catch (error) {
        console.error("Error fetching student answers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && userId) {
      fetchStudentAnswers();
    }
  }, [courseId, userId]);

  const handleMarkChange = (answerId: number, value: string) => {
    const numValue = value === "" ? null : Number(value);
    setEditingMarks((prev) => ({
      ...prev,
      [answerId]: numValue,
    }));
  };

  const submitMark = async (answerId: number) => {
    try {
      setIsSubmitting(true);

      const markToSubmit = editingMarks[answerId];

      // إرسال العلامة إلى الخادم باستخدام PUT
      const response = await axiosInstance.put(`/add-mark/${answerId}`, {
        mark: markToSubmit,
      });

      // تحديث العلامة في حالة المكون
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.user_answer.id === answerId
            ? {
                ...answer,
                user_answer: {
                  ...answer.user_answer,
                  mark: markToSubmit,
                },
              }
            : answer
        )
      );

      // إعادة حساب المجموع الكلي
      const newTotalMark = answers.reduce((sum, answer) => {
        return (
          sum +
          (answer.user_answer.id === answerId
            ? markToSubmit || 0
            : answer.user_answer.mark || 0)
        );
      }, 0);
      setTotalMark(newTotalMark);

      toast.success(response.data.message || "تم حفظ العلامة بنجاح", {
        draggable: true,
        closeOnClick: true,
      });
    } catch (error) {
      console.error("Error submitting mark:", error);
      toast.error("حدث خطأ أثناء حفظ العلامة", {
        draggable: true,
        closeOnClick: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">{t("codeReview.Loading...")}</div>;
  }

  return (
    <section className="p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-8">
        {/* عنوان الصفحة وبيانات الطالب */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {t("codeReview.Student Answer Details")}{" "}
            </h1>
            <div className="text-gray-600 text-sm space-y-1">
              <p>
                <span className="font-semibold text-gray-700">
                  {t("codeReview.Student Name")}:
                </span>{" "}
                {studentName || t("CodeReview.Unknown")}{" "}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  {t("codeReview.Email")}:
                </span>{" "}
                {studentEmail || t("CodeReview.Unknown")}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-sm bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-gray-700 shadow-sm">
              <span className="font-semibold">
                {t("codeReview.Student Total Mark")}:{" "}
                <span className="text-blue-600 font-bold">
                  {totalMark} / {totalMaxMark}
                </span>
              </span>
            </div>
            <Button
              text={t("Back")}
              onClick={() => navigate(-1)}
              Bg="bg-gray-200 text-gray-800 hover:bg-gray-300"
            />
          </div>
        </div>

        {/* قائمة الإجابات */}
        {answers.length > 0 ? (
          <div className="space-y-10">
            {answers.map((answer) => (
              <div
                key={answer.id}
                className="rounded-xl border border-gray-200 shadow-sm p-5 space-y-5 bg-gray-50"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {t("codeReview.Question")}: {answer.question}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t("codeReview.Max Mark")}:{" "}
                      <span className="text-blue-600 font-medium">
                        {answer.mark}
                      </span>
                    </p>
                  </div>

                  {/* إدخال العلامة */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                    <input
                      type="number"
                      min="0"
                      max={answer.mark}
                      value={editingMarks[answer.user_answer.id] ?? ""}
                      onChange={(e) =>
                        handleMarkChange(answer.user_answer.id, e.target.value)
                      }
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("codeReview.Mark")}
                    />
                    <span className="text-sm text-gray-600">
                      / {answer.mark}
                    </span>
                    <Button
                      text={isSubmitting ? "Saving..." : "Save"}
                      onClick={() => submitMark(answer.user_answer.id)}
                      disabled={isSubmitting}
                      Bg="bg-blue-600 text-white hover:bg-blue-700"
                      size="small"
                    />
                  </div>
                </div>

                {/* عرض الإجابة */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    {t("codeReview.Student Answer")}:
                  </h4>
                  {answer.type === "code" && answer.user_answer.answer ? (
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      <div style={{ direction: "ltr" }}>
                        <Editor
                          height="300px"
                          defaultLanguage="html"
                          value={answer.user_answer.answer}
                          theme="vs-dark"
                          options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                            lineNumbers: "on",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="bg-white border border-gray-200 p-4 rounded-md text-gray-800 shadow-sm">
                      {answer.user_answer.answer || t("codeReview.No Answer")}{" "}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {t("codeReview.No answers found")}
          </div>
        )}
      </div>
    </section>
  );
}
