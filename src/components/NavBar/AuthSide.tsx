import { useEffect } from "react";
import Logout from "../Logout/Logout";
import {  useNavigate } from "react-router-dom";
import { getSecureCookie } from "../../utils/cookiesHelper";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProfile } from "../../redux/profileSlice/profileSlice";

export default function AuthSide() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const role = getSecureCookie('role');
  const { name, profile_picture } = useAppSelector((state) => state.profile);
  const navTo = () => 
  {
    if(role === 'student') 
    {
      navigate("/User/settings");
    }else if(role === 'instructor')
    {
      navigate('/instruct/Settings')
    }else if( role === 'admin')
    {
      navigate('/Admin/Settings')
    }}
  
   useEffect(() => {
    const token = getSecureCookie("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);
  
  const imageUrl = profile_picture
    ? `http://127.0.0.1:8000/storage/${profile_picture}`
    : null;
  return (
    <div className="flex items-center gap-5 ">
          <button
            onClick={navTo}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-950 text-white text-lg overflow-hidden"
          >
            {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{name?.charAt(0) || "U"}</span>
        )}
          </button>
          <Logout />
    </div>
  );
}
