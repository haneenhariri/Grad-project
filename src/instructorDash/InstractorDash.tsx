import { useEffect, useState } from "react";
import { generalStatsInstracror, ratingsStats } from "../services/dashServe";
import Spinner from "../components/Spinner/Spinner";
import { FaBook, FaUsers } from "react-icons/fa";
import { MdAttachMoney, MdStar } from "react-icons/md";
import InfoCard from "../Admin/Dash/InfoCard";

export interface DashInstructProps
{
    courses_count: number;
    students_count: number;
    total_revenue: number;
    avg_rating:string;
}

export default function InstractorDash() {
    const [stats, setStats] = useState<DashInstructProps | null>(null);
    const [rating, setRating] = useState<DashInstructProps | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await generalStatsInstracror();
        const rating = await ratingsStats();
        setRating(rating);
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
      return <Spinner/>
    }
    
  if (!stats) {
    return <div className="flex h-64 items-center justify-center">Failed to load dashboard data</div>;
  }
  const cards = [
      {
        title: "Total Students",
        value: stats.students_count,
        icon: <FaUsers size={24} className="text-orange-500" />,
        bgColor: "bg-orange-50",
        iconBgColor: "bg-orange-100"
      },            
      {
        title: "Total Revenue",
        value: `$${stats.total_revenue.toFixed(2)}`,
        icon: <MdAttachMoney size={24} className="text-teal-500" />,
        bgColor: "bg-teal-50",
        iconBgColor: "bg-teal-100"
      },
      {
        title: "Total Courses",
        value: stats.courses_count,
        icon: <FaBook size={24} className="text-emerald-500" />,
        bgColor: "bg-emerald-50",
        iconBgColor: "bg-emerald-100"
      },
      {
        title: "Average Rating",
        value: stats.avg_rating ?? "0",
        icon: <MdStar size={24} className="text-amber-500" />,
        bgColor: "bg-amber-50",
        iconBgColor: "bg-amber-100"
      },

    ];
  return (
    <div>
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
         {cards.map((card, index) => (
           <InfoCard key={index} icon={card.icon} title={card.title} value={card.value} bgColor={card.bgColor} iconBgColor={card.iconBgColor} />
         ))}
       </div>
 
    </div>
  )
}
