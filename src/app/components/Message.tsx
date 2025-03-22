import React, { useState } from "react";
import UserIcon from "./UserIcon";
import { User } from "./HomeContent";

export interface Message {
  id: string;
  senderId: string;
  content: string;
}

interface MessageProps {
  content: string;
  users: User[];
  senderId: string;
  isOwnMessage: boolean;
  time: Date;
  isAdmin?: boolean;
  onDelete?: () => void;
  messageId: number;
}

const styles = {
  messageContainer: {
    display: "flex",
    marginBottom: "16px",
    position: "relative" as const,
  },
  own: {
    flexDirection: "row-reverse" as const,
  },
  other: {
    flexDirection: "row" as const,
  },
  avatarContainer: {
    marginRight: "8px",
  },
  messageContent: {
    maxWidth: "70%",
  },
  senderName: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginBottom: "4px",
  },
  messageBubble: {
    padding: "8px 12px",
    position: "relative" as const,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  ownBubble: {
    backgroundColor: "#4F46E5",
    color: "white",
    marginLeft: "auto",
    borderTopRightRadius: "4px",
  },
  otherBubble: {
    backgroundColor: "#3f3f3f",
    color: "white",
    borderTopLeftRadius: "4px",
  },
  timestamp: {
    fontSize: "0.7rem",
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: "8px",
    verticalAlign: "bottom",
  },
  deleteButton: {
    position: "absolute" as const,
    top: "-10px",
    right: isOwnMessage => isOwnMessage ? "auto" : "-10px",
    left: isOwnMessage => isOwnMessage ? "-10px" : "auto",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s ease",
    fontSize: "14px",
    padding: 0,
    "&:hover": {
      backgroundColor: "#ef4444",
    },
  },
  messageHover: {
    "&:hover": {
      "& $deleteButton": {
        opacity: 1,
      },
    },
  },
};

const Message: React.FC<MessageProps> = ({
  content,
  users,
  senderId,
  isOwnMessage,
  time,
  isAdmin,
  onDelete,
  messageId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const senderUser = users.find((user) => user.id === senderId);

  return (
    <div
      style={{
        ...styles.messageContainer,
        ...(isOwnMessage ? styles.own : styles.other),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isOwnMessage && (
        <div style={styles.avatarContainer}>
          <UserIcon
            imageUrl={senderUser ? senderUser.url : ""}
            name={senderUser ? senderUser.username : "Not found"}
            size={32}
          />
        </div>
      )}
      <div style={styles.messageContent}>
        {!isOwnMessage && (
          <div style={styles.senderName}>
            {senderUser ? senderUser.username : "Not found"}
          </div>
        )}
        <div
          style={{
            ...styles.messageBubble,
            ...(isOwnMessage ? styles.ownBubble : styles.otherBubble),
          }}
        >
          {content}
          <span style={styles.timestamp}>
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isAdmin && isHovered && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              style={{
                ...styles.deleteButton,
                ...(isOwnMessage ? { left: "-10px" } : { right: "-10px" }),
                opacity: 1,
              }}
              title="Delete message"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
