import { useEffect, useState } from 'react'
import { TeachersProps } from '../components/Teachers/Teachers'
import { gitUser } from '../services/message';
import { NavLink, useParams } from 'react-router-dom';
import Button from '../Ui/Button/Button';

export default function SidebarChat() {
    const [teacher, setTeacher] = useState<TeachersProps[]>([]);
    const { user_id } = useParams();
    const selectedId = user_id ? parseInt(user_id) : null;    
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
    <div className=' border w-1/3'>
      <div className='flex justify-between items-center p-6'>
        <h2>Message</h2>
        <Button text='Compose' Bg=' bg-btn text-white'/>
      </div>
      {teacher?.map((t,i) => (
         <NavLink  to={`/User/Message/${t.user_id}`}  key={i}  className={`px-6 py-3 h-[72px] flex justify-between gap-4 items-center ${t.user_id === selectedId ? 'bg-[#f1f0f0]' : ''}`}>
            <img className=" h-12 w-12 rounded-full object-cover" src={`http://127.0.0.1:8000/storage/${t.profile_picture}`} alt={t.name}/>
                <div className=" w-full ">
                    <h2 className="text-base font-semibold">{t.name}</h2>
                    <p className=" text-sm text-gray-500">{t.specialization}</p>
                </div>
          </NavLink>
      ))}
    </div>
  )
}
