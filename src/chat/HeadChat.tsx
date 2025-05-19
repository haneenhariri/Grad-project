import { FaEllipsisV } from "react-icons/fa";

export interface HeadChatProps {
    image: string;
    name: string;
}

export default function HeadChat({image , name } : HeadChatProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className=" flex items-center gap-5">
      {image? (
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-semibold">
            {name?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
          <div>
              <h3 className="font-semibold">{name}</h3>
          </div>
      </div>
        <button className="text-gray-500 hover:text-gray-700">
          <FaEllipsisV/>
        </button>
    </div>
  ) 
}
