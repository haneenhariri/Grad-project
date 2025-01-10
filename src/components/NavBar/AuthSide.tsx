import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navAuth } from "../../data/navData";
import Logout from "../Logout/Logout";

export default function AuthSide() {
    const [activeButton, setActiveButton] = useState("login");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [storedUserName, setStoredUserName] = useState<string>("");
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const storedName = localStorage.getItem("name") || "User";
          setStoredUserName(storedName);
        }
    }, []);
  return (
    <div className="flex items-center gap-5">
    {/* لتغغير اللغة  */}
    {/* هنا اذا كان غير مسجل يعرض ازرار تسجيل الدخول بينما اذا كان مسجل يعرض البروفايل  */}
    {isLoggedIn ? (
      <>
        <button
          onClick={() => navigate("/User/settings")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-950 text-white text-lg"
        >
        {storedUserName.charAt(0)}
        </button>
        <Logout/>
      </>
       ) : (
      /* ازرار تسجيل الدخول في القياسات الوسط و الاصغر تختفي لتظهر في السايد بار  */
      <div className=" lg:flex hidden gap-5 items-center">
        {navAuth.map((e, i) => (
          <NavLink
            key={i}
            to={e.path}
            onClick={() => setActiveButton(e.text.toLowerCase())}
            className={`${
              activeButton === e.text.toLowerCase()
                ? "bg-violet-950 text-white desktop:py-3.5 desktop:px-8.5 tablet:py-3 tablet:px-5 p-2"
                : ""
            } desktop:text-lg tablet:text-sm text-xs font-normal transition-all duration-300 rounded-lg`}
          >
            {(e.text)}
          </NavLink>
        ))}
      </div>
    )}

  </div>
  )
}
