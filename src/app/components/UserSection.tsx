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

const GroupIcon: React.FC<{ users: User[]; size: number }> = ({
  users,
  size,
}) => {
  const circleSize = size * 0.525;
  const offset = size * 0.2;

  const getDisplayMembers = (users: User[]) => {
    // For groups of size 3 (including logged-in user), return only first 2 members
    // For larger groups, return first 3 members
    const totalGroupSize = users.length + 1; // +1 for logged-in user
    return totalGroupSize === 3
      ? users.slice(0, 2).map((user) => user.username[0])
      : users.slice(0, 3).map((user) => user.username[0]);
  };

  const memberLetters = getDisplayMembers(users);
  const isSmallGroup = users.length + 1 === 3; // Including logged-in user

  const groupStyles = {
    container: {
      position: "relative" as const,
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    circle: {
      position: "absolute" as const,
      width: circleSize,
      height: circleSize,
      borderRadius: "50%",
      backgroundColor: "#4F46E5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: `${circleSize * 0.4}px`,
      fontWeight: "500",
    },
    // Styles for groups of 3 (two circles diagonally)
    smallGroup: {
      circle1: {
        top: "10%",
        left: "15%",
        zIndex: 2,
      },
      circle2: {
        bottom: "10%",
        right: "5%",
        zIndex: 1,
      },
    },
    // Styles for larger groups (triangle formation)
    largeGroup: {
      circle1: {
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      },
      circle2: {
        bottom: 0,
        left: 0,
      },
      circle3: {
        bottom: 0,
        right: 0,
      },
    },
  };

  if (isSmallGroup) {
    return (
      <div style={groupStyles.container}>
        <div
          style={{ ...groupStyles.circle, ...groupStyles.smallGroup.circle1 }}
        >
          {memberLetters[0]}
        </div>
        <div
          style={{ ...groupStyles.circle, ...groupStyles.smallGroup.circle2 }}
        >
          {memberLetters[1]}
        </div>
      </div>
    );
  }

  return (
    <div style={groupStyles.container}>
      <div style={{ ...groupStyles.circle, ...groupStyles.largeGroup.circle1 }}>
        {memberLetters[0]}
      </div>
      <div style={{ ...groupStyles.circle, ...groupStyles.largeGroup.circle2 }}>
        {memberLetters[1]}
      </div>
      <div style={{ ...groupStyles.circle, ...groupStyles.largeGroup.circle3 }}>
        {memberLetters[2]}
      </div>
    </div>
  );
};

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
        <GroupIcon users={users} size={40} />
      ) : (
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
