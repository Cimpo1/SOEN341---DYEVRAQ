import React from "react";
import styles from "./UserSection.module.css";
import UserIcon from "./UserIcon";

interface UserSectionProps {
  user: string;
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
      {/* <UserIcon imageUrl={user.picture} name={user.name} /> */}
      {user}
    </div>
  );
};

export default UserSection;
