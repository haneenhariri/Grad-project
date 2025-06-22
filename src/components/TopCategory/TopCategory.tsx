import { categoryData } from "../../data/category";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import CategoryCard from "../Cards/CategoryCard";

export default function TopCategory() {
  return (
    <section className="flex flex-col justify-center items-center lg:py-20 mb-10">
      <SectionsTitle title={'topCategory.title'}/>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5 w-full">
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
