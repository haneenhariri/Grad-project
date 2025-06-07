import { useEffect, useState } from "react";
import { generalStatsInstracror, ratingsStats } from "../services/dashServe";
import Spinner from "../components/Spinner/Spinner";
import { FaBook, FaUsers, FaStar } from "react-icons/fa";
import { MdAttachMoney, MdStar } from "react-icons/md";
import InfoCard from "../Admin/Dash/InfoCard";
import { useTranslation } from "react-i18next";

interface TopCourse {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  students_count: number;
  price: number;
  cover: string;
}

interface RatingItem {
  course_id: number;
  average_rating: string;
}

interface DashInstructProps {
  courses_count: number;
  students_count: number;
  total_revenue: number;
  average_rating: number;
  top_courses: TopCourse[];
}

export default function InstractorDash() {
  const [stats, setStats] = useState<DashInstructProps | null>(null);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [ratings, setRatings] = useState<RatingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await generalStatsInstracror();
        const ratingRes = await ratingsStats();
        setStats(statsRes);
        setTopCourses(statsRes.top_courses);
        setRatings(ratingRes);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        Failed to load dashboard data
      </div>
    );
  }

  const cards = [
    {
      title: t("dashboard.students_registered"),
      value: stats.students_count,
      icon: <FaUsers size={24} className="text-orange-500" />,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
    },
    {
      title: t("dashboard.total_revenue"),
      value: `$${stats.total_revenue.toFixed(2)}`,
      icon: <MdAttachMoney size={24} className="text-teal-500" />,
      bgColor: "bg-teal-50",
      iconBgColor: "bg-teal-100",
    },
    {
      title: t("dashboard.courses_count"),
      value: stats.courses_count,
      icon: <FaBook size={24} className="text-emerald-500" />,
      bgColor: "bg-emerald-50",
      iconBgColor: "bg-emerald-100",
    },
    {
      title: t("dashboard.overall_rating"),
      value: `${stats.average_rating}/5`,
      icon: <MdStar size={24} className="text-amber-500" />,
      bgColor: "bg-amber-50",
      iconBgColor: "bg-amber-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            bgColor={card.bgColor}
            iconBgColor={card.iconBgColor}
          />
        ))}
      </div>

      {topCourses.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {t("dashboard.top_courses")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCourses.map((course) => {
              const rating = ratings.find((r) => r.course_id === course.id);
              return (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${course.cover}`}
                    alt={
                      i18n.language === "en" ? course.title.en : course.title.ar
                    }
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">
                      {i18n.language === "en"
                        ? course.title.en
                        : course.title.ar}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <FaUsers className="mr-1" /> {course.students_count}
                      </span>
                      <span className="font-medium">${course.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <FaStar />
                      <span>
                        {rating
                          ? parseFloat(rating.average_rating).toFixed(1)
                          : "0.0"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
