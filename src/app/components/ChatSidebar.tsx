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
  onUserSelect?: (userId: string) => void;
  session?: any;
  users: User[];
  selectedUserId: string | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onUserSelect,
  session,
  users,
  selectedUserId,
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
          {users.map((user) => (
            <UserSection
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => onUserSelect?.(user.id)}
            />
          ))}
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
