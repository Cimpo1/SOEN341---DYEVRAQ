import React, { useState, useEffect, useRef } from "react";
import { Message } from "./Message";
import MessageComponent from "./Message";

interface ChatProps {
  currentUserId: string;
  selectedUser: {
    id: string;
    name: string;
    picture: string;
  };
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "calc(100vh - 21vh)",
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
  header: {
    padding: "16px",
    borderBottom: "1px solid #3f3f3f",
    backgroundColor: "#2c2c2c",
  },
  headerText: {
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    scrollBehavior: "smooth" as const,
  },
  inputContainer: {
    padding: "16px",
    borderTop: "1px solid #3f3f3f",
    backgroundColor: "#2c2c2c",
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3f3f3f",
    color: "#ffffff",
    outline: "none",
  },
  sendButton: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4F46E5",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "500",
  },
};

const Chat: React.FC<ChatProps> = ({ currentUserId, selectedUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isNearBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const threshold = 150;
      return (
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold
      );
    }
    return false;
  };

  useEffect(() => {
    if (isNearBottom() && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Simulated initial messages for now
  useEffect(() => {
    // Here we put a database call
    const initialMessages: Message[] = [
      {
        id: "1",
        senderId: currentUserId,
        content: "Hey there!",
        timestamp: new Date(Date.now() - 100000),
      },
      {
        id: "2",
        senderId: selectedUser.id,
        content: "Hi! How are you?",
        timestamp: new Date(Date.now() - 50000),
      },
    ];
    setMessages(initialMessages);
  }, [currentUserId, selectedUser.id]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Chat with {selectedUser.name}</h2>
      </div>

      <div ref={containerRef} style={styles.messagesContainer}>
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
            senderName={
              message.senderId === currentUserId ? "You" : selectedUser.name
            }
            senderPicture={
              message.senderId === currentUserId
                ? undefined
                : selectedUser.picture
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          style={styles.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button style={styles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
