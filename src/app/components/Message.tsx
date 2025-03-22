import React, { useState } from "react";
import UserIcon from "./UserIcon";
import { User } from "./HomeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    backgroundColor: "#FF1E1E",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: 0,
    boxShadow:
      "0 0 10px rgba(255, 30, 30, 0.5), 0 0 20px rgba(255, 30, 30, 0.3)",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#FF0000",
      boxShadow: "0 0 15px rgba(255, 0, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.4)",
      color: "rgba(255, 255, 255, 0.95)",
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
                right: isOwnMessage ? "auto" : "-10px",
                left: isOwnMessage ? "-10px" : "auto",
                opacity: 1,
              }}
              title="Delete message"
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="sm"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
                }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
