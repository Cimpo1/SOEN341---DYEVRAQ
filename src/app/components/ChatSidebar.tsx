"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChatSidebar.module.css";
import UserSection from "./UserSection";
import { Conversation, Channel } from "./HomeContent";
import CreateConversation from "./CreateConversation";

export interface UserStoredInDB {
  UserID: string;
  Email: string;
  UserName: string;
  PictureURL: string;
  Nickname: string;
}

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
            {directMessages.map((conversation, index) => (
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
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
