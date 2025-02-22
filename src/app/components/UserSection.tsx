import React from "react";
import styles from "./UserSection.module.css";
import UserIcon from "./UserIcon";

interface UserSectionProps {
  user: {
    id: string;
    picture?: string;
    name: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  user,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`${styles.section} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <UserIcon imageUrl={user.picture} name={user.name} />
    </div>
  );
};

export default UserSection;
