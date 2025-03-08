"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChatSidebar.module.css";
import UserSection from "./UserSection";

interface User {
  id: string;
  picture: string;
  name: string;
}

interface ChatSidebarProps {
  onConversationSelect?: (conversationId: string) => void;
  session?: any;
  conversations: string[];
  selectedConversationId?: string | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onConversationSelect,
  session,
  conversations,
  selectedConversationId,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  let countId = 0;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          {conversations.map((conversationId,index) => (
            <UserSection
              key={index}
              conversationId={conversationId}
              isSelected={selectedConversationId === conversationId}
              onClick={() => onConversationSelect?.(conversationId)}
            />
          ))}
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
