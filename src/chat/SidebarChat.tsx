import { useEffect, useState } from "react";
import { gitUserSide } from "../services/message";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imageUser from "../assets-webp/Users (1).webp";
import { getSecureCookie } from "../utils/cookiesHelper";

export interface SidebarChatProps {
  id: number;
  user_id: number;
  last_message: string;
  last_message_time?: string;
  updated_at?: string;
  created_at?: string;
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
        console.log("Sidebar chat data:", myTeacher); // للتشخيص
        setTeacher(myTeacher);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    gitTeacher();
  }, []);

  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to format time
  const formatLastMessageTime = (timestamp?: string) => {
    if (!timestamp) return "";

    const messageDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // إذا كان أقل من دقيقة
    if (diffInMinutes < 1) {
      return "now";
    }
    // إذا كان أقل من ساعة
    else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }
    // إذا كان أقل من 24 ساعة
    else if (diffInHours < 24) {
      return `${diffInHours}h`;
    }
    // إذا كان أقل من 7 أيام
    else if (diffInDays < 7) {
      return `${diffInDays}d`;
    }
    // إذا كان أكثر من أسبوع، اعرض التاريخ
    else {
      return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="bg-white w-full sm:w-1/3 border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-semibold text-gray-800">{t("Message")}</h2>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      {/* Chat List */}
      <div className="flex overflow-x-auto sm:block sm:overflow-visible">
        {teacher?.map((t, i) => (
          <NavLink
            to={getMessagePath(t.id)}
            key={i}
            className={`group relative px-4 sm:px-6 py-4 min-w-[280px] sm:min-w-0 sm:w-full flex items-center gap-3 transition-all duration-200 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
              t.id === selectedId
                ? "bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-l-purple-400 shadow-sm"
                : "hover:shadow-sm"
            }`}
          >
            {/* Avatar Container */}
            <div className="relative flex-shrink-0">
              {!t.user.profile_picture ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">
                    {getUserInitials(t.user.name)}
                  </span>
                </div>
              ) : (
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-white"
                  src={`http://127.0.0.1:8000/storage/${t.user.profile_picture}`}
                  alt={t.user.name}
                />
              )}
            </div>

            {/* Chat Info */}
            <div className="hidden sm:flex flex-col justify-center flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate text-sm">
                  {t.user.name}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {formatLastMessageTime(
                    t.last_message_time || t.updated_at || t.created_at
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate flex-1">
                  {t.last_message || "No messages yet"}
                </p>
                {/* Unread Badge - You can add logic to show actual unread count */}
                {t.id !== selectedId && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full ml-2 flex-shrink-0"></div>
                )}
              </div>
            </div>

            {/* Mobile Name Display */}
            <div className="sm:hidden flex flex-col items-center mt-2">
              <span className="text-xs font-medium text-gray-700 text-center truncate max-w-[60px]">
                {t.user.name.split(" ")[0]}
              </span>
            </div>

            {/* Hover Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                t.id === selectedId ? "opacity-100" : ""
              }`}
            ></div>
          </NavLink>
        ))}
      </div>

      {/* Empty State */}
      {teacher.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-center text-sm">
            {t("No conversations yet")}
          </p>
        </div>
      )}
    </div>
  );
}
