import { useEffect, useState } from "react"
import { gitUser } from "../../services/message"
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getSecureCookie } from "../../utils/cookiesHelper";



export interface TeachersProps
{
    name:string;
    profile_picture:string;
    user_id:number;
    specialization: string;
}
export default function Teachers() {
    const { t } = useTranslation();
    const [teacher, setTeacher] = useState<TeachersProps[]>([]);
    const userRole = getSecureCookie('role');
    
    useEffect(() => 
    {
        const gitTeacher = async () => 
        {
            try{
                const myTeacher = await gitUser();
                setTeacher(myTeacher);
            }catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        gitTeacher();
    }, []);
    
    // تحديد المسار المناسب بناءً على دور المستخدم
    const getMessagePath = (userId: number) => {
        if (userRole === 'instructor') {
            return `/instruct/Message/${userId}`;
        } else {
            return `/User/Message/${userId}`;
        }
    };
    
    return (
        <section>
            <div>
                <h2 className="text-2xl font-semibold mb-6">{t("Teachers")} ({teacher?.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-b">  
                {teacher?.map((e, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {e.profile_picture ? (
                            <img 
                                className="h-56 w-full object-cover" 
                                src={`http://127.0.0.1:8000/storage/${e.profile_picture}`} 
                                alt={e.name}
                            />
                        ) : (
                            <div className="h-56 w-full bg-violet-950 flex items-center justify-center">
                                <span className="text-white text-6xl font-semibold">
                                    {e.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="px-5 py-4 text-center border-b">
                            <h2 className="text-xl font-semibold">{e.name}</h2>
                            <p className="text-gray-500">{e.specialization}</p>
                        </div>
                        <div className="p-4 flex justify-center items-center">
                            <NavLink 
                                className="flex justify-center items-center text-lg bg-[#f1cff594] rounded-md hover:bg-[#f1cff5] w-full text-center h-10" 
                                to={getMessagePath(e.user_id)}
                            >
                                {t("Send message")}
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
