import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";
import { userCourseProp } from "../../types/interfaces";

export default function UserCourseCard({cover , title , overall_progress , completed_lessons , total_lessons ,id}: userCourseProp) {
  const {t} = useTranslation();
  return (
    <div className=" bg-white border">
      <img className="w-full h-56" src={`http://127.0.0.1:8000/storage/${cover}`}  alt="course" />
      <div className=" p-4">
      <p className=" text-[#6E7485] text-base mb-1.5 line-clamp-1">{title}</p>
      <div className="mt-auto">
            <div className="flex justify-between text-sm mb-1">
                <span>{t('Progress')}</span>
                <span>{Math.round(overall_progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${overall_progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{completed_lessons} / {total_lessons} {t('lessons completed')}</span>
            </div>
      </div>
      </div>
      <div className="border-t flex justify-center w-full p-4">
        <Link
                to={`/watch/${id}`} 
                className=" w-full px-4 py-2 bg-[#f1cff594]  text-center rounded-md hover:bg-[#f1cff5] transition-colors"
            >
            {overall_progress === 100 ? t('Review Course') : t('Continue Learning')}
            </Link>
      </div>
    </div>
  )
}
