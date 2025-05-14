import { useEffect, useState } from "react";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import { getRecommended } from "../../services/wishlist";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { allCourses, courseDataProps } from "../../services/courses";

export default function Recommended() {
    const {t} = useTranslation()
    const lang = useSelector((state: RootState) => state.language.lang);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [recommended, setRecommended] = useState<courseDataProps[]>([]);
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
    },[lang]
    );
  return (
    <section className=" shadow-md rounded-md !bg-white p-10">
      <div className=" w-full text-violet-900 flex items-center justify-between">
        <SectionsTitle  title="CoursesSection.Recommended Courses"/>
      </div>
      <div className="gap-5 grid grid-cols-4">
        {recommended?.slice(0,8).map((e,i) => (
             <div className="relative group min-h-[333px]  rounded-md" key={i}>
                <img src={`http://127.0.0.1:8000/storage/${e.cover}`} alt={e.title} className="w-full h-44" />
                <div className=" h-fit">
                   <div className="rounded-b-md bg-gray-h p-3.5">
                   <div className="flex justify-between mb-2">
                        <div className="py-1 px-1.5 flex items-center bg-pink-500/20  text-xs rounded">
                            {e.level}
                        </div>
                        <span className="text-violet-600 font-semibold">{e.price}$</span>
                        </div>
                        <h3 className="font-bold md:text-xl min-h-[3.5rem] rtl:text-lg  line-clamp-2 text-base">{e.title}</h3>
                   </div>
                   <div className="border-t flex justify-between items-center bg-gray-h p-3.5">
                    <span className="text-sm">{e.duration} {t("weeks")}</span>
                </div>
                </div>
            </div>
        ))}
      </div>
    </section>
  )
}
