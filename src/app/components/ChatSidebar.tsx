"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChatSidebar.module.css";
import UserSection from "./UserSection";

interface ChatSidebarProps {
  onUserSelect?: (userId: string) => void;
  session?: any;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onUserSelect, session }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userPicture = session?.user?.picture;
  const userName = session?.user?.name || "User";

  const users = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `user-${index}`,
      picture: userPicture,
      name: userName,
    }));

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    onUserSelect?.(userId);
  };

  if (!mounted) {
    return null; 
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          {users.map((user) => (
            <UserSection
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => handleUserClick(user.id)}
            />
          ))}
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
