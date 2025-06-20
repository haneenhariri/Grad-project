
import Tabs from "../Tabs/Tabs";
import { stdTabs } from "../../data/tabsData";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProfile } from "../../redux/profileSlice/profileSlice";
export default function ProfileHeader() {
  const dispatch = useAppDispatch();
  const { name, profile_picture } = useAppSelector((state) => state.profile);
   useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return (
    <div className=" bg-white overflow-hidden shadow-sm rounded-md  md:mb-10 mb-5 ">
      <div className=" flex justify-between md:my-6 my-3 items-center  rounded-t-md  md:p-5 p-3 ">
        <div className="flex gap-5 items-center">
        <div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-950 text-white text-lg overflow-hidden">
                    {profile_picture ? (
              <img
                src={`http://127.0.0.1:8000/storage/${profile_picture}`}
                alt="Profile"
                className="w-12 h-12 object-cover"
              />
            ) : (
              <span>{name.charAt(0)}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
      </div>
      {/* tabs */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex justify-between min-w-max gap-3 sm:gap-6 px-4 py-2 border-t border-[#eea2f794]">
          {stdTabs.map((e, i) => (
            <Tabs key={i} path={e.path} text={e.text} />
          ))}
        </div>
      </div>
    </div>
  )
}
