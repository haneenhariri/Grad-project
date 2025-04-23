import { useEffect, useState } from "react"
import { gitUser } from "../../services/message"
import { NavLink } from "react-router-dom";



export interface TeachersProps
{
    name:string;
    profile_picture:string;
    user_id:number;
    specialization: string;
}
export default function Teachers() {
    const [teacher, setTeacher] = useState<TeachersProps[]>([])
    useEffect( () => 
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
  return (
    <div className="py-10 p-5 border grid grid-cols-4 gap-6 border-violet-400 rounded-b">  
      {teacher?.map((t,i) => 
        (
            <div key={i} className=" border">
                <img className="  h-56 w-full object-cover" src={`http://127.0.0.1:8000/storage/${t.profile_picture}`} alt={t.name}/>
                <div className="px-5 py-4 text-center  border-b">
                    <h2 className=" text-xl font-semibold">{t.name}</h2>
                    <p className=" text-gray-500">{t.specialization}</p>
                </div>
                <div className="p-4 flex justify-center items-center">
                <NavLink className=' text-white flex justify-center items-center  text-lg bg-btn w-full text-center h-10' to={`/User/Message/${t.user_id}`}>Send message</NavLink>
                </div>
            </div>
        ))}
    </div>
  )
}
