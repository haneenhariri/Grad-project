import { useTranslation } from "react-i18next"
interface FilterPopupMobileProps {
    setSelectedLevels: (levels: string[]) => void;
    selectedLevels: string[];
    setIsFilterVisible: (visible: boolean) => void;
    selectedCategories: string[];
    toggleFilter: <T>(setState: (values: T[]) => void, value: T) => void;
    setSelectedCategories: (categories: string[]) => void;
    selectedRatings: number[];
    setSelectedRatings: (ratings: number[]) => void;
}
export default function FilterPopupMobile({ setSelectedLevels  ,selectedLevels, setIsFilterVisible ,selectedCategories ,toggleFilter ,setSelectedCategories , selectedRatings ,setSelectedRatings   } : FilterPopupMobileProps) {
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
              <div className="fixed  z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white  p-2 mt-10 w-10/12 max-w-md rounded-md">
                    <div className="p-2">
                  <button
                    className=" w-full  text-left text-lg font-bold"
                    onClick={() => setIsFilterVisible(false)}
                  >
                    &times;
                  </button>
                      <h3 className="font-bold">Category</h3>
                      {categories.map((category) => (
                        <div className="flex items-center" key={category.id}>
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
                      <h3 className="font-bold">Rating</h3>
                      {[5.000, 4, 3, 2, 1].map((rating) => (
                        <div className="flex items-center" key={rating}>
                          <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleFilter(setSelectedRatings, rating)}
                          />
                          <label className=" text-sm mx-1" htmlFor={`rating-${rating}`}>
                            {rating} Star & up
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">Course Level</h3>
                      {["Beginner", "Intermediate", "Advance"].map((level) => (
                        <div className="flex items-center" key={level}>
                          <input
                            type="checkbox"
                            id={level}
                            checked={selectedLevels.includes(level)}
                            onChange={() => toggleFilter(setSelectedLevels, level)}
                          />
                          <label className=" text-sm mx-1" htmlFor={level}>
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
  )
}
