import { useEffect, useState } from "react";
import { imgProfile } from "../services/profileStd";
import { getSecureCookie } from "../utils/cookiesHelper";
import AuthSide from "../components/NavBar/AuthSide";

export default function DashHead() {
    const [userName, setUserName] = useState<string>("User");
    useEffect(() => {
      const token = getSecureCookie("token");
      if (token) {
        imgProfile()
          .then((data) => {
            if (data && data.data) {
              const user = data.data;
              if (user.name) {
                setUserName(user.name);
              }
            }
          })
          .catch((err) => {
            console.error("Error fetching profile data", err);
          });
      }
    }, []);
  return (
    <div className=" w-full shadow-sm  px-5 flex items-center justify-between py-2.5 bg-white h-[61px]">
      <h3 className="text-lg font-semibold">{userName}</h3>
      <AuthSide/>
    </div>
  )
}
