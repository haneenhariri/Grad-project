import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { SidebarChatProps } from "./SidebarChat";

interface ChatContextType {
  conversations: SidebarChatProps[];
  setConversations: (conversations: SidebarChatProps[]) => void;
  updateConversationLastMessage: (
    userId: number,
    lastMessage: string,
    timestamp: string
  ) => void;
  refreshConversations: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<SidebarChatProps[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const updateConversationLastMessage = useCallback(
    (userId: number, lastMessage: string, timestamp: string) => {
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) => {
          if (conversation.id === userId) {
            return {
              ...conversation,
              last_message: lastMessage,
              updated_at: timestamp,
              last_message_time: timestamp,
              last_message_at: timestamp,
            };
          }
          return conversation;
        });

        // Sort conversations by timestamp (most recent first)
        return updatedConversations.sort((a, b) => {
          const timeA =
            a.last_message_time || a.updated_at || a.created_at || "";
          const timeB =
            b.last_message_time || b.updated_at || b.created_at || "";
          return new Date(timeB).getTime() - new Date(timeA).getTime();
        });
      });
    },
    []
  );

  const refreshConversations = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const value: ChatContextType = {
    conversations,
    setConversations,
    updateConversationLastMessage,
    refreshConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

// Hook to get refresh trigger for components that need to refetch data
export const useChatRefresh = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatRefresh must be used within a ChatProvider");
  }
  return context.refreshConversations;
};
