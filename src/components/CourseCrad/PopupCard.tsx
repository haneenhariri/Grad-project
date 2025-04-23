import { useTranslation } from "react-i18next"
import star from '../../assets/icons/Star (3).png';
import chart from '../../assets/bar-chart (1).png';
import clock from '../../assets/icons/Clock (1).png';
import Button from "../../Ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { CouCard } from "../../types/interfaces";

export default function PopupCard({mainCategoryName ,title,price ,id,instructor, duration, rating ,level } :CouCard) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={`absolute top-14 w-[300px] bg-white shadow-md lg:p-5 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10`}>
      <div className="py-1 px-1.5 w-max mb-2.5 flex items-center bg-violet-600/10 text-xs rounded">
        {mainCategoryName}
      </div>
      <h3 className="font-bold md:text-xl mb-2.5 rtl:text-lg text-base">{title}</h3>
      <div className=" mb-2.5">
          <p className=" text-base font-semibold text-gray-600">{t("CoursesSection.CourseBy")}<span className=" font-bold text-violet-700 text-lg">{instructor}</span></p>
      </div>
      <div  className=" flex mb-2.5 items-center">
      <img src={star} alt="star" className="w-4.5 h-4.5" />
        <p className=" text-base font-semibold text-gray-600">{t("CoursesSection.Rating")}</p>
        <div className="flex mx-2 items-center gap-1 justify-center">
        <span className="text-sm">{rating}</span>
        </div>
      </div>
      <div className=" flex mb-2.5 items-center gap-4">
        <div className=" flex items-center gap-1">
          <img src={chart} alt="level"  className="w-4.5 h-4.5"/>
          <p>{level}</p>
        </div>
        <div className=" flex items-center gap-1">
          <img src={clock} alt="level"  className="w-4.5 h-4.5"/>
          <p>{duration} {t("weeks")}</p>
        </div>
      </div>
      <div className=" flex items-center gap-2">
      <p className=" text-base font-semibold text-gray-600">{t("CoursesSection.Price")}:</p>
      <span className="text-violet-600 text-lg font-semibold">{price}$</span>
      </div>
      <div className="my-2.5">
        <Button text="Add to Fav" textColor="text-white w-full !text-lg !rounded-none" Bg="bg-violet-950" />
      </div>
      <div className="my-2.5">
        <Button text="Course Detail" textColor="text-white w-full !text-lg !rounded-none" Bg="bg-violet-950" onClick={() => navigate(`/oneCourse/${id}`)} />
      </div>
  </div>
  )
}
