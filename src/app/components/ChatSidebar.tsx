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

  const users = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `user-${index}`,
      picture: userPicture,
      name: userName,
    }));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userList}>
          {users.map((user) => (
            <div key={user.id} className={styles.userIcon}>
              <UserIcon imageUrl={user.picture} name={user.name} />
            </div>
          ))}
        </div>
        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
