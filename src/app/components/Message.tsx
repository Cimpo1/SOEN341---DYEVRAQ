import React from "react";
import UserIcon from "./UserIcon";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface MessageProps {
  message: Message;
  isOwnMessage: boolean;
  senderName: string;
  senderPicture?: string;
}

const styles = {
  messageContainer: {
    display: "flex",
    margin: "8px 16px",
    gap: "8px",
    maxWidth: "70%",
  },
  own: {
    marginLeft: "auto",
    flexDirection: "row-reverse" as const,
  },
  other: {
    marginRight: "auto",
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
    borderRadius: "16px",
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
    borderBottomRightRadius: "4px",
  },
  otherBubble: {
    backgroundColor: "#3f3f3f",
    color: "white",
    borderBottomLeftRadius: "4px",
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
  message,
  isOwnMessage,
  senderName,
  senderPicture,
}) => {
  return (
    <div
      style={{
        ...styles.messageContainer,
        ...(isOwnMessage ? styles.own : styles.other),
      }}
    >
      {!isOwnMessage && (
        <div style={styles.avatarContainer}>
          <UserIcon imageUrl={senderPicture} name={senderName} size={32} />
        </div>
      )}
      <div style={styles.messageContent}>
        {!isOwnMessage && <div style={styles.senderName}>{senderName}</div>}
        <div
          style={{
            ...styles.messageBubble,
            ...(isOwnMessage ? styles.ownBubble : styles.otherBubble),
          }}
        >
          {message.content}
          <span style={styles.timestamp}>
            {new Date(message.timestamp).toLocaleTimeString([], {
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
