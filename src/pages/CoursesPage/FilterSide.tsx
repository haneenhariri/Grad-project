import { useTranslation } from "react-i18next";

interface filterSide
{
    selectedCategories: string;
    onClick : () => void ;
}
export default function FilterSide({selectedCategories , onClick} : filterSide) {
  const {t} = useTranslation();
  return (
    <div className="h-max bg-white md:w-4/12 w-1/2 border border-violet-950">
        <div className="p-2">
            <h3 className="font-bold">{t("Category")}</h3>
                {["Development", "AI & ML", "Data Science", "Design", "Cyber-security" , "IT & Software"].map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={onClick}
                    />
                    <label className=" text-sm mx-1" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
        </div>
    </div>
  )
}
