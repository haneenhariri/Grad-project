import { useEffect, useState } from "react";
import { getResults } from "../../services/wishlist";
import { showToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner/Spinner";

interface RawResult {
  status: string;
  message?: string;
  course_id: number;
  course_title: string;
  course_image: string;
  instructor_name: string;
  price: number;
  score?: number;
  total_questions?: number;
  percentage?: number;
}

export default function TestResults() {
  const { t, i18n } = useTranslation();
  const [results, setResults] = useState<RawResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await getResults();
        if (response && Array.isArray(response)) {
          setResults(response);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        showToast(t("Failed to load test results"), "error");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [t]);

  const getLocalizedTitle = (title: string): string => {
    try {
      const parsed = JSON.parse(title);
      return parsed[i18n.language] || parsed["en"];
    } catch {
      return title;
    }
  };

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        {t("navigation.Test results")} ({results.length})
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white rounded-md p-8 text-center">
          <p className="text-gray-500">{t("No test results available")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-[#f1cff594] p-4 font-semibold text-gray-700">
            <div className="col-span-6">{t("navigation.Courses")}</div>
            <div className="col-span-6 text-center">{t("RESULTS")}</div>
          </div>

          {results.map((result, index) => (
            <div
              key={`${result.course_id}-${result.status}-${index}`}
              className={`grid grid-cols-12 p-4 items-center ${
                index !== results.length - 1 ? "border-b" : ""
              }`}
            >
              {/* Course Info */}
              <div className="col-span-12 sm:col-span-6 flex gap-4">
                <img
                  src={`http://127.0.0.1:8000/storage/${result.course_image}`}
                  alt={getLocalizedTitle(result.course_title)}
                  className="w-40 h-32 object-cover rounded"
                />
                <div className="flex flex-col gap-6">
                  <h3 className="font-medium text-gray-800 line-clamp-2">
                    {getLocalizedTitle(result.course_title)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("Created by:")}: {result.instructor_name}
                  </p>
                </div>
              </div>
              {/* Result */}
              <div className="col-span-12 sm:col-span-6 text-center">
                {result.status === "pending" ? (
                  <span className="text-yellow-500 font-medium">
                    {t("Not graded yet")}
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600 font-semibold text-lg">
                       {t("Percentage")}: {result.percentage}%
                    
                    </span>
                    <span className="text-gray-600 text-sm">
                       {t("Score")}: {result.score}
                    </span>
                    <span className="text-gray-600 text-sm">
                       {t("total questions")}: {result.total_questions}
                    </span>
                    
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
