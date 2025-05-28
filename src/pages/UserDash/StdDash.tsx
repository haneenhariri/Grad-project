import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { studentStats } from "../../services/dashServe";
import { FaBook, FaGraduationCap, FaChartLine } from "react-icons/fa";
import InfoCard from "../../Admin/Dash/InfoCard";
import CourseSlider from "./CourseSlider";

export interface StudentStats {
  enrolled_courses: number;
  completed_courses: number;
  total_lessons_watched: number;
  average_progress: string;
}

export default function StdDash() {
  const {t} = useTranslation();
  const [stats, setStats] = useState<StudentStats | null >(null);
  useEffect (() => {
    const fetchState = async () => 
    {
        try{
            const response = await studentStats();
            setStats(response);
        }catch (error) {
            console.error("Error fetching stats:", error);
        }
    };
    fetchState();
  }, []);
  
    const cards = [
      {
        title: "Enrolled Courses",
        value: stats?.enrolled_courses ?? 0,
        icon: <FaBook size={24} className="text-orange-500" />,
        bgColor: "bg-orange-50",
        iconBgColor: "bg-orange-100"
      },
      {
        title: "Completed Courses",
        value: stats?.completed_courses ?? 0,
        icon: <FaGraduationCap size={24} className="text-violet-500" />,
        bgColor: "bg-violet-50",
        iconBgColor: "bg-violet-100"
      },
      
      {
        title: "Total Lessons Watched",
        value: stats?.total_lessons_watched ?? 0,
        icon: <FaGraduationCap size={24} className="text-pink-500" />,
        bgColor: "bg-pink-50",
        iconBgColor: "bg-pink-100"
      },
      
      {
        title: "Average Progress",
        value: stats?.average_progress ?? "0%",
        icon: <FaChartLine size={24} className="text-teal-500" />,
        bgColor: "bg-teal-50",
        iconBgColor: "bg-teal-100"
      },];
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5">{t("navigation.DashBoard")}</h2>
      <div className="grid mb-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
          <InfoCard key={index} icon={card.icon} title={card.title} value={card.value} bgColor={card.bgColor} iconBgColor={card.iconBgColor} />
        ))}
      </div>
      <CourseSlider/>
    </section>
  )
}
