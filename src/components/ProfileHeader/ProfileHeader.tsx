
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
    <div className=" bg-white overflow-hidden shadow-sm rounded-md  mb-10 ">
      <div className=" flex justify-between my-6 items-center  rounded-t-md  p-5 ">
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
      <div className="flex items-center gap-6  justify-around border px-5 border-[#eea2f794] ">
        {stdTabs.map((e,i) => 
        (
         <Tabs key={i} path={e.path} text={e.text}/>
        ))}
      </div>
    </div>
  )
}
