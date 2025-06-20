import { useEffect, useState } from "react";
import { generalStatsInstracror } from "../services/dashServe";
import Spinner from "../components/Spinner/Spinner";
import { FaBook, FaUsers } from "react-icons/fa";
import { MdAttachMoney, MdStar } from "react-icons/md";
import InfoCard from "../Admin/Dash/InfoCard";
import { useTranslation } from "react-i18next";
import { TopCourse } from "../types/interfaces";
import TopCourses from "./InstDash/TopCourses";
import RevenueInst from "./InstDash/RevenueInst";
import Rating from "./InstDash/Rating";

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
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await generalStatsInstracror();
        setStats(statsRes);
        setTopCourses(statsRes.top_courses);
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
      value: `${stats.average_rating}`,
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
      <div className=" flex gap-6">
        <RevenueInst/>
        <Rating/>
      </div>
      {topCourses.length > 0 && (
        <TopCourses topCoursesProps={topCourses}/>
      )}
    </div>
  );
}
