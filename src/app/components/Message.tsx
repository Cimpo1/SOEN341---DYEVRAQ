import React from "react";
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
}

const styles = {
  messageContainer: {
    display: "flex",
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: "16px",
    marginRight: "16px",
    gap: "8px",
    maxWidth: "70%",
  },
  own: {
    marginLeft: "auto",
    marginRight: "16px",
    flexDirection: "row-reverse" as const,
  },
  other: {
    marginRight: "auto",
    marginLeft: "16px",
  },
  avatarContainer: {
    display: "flex",
    alignSelf: "flex-end",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column" as const,
    maxWidth: "100%",
  },
  senderName: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    marginBottom: "2px",
    marginLeft: "8px",
  },
  messageBubble: {
    padding: "8px 12px",
    position: "relative" as const,
    wordWrap: "break-word" as const,
    whiteSpace: "pre-wrap" as const,
    minWidth: "80px",
    maxWidth: "500px",
    overflowWrap: "break-word" as const,
  },
  ownBubble: {
    backgroundColor: "#4F46E5",
    color: "white",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "4px",
  },
  otherBubble: {
    backgroundColor: "#3f3f3f",
    color: "white",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "16px",
  },
  timestamp: {
    fontSize: "0.7rem",
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: "8px",
    display: "inline-block",
    verticalAlign: "bottom",
  },
};

const Message: React.FC<MessageProps> = ({
  content,
  users,
  senderId,
  isOwnMessage,
  time,
}) => {
  const senderUser = users.find((user) => user.id === senderId);

  return (
    <div
      style={{
        ...styles.messageContainer,
        ...(isOwnMessage ? styles.own : styles.other),
      }}
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
          {/* MESSAGE CONTENT */}
          {content}
          <span style={styles.timestamp}>
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
