"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChatSidebar.module.css";
import UserSection from "./UserSection";
import { Conversation } from "./HomeContent";
import CreateConversation from "./CreateConversation";

export interface UserStoredInDB {
  UserID: string;
  Email: string;
  UserName: string;
  PictureURL: string;
  Nickname: string;
}

interface ChatSidebarProps {
  onConversationSelect?: (conversationId: string) => void;
  session?: any; // eslint-disable-line
  conversations: Conversation[];
  selectedConversationId?: string | null;
  allUsers: UserStoredInDB[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onConversationSelect,
  session,
  conversations,
  selectedConversationId,
  allUsers,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          <CreateConversation
            allUsers={allUsers}
            session={session}
            key="direct-messages"
          />
          <div className={styles.scrollableContent}>
            {conversations.map((conversation, index) => (
              <UserSection
                key={index}
                conversationId={conversation._id}
                users={conversation.users}
                isSelected={selectedConversationId === conversation._id}
                onClick={() => onConversationSelect?.(conversation._id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.groupList}>
          <div className={styles.scrollableGroupContent}></div>
          <div className={styles.groupCreateButton}>
            <CreateConversation
              allUsers={allUsers}
              session={session}
              key="group-messages"
              buttonText="Create a group"
              isGroup={true}
            />
          </div>
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
