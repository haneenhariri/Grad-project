import { useTranslation } from "react-i18next";
import { CouCard } from "../../types/interfaces";
import { Link } from "react-router-dom";


export default function CourseCard({instructor ,cover , description ,title ,level , duration ,id} : CouCard) {
  const { t } = useTranslation()
  return (
    <div className=" sm:p-5 p-2.5 bg-white rounded-lg">
       <img src={`http://127.0.0.1:8000/storage/${cover}`} alt={title} className="w-full h-48" />
       <div className=" flex justify-between my-5">
        <div className=" flex gap-2">
          <span className=" p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">{duration} weeks</span>
          <span className=" p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">{t(level)} </span>
        </div>
        <p className=" font-semibold text-sm">{instructor}</p>
       </div>
       <h3 className=" font-bold md:text-xl text-base mb-2.5">{t(title)}</h3>
       <p className=" text-sm text-gray-600 mb-5 line-clamp-2">{t(description)}</p>
       <Link to={`/oneCourse/${id}`}  className=" bg-White/95 text-sm font-medium p-3.5 rounded-md block text-center">{t("GetNow")}</Link>
    </div>
  )
}
