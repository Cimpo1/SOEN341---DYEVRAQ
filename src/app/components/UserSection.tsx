import React from "react";
import styles from "./UserSection.module.css";
import UserIcon from "./UserIcon";

interface UserSectionProps {
  conversationId: string;
  isSelected: boolean;
  onClick: () => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  conversationId,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`${styles.section} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {/* <UserIcon imageUrl={user.picture} name={user.name} /> */}
      {conversationId}
    </div>
  );
};

export default UserSection;
