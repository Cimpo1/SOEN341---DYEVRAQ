"use client";

import React from "react";
import styles from "./ChatSidebar.module.css";
import UserIcon from "./UserIcon";

interface ChatSidebarProps {
  onUserSelect?: (userId: string) => void;
  session?: any;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onUserSelect, session }) => {
  const userPicture = session?.user?.picture;
  const userName = session?.user?.name || "User";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          <UserIcon imageUrl={userPicture} name={userName} />
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
