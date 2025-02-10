
import Tabs from "../Tabs/Tabs";
import { stdTabs } from "../../data/tabsData";
import { useEffect, useState } from "react";
import { imgProfile } from "../../services/profileStd";
import { getSecureCookie } from "../../utils/cookiesHelper";
export default function ProfileHeader() {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string>("User");
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
    <div className=" ">
      <div className=" flex justify-between items-center border  rounded-t-md   border-b-0 p-5 border-violet-400">
        <div className="flex gap-5 items-center">
        <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-950 text-white text-lg overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span>{userName.charAt(0)}</span>
                        )}
          </div>
        <h3 className="text-base font-semibold">{userName}</h3>
        </div>
      </div>
      {/* tabs */}
      <div className="flex items-center gap-6  border border-t-0 px-5 border-violet-400 ">
        {stdTabs.map((e,i) => 
        (
         <Tabs key={i} path={e.path} text={e.text}/>
        ))}
      </div>
    </div>
  )
}
