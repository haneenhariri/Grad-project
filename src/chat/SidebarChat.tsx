import { useEffect, useState } from "react";
import { gitUserSide } from "../services/message";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imageUser from "../assets/Users (1).png";
import { getSecureCookie } from "../utils/cookiesHelper";

export interface SidebarChatProps {
    id: number;
    user_id: number;
    last_message: string;
    user: {
        id: number;
        name: string;
        profile_picture: string;
    };
    }

    export default function SidebarChat() {
    const { t } = useTranslation();
    const [teacher, setTeacher] = useState<SidebarChatProps[]>([]);
    const { user_id } = useParams();
    const selectedId = user_id ? parseInt(user_id) : null;
    const userRole = getSecureCookie("role");

    // تحديد المسار المناسب بناءً على دور المستخدم
    const getMessagePath = (userId: number) => {
        if (userRole === "instructor") {
        return `/instruct/Message/${userId}`;
        } else {
        return `/User/Message/${userId}`;
        }
    };

    useEffect(() => {
        const gitTeacher = async () => {
        try {
            const myTeacher = await gitUserSide();
            setTeacher(myTeacher);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        };
        gitTeacher();
    }, []);
    return (
        <div className=" border border-[#f1cff594] bg-white w-full sm:w-1/3">
            <div className="flex justify-between items-center p-5">
                <h2>{t("Message")}</h2>
            </div>
            <div className="flex overflow-x-auto sm:block">
                {teacher?.map((t, i) => (
                    <NavLink
                    to={getMessagePath(t.id)}
                    key={i}
                    className={`px-3 sm:px-6 py-3 h-[72px] sm:w-full flex flex-col sm:flex-row justify-between gap-4 items-center ${
                        t.id === selectedId ? "bg-[#f2b3fa94]" : ""
                    }`}
                    >
                    {!t.user.profile_picture ? (
                        <img
                        className=" min-w-12 min-h-12  rounded-full bg-violet-950 object-cover"
                        src={imageUser}
                        alt={t.user.name}
                        />
                    ) : (
                        <img
                        className=" h-12 w-12 rounded-full  object-cover"
                        src={`http://127.0.0.1:8000/storage/${t.user.profile_picture}`}
                        alt={t.user.name}
                        />
                    )}
                    <div className=" hidden sm:flex flex-col justify-between gap-2 w-full ">
                        <h2 className="text-base font-semibold">{t.user.name}</h2>
                        <p className="  line-clamp-1  text-sm text-gray-500">
                        {t.last_message}
                        </p>
                    </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
