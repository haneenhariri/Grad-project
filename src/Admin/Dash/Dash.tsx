import { useEffect, useState } from "react";
import { generalStats } from "../../services/dashServe";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import { MdAttachMoney, MdPending, MdStar } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import InfoCard from "./InfoCard";
import Revenue from "./Revenue";
import Spinner from "../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import Rating from "./Rating/Rating";

export interface DashboardStats {
  total_students: number;
  total_instructors: number;
  total_courses: number;
  accepted_courses: number;
  pending_courses: number;
  total_revenue: number;
  platform_revenue: number;
  average_rating: string;
}

export default function Dash() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await generalStats();
        setStats(response);
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
      title: t("dashboard.Total Students"),
      value: stats.total_students,
      icon: <FaUsers size={24} className="text-orange-500" />,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
    },
    {
      title: t("dashboard.Course Instructors"),
      value: stats.total_instructors,
      icon: <FaChalkboardTeacher size={24} className="text-violet-500" />,
      bgColor: "bg-violet-50",
      iconBgColor: "bg-violet-100",
    },

    {
      title: t("dashboard.Pending Courses"),
      value: stats.pending_courses,
      icon: <MdPending size={24} className="text-pink-500" />,
      bgColor: "bg-pink-50",
      iconBgColor: "bg-pink-100",
    },

    {
      title: t("dashboard.Platform Revenue"),
      value: `$${stats.platform_revenue.toFixed(2)}`,
      icon: <MdAttachMoney size={24} className="text-teal-500" />,
      bgColor: "bg-teal-50",
      iconBgColor: "bg-teal-100",
    },
    {
      title: t("dashboard.Total Courses"),
      value: stats.total_courses,
      icon: <FaBook size={24} className="text-emerald-500" />,
      bgColor: "bg-emerald-50",
      iconBgColor: "bg-emerald-100",
    },

    {
      title: t("dashboard.Accepted Courses"),
      value: stats.accepted_courses,
      icon: <FaGraduationCap size={24} className="text-blue-500" />,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-100",
    },

    {
      title: t("dashboard.Average Rating"),
      value: stats.average_rating,
      icon: <MdStar size={24} className="text-amber-500" />,
      bgColor: "bg-amber-50",
      iconBgColor: "bg-amber-100",
    },
    {
      title: t("dashboard.Total Revenue"),
      value: `$${stats.total_revenue.toFixed(2)}`,
      icon: <BsCurrencyDollar size={24} className="text-indigo-500" />,
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-100",
    },
  ];

  return (
    <section>
      <div className="space-y-6">
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
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
        <div className=" flex flex-col justify-center items-center lg:flex-row gap-6">
          <Revenue />
          <Rating />
        </div>
      </div>
    </section>
  );
}
