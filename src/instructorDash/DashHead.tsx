import { useEffect } from "react";
import { getSecureCookie } from "../utils/cookiesHelper";
import AuthSide from "../components/NavBar/AuthSide";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProfile } from "../redux/profileSlice/profileSlice";

export default function DashHead() {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.profile);

  useEffect(() => {
    const token = getSecureCookie("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <div className="w-full shadow-sm px-5 flex items-center justify-between py-2.5 bg-white h-[61px]">
      <h3 className="text-lg font-semibold">{name || "User"}</h3>
      <AuthSide />
    </div>
  );
}
