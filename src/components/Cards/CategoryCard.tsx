import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface CategoryCardProps
{
    img : string;
    color :string;
    title :string;
    count : string;
}

export default function CategoryCard({img , color , title , count} : CategoryCardProps) {
  const {t} = useTranslation()
  return (
    <NavLink to={''} className={`${color} transition rounded-md flex items-center md:gap-5 gap-2.5 hover:shadow-lg  hover:-rotate-2  md:p-5 p-2.5`}>
      <div className=" w-16 h-16 bg-white p-4 flex items-center justify-center">
          <img src={img} alt={title} className="w-8 h-8" />
      </div>
      <div>
        <h3 className=" text-xl rtl:text-lg font-semibold ">{t(`topCategory.${title}`)}</h3>
        <span>{count} {t('Courses')}</span>
      </div>
    </NavLink>
  )
}
