import { useEffect, useState } from "react";
import Logout from "../Logout/Logout";
import { imgProfile } from "../../services/profileStd";
import { useNavigate } from "react-router-dom";

export default function AuthSide() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      imgProfile()
        .then((data) => {
          if (data && data.data) {
            const user = data.data;
            if (user.profile_image) {
              setProfileImage(user.profile_image);
            } else {
              setProfileImage(null);
            }
            if (user.name) {
              setUserName(user.name);
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching profile data", err);
          setProfileImage(null);
        });
    }
  }, []);
  return (
    <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/User/settings")}
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
