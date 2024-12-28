import { useTranslation } from "react-i18next";
import { CouCard } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";


export default function CourseCard({instructor ,img , des ,title ,level , weeks ,id} : CouCard) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className=" p-5 bg-white rounded-lg">
       <img src={img} alt={title} className="w-full h-48" />
       <div className=" flex justify-between my-5">
        <div className=" flex gap-2">
          <span className=" p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">{t(weeks)} </span>
          <span className=" p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">{t(level)} </span>
        </div>
        <p className=" font-semibold text-sm">{t(instructor)}</p>
       </div>
       <h3 className=" font-semibold text-xl mb-2.5">{t(title)}</h3>
       <p className=" text-base mb-5">{t(des)}</p>
       <button onClick={() =>( navigate(`/oneCourse/${id}`))} className=" bg-White/95 text-sm font-medium p-3.5 rounded-md w-full text-center">{t("GetNow")}</button>
    </div>
  )
}
