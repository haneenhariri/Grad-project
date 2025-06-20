import { useTranslation } from "react-i18next";

interface filterSide
{
    setSelectedLevels: (levels: string[]) => void;
    selectedLevels: string[];
    setIsFilterVisible: (visible: boolean) => void;
    selectedCategories: string[];
    toggleFilter: <T>(setState: (values: T[]) => void, value: T) => void;
    setSelectedCategories: (categories: string[]) => void;
    selectedRatings: number[];
    setSelectedRatings: (ratings: number[]) => void;
}
export default function FilterSide({ setSelectedLevels  ,selectedLevels ,selectedCategories ,toggleFilter ,setSelectedCategories , selectedRatings ,setSelectedRatings   } : filterSide) {
  const {t} = useTranslation();
  const categories = [
    { id: "1", key: "Development" },
    { id: "7", key: "AI & ML" },
    { id: "13", key: "Data Science" },
    { id: "27", key: "Design" },
    { id: "21", key: "Cyber-security" },
    { id: "34", key: "IT & Software" }
  ];
  return (
            
            <div className="h-max z-50 bg-white md:w-3/12 w-1/2 border border-violet-950">
              <div className="p-2">
                <h3 className="font-bold">{t("Category")}</h3>
                  {categories.map((category) => (
                  <div key={category.id}>
                    <input
                      type="checkbox"
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleFilter(setSelectedCategories, category.id)}
                    />
                    <label className="text-sm mx-1" htmlFor={category.id}>
                      {t(`topCategory.${category.key}`)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">{t("CoursesSection.Rating")}</h3>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating}>
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleFilter(setSelectedRatings, rating)}
                    />
                    <label className=" text-sm mx-1" htmlFor={`rating-${rating}`}>
                      {rating} {t("Star & up")}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <h3 className="font-bold">{t("level")}</h3>
                {["Beginner", "Intermediate", "Advance"].map((level) => (
                  <div key={level}>
                    <input
                      type="checkbox"
                      id={level}
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleFilter(setSelectedLevels, level)}
                    />
                    <label className=" text-sm mx-1" htmlFor={level}>
                      {t(level)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
  )
}
