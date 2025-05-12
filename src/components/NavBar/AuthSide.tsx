import { useEffect, useState } from "react";
import Logout from "../Logout/Logout";
import { imgProfile } from "../../services/profileStd";
import { data, useNavigate } from "react-router-dom";
import { getSecureCookie } from "../../utils/cookiesHelper";

export default function AuthSide() {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string>("User");
  const navigate = useNavigate();
  const role = getSecureCookie('role');
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
      imgProfile()
        .then((data) => {
          if (data && data.data) {
            const user = data.data;
            console.log(user.profile_picture);
            if (user.profile_picture) {
              const imageUrl = `http://127.0.0.1:8000/storage/${user.profile_picture}`;
              setProfileImage(imageUrl);
              console.log("Profile Image URL:", imageUrl);
          }
           else {
              setProfileImage(undefined);
            }
            if (user.name) {
              setUserName(user.name);
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching profile data", err);
          setProfileImage(undefined);
        });
    }
  }, []);
  return (
    <div className="flex items-center gap-5 ">
          <button
            onClick={navTo}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-950 text-white text-lg overflow-hidden"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{userName.charAt(0)}</span> 
            )}
          </button>
          <Logout />
    </div>
  );
}
