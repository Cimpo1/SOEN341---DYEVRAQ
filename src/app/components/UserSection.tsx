import React from "react";
import styles from "./UserSection.module.css";
import UserIcon from "./UserIcon";
import { User } from "./HomeContent";

interface UserSectionProps {
  conversationId: string;
  users: User[];
  isSelected: boolean;
  onClick: () => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  conversationId,
  users,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`${styles.section} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {users.length > 1 ? (
        // Display conversation ID if there's more than one user (for group chats)
        <div>{conversationId}</div>
      ) : (
        // Display the UserIcon component for the single user in a two-person chat
        users.length === 1 && (
          <UserIcon
            imageUrl={users[0].url}
            size={40}
            name={users[0].username}
          />
        )
      )}
    </div>
  );
};

export default UserSection;
