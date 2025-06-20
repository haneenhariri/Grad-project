import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { allCourses, courseDataProps } from "../../services/courses";
import { getRecommended } from "../../services/wishlist";

export default function Suggestion() {
      const [recommended, setRecommended] = useState<courseDataProps[]>([]);
      const lang = useSelector((state: RootState) => state.language.lang);
      const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { t } = useTranslation();
      useEffect(() => {
          if(!isAuthenticated || recommended.length == 0 )
          {
              const fetchCourse = async () => {
                  try {
                      const data = await allCourses(lang);
                          setRecommended(data);
                        } catch (error : unknown ) {
                          console.log("Error loading course" , error);
                        } 
              }
              fetchCourse();
          }
          else {
              const fetchRecommendedCourse = async () =>
              {
                  try{
                      const data = await getRecommended(lang);
                      setRecommended(data.data);
                  }catch( err : unknown)
                  {
                      console.log(err);
                  }
              };
              fetchRecommendedCourse();
          }
      },[lang] );
  return (
    <div className="lg:flex hidden flex-wrap items-center gap-2.5 pt-6 pb-4 border-b border-violet-950">
      <h3>{t("Suggestion")}</h3>
      <div className="flex gap-6 justify-around items-center">
        {[...new Set(recommended.map((e: any) => e?.main_category_name))]
         .filter(Boolean)
          .map((name: string, i: number) => (
          <button key={i} className="text-violet-800">
      {name}
    </button>
))}
      </div>
    
    </div>
  );
}
