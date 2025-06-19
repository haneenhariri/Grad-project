import { useEffect, useState } from "react";
import { ratingsStats } from "../../services/dashServe";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface RatingTimelineItem {
  period: string;
  average_rating: string;
  count: number;
}

interface RatingDistribution {
  "5": number;
  "4": number;
  "3": number;
  "2": number;
  "1": number;
}

interface RatingData {
  period: string;
  timeline: RatingTimelineItem[];
  overall_rating: number;
  rating_distribution: RatingDistribution;
}

export default function Rating() {
  const [periodType, setPeriodType] = useState<
    "this_week" | "this_month" | "this_year"
  >("this_month");
  const [ratings, setRatings] = useState<RatingData | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await ratingsStats(periodType);
        console.log("📦 Full response from API:", res);

        const timeline = (res.timeline || []).map(
          (item: RatingTimelineItem) => ({
            ...item,
            average_rating: parseFloat(item.average_rating.toString()),
          })
        );

        const overallRating = parseFloat(res.overall_rating?.toString() || "0");

        setRatings({
          period: res.period,
          overall_rating: overallRating,
          rating_distribution: res.rating_distribution || {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
          },
          timeline,
        });
      } catch (error) {
        console.error("❌ Error fetching stats:", error);
      }
    };

    fetchRate();
  }, [periodType]);

  // ✅ تأكد من أن البيانات موجودة قبل المتابعة
  if (!ratings || !ratings.timeline.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        {t("dashboard.LoadingRating")}
      </div>
    );
  }
  const { overall_rating, rating_distribution, timeline } = ratings;
  const total = Object.values(rating_distribution).reduce((a, b) => a + b, 0);
  const ratingBars = [5, 4, 3, 2, 1].map((star) => {
    const count = rating_distribution[star as keyof RatingDistribution] || 0;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { star, count, percentage };
  });

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-1 text-orange-500">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {half && <FaStarHalfAlt />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white flex flex-col gap-4 justify-between p-4 rounded-lg shadow-sm w-1/2 mx-auto">
      {/* Header with dropdown (optional) */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg  text-gray-800 font-semibold">
          {t("dashboard.Overall Course Rating")}
        </h2>
        <div className="relative">
          <select
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value as typeof periodType)}
            className="appearance-none bg-transparent pr-8 pl-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="this_week">{t("dashboard.This week")}</option>
            <option value="this_month">{t("dashboard.This month")}</option>
            <option value="this_year">{t("dashboard.This year")}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Rating and Chart */}
      <div className="grid h-full grid-cols-2 gap-6 items-center mb-6">
        <div className="bg-orange-50 h-full flex justify-center items-center flex-col rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{overall_rating.toFixed(1)}</div>
          <div className="flex justify-center mt-1 mb-1">
            {renderStars(overall_rating)}
          </div>
          <div className="text-sm text-gray-500">{t("dashboard.Overall Rating")}</div>
        </div>
        <ResponsiveContainer width="100%">
          <LineChart data={timeline}>
            <XAxis dataKey="period" hide />
            <YAxis domain={[0, 5]} hide />
            <CartesianGrid vertical={false} stroke="#EEF2F6" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                fontSize: "14px",
              }}
            />
            <Line
              type="monotone"
              dataKey="average_rating"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f97316" }}
              activeDot={{ r: 6, fill: "#f97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {ratingBars.map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-2">
            <div className="flex items-center min-w-[80px] text-sm text-gray-700">
              <FaStar className="text-orange-500 mr-1" />
              {star} Star
            </div>
            <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
              <div
                className="bg-orange-500 h-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-10 text-right text-sm">{percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
