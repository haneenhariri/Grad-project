import { useTranslation } from "react-i18next";
import { categoryData } from "../../data/category";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import CategoryCard from "../Cards/CategoryCard";

export default function TopCategory() {
    const {t} = useTranslation()
  return (
    <section className="flex flex-col  justify-center items-center lg:py-20">
      <SectionsTitle title={t('topCategory.title')}/>
      <div className=" grid grid-cols-3 gap-7.5 w-full">
        {categoryData.map( (item , index)=> (
            <CategoryCard key={index} 
            img={item.img}
            title={item.title}
            color={item.color} 
            count={item.count} />
        ))}
      </div>
    </section>
  )
}
