import MessageSide from "./MessageSide";
import SidebarChat from "./SidebarChat";
import { ChatProvider } from "./ChatContext";

export default function ChatApp() {
  return (
    <ChatProvider>
      <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
        <SidebarChat />
        <MessageSide />
      </div>
    </ChatProvider>
  );
}
