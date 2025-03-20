import React, { useState, useEffect, useRef } from "react";
import { Message } from "./Message";
import MessageComponent from "./Message";
import axios from "axios";
import { Conversation } from "./HomeContent";

interface ChatProps {
  currentUserId: string;
  conversation: Conversation;
  selectedConversation: string;
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

const Chat: React.FC<ChatProps> = ({
  currentUserId,
  conversation,
  selectedConversation,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessageLengthRef = useRef(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    let intervalId = null;

    const fetchMessages = () => {
      if (selectedConversation) {
        axios
          .get(`/api/message?GroupID=${selectedConversation}`)
          .then((response) => {
            if (!response.data.success) {
              setMessages([]);
              previousMessageLengthRef.current = 0;
              return;
            }

            const newMessages = response.data.sortedMessages || [];
            if (newMessages.length !== previousMessageLengthRef.current) {
              setMessages(newMessages);
              previousMessageLengthRef.current = newMessages.length;
            }
          })
          .catch((error) => {
            console.error("Error fetching messages", error);
            setMessages([]);
            previousMessageLengthRef.current = 0;
          });
      }
    };

    setMessages([]);
    previousMessageLengthRef.current = 0;
    fetchMessages();

    intervalId = setInterval(fetchMessages, 500);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedConversation]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = scrollHeight - scrollTop <= clientHeight + 150;

      if (isBottom) {
        setAutoScroll(true); // Enable auto-scroll if user is at the bottom
      } else {
        setAutoScroll(false); // Disable auto-scroll if user scrolls up
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage.trim(),
      };

      const sendMessage = async (groupID, messageText, senderID) => {
        try {
          const response = await axios.post("/api/message", {
            GroupID: groupID,
            message: messageText,
            sender: senderID,
          });

          console.log("Message sent successfully:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error sending message:", error);
          throw error;
        }
      };

      sendMessage(selectedConversation, newMsg.content, currentUserId)
        .then((data) => {
          // Handle successful message sending
          console.log("Message status:", data.success);
        })
        .catch((error) => {
          // Handle errors
          console.error("Failed to send message:", error);
        });

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
        <h2 style={styles.headerText}>
          Chat with {conversation.users.map((user) => user.username).join(", ")}
        </h2>
      </div>

      <div ref={containerRef} style={styles.messagesContainer}>
        {messages.map((msgObj, index) => (
          <MessageComponent
            key={index}
            content={msgObj.message}
            users={conversation.users}
            senderId={msgObj.sender}
            isOwnMessage={msgObj.sender === currentUserId}
            time={msgObj.time}
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
