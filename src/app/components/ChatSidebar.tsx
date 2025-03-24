"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChatSidebar.module.css";
import UserSection from "./UserSection";
import { Conversation, Channel, UserStoredInDB } from "../interfaces/models";
import CreateConversation from "./CreateConversation";
import UserIcon from "./UserIcon";
import axios from "axios";

interface ChatSidebarProps {
  onConversationSelect?: (conversationId: string, channelId?: string) => void;
  session?: any; // eslint-disable-line
  directMessages: Conversation[];
  groupChats: Conversation[];
  selectedConversationId?: string | null;
  allUsers: UserStoredInDB[];
  onConversationCreated?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onConversationSelect,
  session,
  directMessages,
  groupChats,
  selectedConversationId,
  allUsers,
  onConversationCreated,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleGroupClick = (conversation: Conversation) => {
    if (conversation.channels && conversation.channels.length > 0) {
      onConversationSelect?.(conversation._id, conversation.channels[0].id);
    }
  };

  const handleAIChatClick = () => {
    // Check if AI chat already exists in directMessages
    const existingAIChat = directMessages.find((conv) =>
      conv.users.some((user) => user.id === "ai_chat_bot")
    );

    if (!existingAIChat) {
      // Create AI chat conversation in database
      const aiUser = {
        id: "ai_chat_bot",
        username: "AI Assistant",
        url: "https://ui-avatars.com/api/?name=AI&background=4F46E5&color=fff",
      };

      const loggedInUser = {
        id: session.user.sub,
        username: session.user.name || "User",
        url:
          session.user.picture ||
          "https://ui-avatars.com/api/?name=U&background=4F46E5&color=fff",
      };

      // Ensure we have all required fields and they're not undefined
      if (!loggedInUser.username || !loggedInUser.url) {
        console.error("Missing required user information");
        return;
      }

      axios
        .post("/api/directMessage", {
          users: [loggedInUser, aiUser],
        })
        .then(() => {
          if (onConversationCreated) {
            onConversationCreated(); // This will refresh the conversations list
          }
        })
        .catch((error) => {
          console.error("Error creating AI chat:", error);
          if (error.response?.data) {
            console.error("Server response:", error.response.data);
          }
        });
    }

    // Use the existing AI chat's ID if it exists, otherwise use our generated ID
    const chatId = existingAIChat
      ? existingAIChat._id
      : `aiChatBot_${session.user.sub}`;
    onConversationSelect?.(chatId);
  };

  // Filter out AI chat bot from direct messages
  const filteredDirectMessages = directMessages.filter(
    (conv) => !conv.users.some((user) => user.id === "ai_chat_bot")
  );

  // Check if AI chat is selected
  const aiChat = directMessages.find((conv) =>
    conv.users.some((user) => user.id === "ai_chat_bot")
  );
  const isAIChatSelected = aiChat && selectedConversationId === aiChat._id;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          <CreateConversation
            allUsers={allUsers}
            session={session}
            key="group-messages"
            buttonText="Create a group"
            isGroup={true}
            onConversationCreated={onConversationCreated}
          />
          <CreateConversation
            allUsers={allUsers}
            session={session}
            key="direct-messages"
            onConversationCreated={onConversationCreated}
          />
          <div className={styles.scrollableContent}>
            {filteredDirectMessages.map((conversation, index) => (
              <UserSection
                key={index}
                conversationId={conversation._id}
                users={conversation.users}
                isSelected={selectedConversationId === conversation._id}
                onClick={() => onConversationSelect?.(conversation._id)}
              />
            ))}
            {groupChats.map((conversation, index) => (
              <div key={index} className={styles.groupContainer}>
                <UserSection
                  conversationId={conversation._id}
                  users={conversation.users}
                  isSelected={selectedConversationId === conversation._id}
                  onClick={() => handleGroupClick(conversation)}
                />
              </div>
            ))}
          </div>
          <div className={styles.aiChatContainer}>
            <UserSection
              conversationId={aiChat?._id || `aiChatBot_${session.user.sub}`}
              users={[{ id: "ai_chat_bot", username: "🤖", url: "" }]}
              isSelected={isAIChatSelected}
              onClick={handleAIChatClick}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
