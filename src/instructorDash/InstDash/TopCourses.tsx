import { useTranslation } from "react-i18next";
import { TopCourse } from "../../types/interfaces"

interface TopCoursesProps
{
    topCoursesProps : TopCourse[];
}
export default function TopCourses({topCoursesProps} : TopCoursesProps ) {
  const { t, i18n } = useTranslation();
  return (
    <div className=" w-1/2 bg-white  rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold p-4 ">{t("dashboard.top_courses")}</h2>
      <div className="overflow-x-auto  ">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Course Title</th>
              <th className="px-4 py-3">Students</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {topCoursesProps.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 relative">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{i18n.language === "en"
                        ? item.title.en
                        : item.title.ar}</td>
                <td className="px-4 py-3">{item.students_count}</td>
                <td className={`px-4 py-3 text-yellow-500 font-medium `}>
                  {Number(item.average_rating)}
                </td>
                <td className={`px-4 py-3 text-green-500 font-medium `}>
                  {item.revenue} $
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
