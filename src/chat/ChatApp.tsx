import MessageSide from "./MessageSide";
import SidebarChat from "./SidebarChat";

export default function ChatApp() {
  return (
    <div className=" flex justify-between gap-6 w-full">
      <SidebarChat/>
      <MessageSide/>
    </div>
  )
}
