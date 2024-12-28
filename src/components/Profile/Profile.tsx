import { NavLink } from 'react-router-dom';
import './Profile.css'
import Logout from '../Logout/Logout';


export default function Profile() {
  const storedName = localStorage.getItem('name') || "User";
  return (
    <div className="pro h-max bg-white">
      <div className=" p-4">
        <img src="" alt="" />
        <div  className="flex items-center justify-center w-40 h-40   rounded-full bg-violet-950 text-white text-lg">
            {storedName.charAt(0)}
          </div>
        <h2 className=' text-center my-5'>{storedName}</h2>
      </div>
      <div>
        <NavLink className={({isActive}) => isActive ? 'p-2 bg-violet-950 text-white block text-center' : 'p-2'} to={'/User/profile'} > Profile </NavLink>
       <Logout/> 
      </div>
    </div>
  )
}
