import Message from "../components/Message/Message";
import SidebarChat from "./SidebarChat";

export default function ChatApp() {
  return (
    <div className=" flex justify-between w-full">
      <SidebarChat/>
       <Message/>
    </div>
  )
}
