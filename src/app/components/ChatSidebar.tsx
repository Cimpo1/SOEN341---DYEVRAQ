import React from "react";
import styles from "./ChatSidebar.module.css";

interface ChatSidebarProps {
  onUserSelect?: (userId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onUserSelect }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>

        <div className={styles.userList}></div>

        <div className={styles.settings}></div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
