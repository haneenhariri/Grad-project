import { useTranslation } from "react-i18next";
import Input from "../../Ui/Input/Input";
import Label from "../../Ui/Label/Label";
import { useEffect, useState } from "react";
import { allCategories } from "../../services/courses";
import { Category, SubCategory } from "../../types/interfaces";

export default function StepOne({setTitleEn , titleEn , setTitleAr ,category_id,subCategory_id, titleAr ,setSubCategory_id ,handleCategoryChange ,}) {
  const {t} = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  
  useEffect(() => {
    const fetchCategory = async () => {
        try {
          const data = await allCategories();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategory();
    }, []);
  return (
    <div className="md:p-4 p-2">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="sm:w-1/2">
                <Label label="Title [en]"/>
                <Input placeholder={t("TitleP[en]")} required onChange={(event) => setTitleEn(event.target.value)} value={titleEn} type="text"/>
            </div>
            <div className="sm:w-1/2">
                <Label label="Title [ar]" />
                <Input placeholder={t("TitleP[ar]")} required onChange={(event) => setTitleAr(event.target.value)} value={titleAr} type="text"/>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <div className="sm:w-1/2">
                <Label label="Category" />
                <select className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md" id="category" value={category_id} onChange={handleCategoryChange} required >
                    <option value="">{t("SelectCategory")}</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="sm:w-1/2">
                <Label label="SubCategory" />
                <select className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md" id="subCategory" value={subCategory_id} onChange={(e) => setSubCategory_id(e.target.value)} required >
                    <option value="">{t("SelectSubCategory")}</option>
                            {subCategories.map((sub) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))}
                          </select>
                        </div>
        </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="sm:w-1/2">
                          <Label label="level" />
                          <select
                            className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                            id="level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            required
                          >
                            <option value="">{t("SelectLevel")}</option>
                            <option value="beginner">{t("Beginner")}</option>
                            <option value="intermediate">{t("Intermediate")}</option>
                            <option value="advance">{t("Advance")}</option>
                          </select>
                        </div>
                        <div className="sm:w-1/2">
                          <Label label="CourseLanguage" />
                          <select
                            className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                            id="level"
                            value={courseLanguage}
                            onChange={(e) => setCourseLanguage(e.target.value)}
                            required
                          >
                            <option value="">{t("SelectCourseLanguage")}</option>
                            <option value="english">{t("english")}</option>
                            <option value="arabic">{t("arabic")}</option>
                          </select>
                        </div>
                        <div className="sm:w-1/2">
                          <Label label="Duration" />
                          <input
                            className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                            placeholder={t("CourseDuration")}
                            type="text"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                          />
                        </div>
                        <div className="sm:w-1/2">
                          <Label label="CoursesSection.Price" />
                          <input
                            className="mb-5 w-full p-4 placeholder:text-base bg-White/95 rounded-md"
                            placeholder={t("CoursePrice")}
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex justify-between">
                        <Button
                          type="button"
                          text="Cancel"
                          textColor="border-gray border text-violet-950"
                        />
                        <Button
                          type="button"
                          text="Save & Next"
                          textColor="text-white"
                          onClick={handleNext}
                          Bg="bg-violet-950"
                        />
                      </div>
      
    </div>
  )
}
