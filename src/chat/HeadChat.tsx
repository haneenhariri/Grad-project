import { FaEllipsisV } from "react-icons/fa";

export interface HeadChatProps {
  image: string;
  name: string;
}

export default function HeadChat({ image, name }: HeadChatProps) {
  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-white"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">
                {getUserInitials(name)}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200">
          <FaEllipsisV className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
