import React, { useState, useEffect, useRef } from "react";
import { Message } from "../interfaces/models";
import MessageComponent from "./Message";
import axios from "axios";
import { Conversation } from "../interfaces/models";
import UserIcon from "./UserIcon";
import "./ThinkingAnimation.css";
import { stylesChat } from "../stylesComponents/stylesChat";

interface ChatProps {
  currentUserId: string;
  conversation: Conversation;
  selectedConversation: string;
  selectedChannelId?: string | null;
  onChannelSelect?: (value: string) => void;
}

const ThinkingAnimation: React.FC = () => {
  return (
    <div style={stylesChat.thinkingContainer}>
      <div style={stylesChat.thinkingAvatarContainer}>
        <UserIcon imageUrl="" name="🤖" size={32} />
      </div>
      <div style={stylesChat.thinkingMessageContent}>
        <div style={stylesChat.thinkingSenderName}>AI Assistant</div>
        <div style={stylesChat.thinkingBubble}>
          <div className="thinking-dot thinking-dot-1" />
          <div className="thinking-dot thinking-dot-2" />
          <div className="thinking-dot thinking-dot-3" />
        </div>
      </div>
    </div>
  );
};

const Chat: React.FC<ChatProps> = ({
  currentUserId,
  conversation,
  selectedConversation,
  selectedChannelId,
  onChannelSelect,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessageLengthRef = useRef(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const isAdmin =
    conversation.admins?.some((admin) => admin.id === currentUserId) ?? false;

  useEffect(() => {
    let intervalId = null;

    const fetchMessages = () => {
      if (selectedConversation) {
        const url = conversation?.isGroup
          ? `/api/message?GroupID=${selectedConversation}&channelId=${selectedChannelId}`
          : `/api/message?GroupID=${selectedConversation}`;

        axios
          .get(url)
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
  }, [selectedConversation, selectedChannelId]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = scrollHeight - scrollTop <= clientHeight + 150;

      if (isBottom) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false);
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

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const sendMessage = async (
        groupID: string,
        messageText: string,
        senderID: string
      ) => {
        try {
          const payload = conversation?.isGroup
            ? {
                GroupID: groupID,
                message: messageText,
                sender: senderID,
                channelId: selectedChannelId,
              }
            : {
                GroupID: groupID,
                message: messageText,
                sender: senderID,
              };

          const response = await axios.post("/api/message", payload);
          console.log("Message sent successfully:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error sending message:", error);
          throw error;
        }
      };

      try {
        const data = await sendMessage(
          selectedConversation,
          newMessage.trim(),
          currentUserId
        );
        if (data.success) {
          // Create message object with current user's information
          const newMessageObj = {
            id: Date.now(),
            message: newMessage.trim(),
            sender: currentUserId,
            time: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, newMessageObj]);
          setNewMessage("");

          // Check if this is an AI chat conversation
          const isAIChat = conversation.users.some(
            (user) => user.id === "ai_chat_bot"
          );
          if (isAIChat) {
            setIsThinking(true);
            // Wait for 1 second before sending AI response
            setTimeout(async () => {
              try {
                // Get the conversation history
                const conversationHistory = messages
                  .map(
                    (msg) =>
                      `${
                        msg.sender === currentUserId ? "User" : "Assistant"
                      }: ${msg.message}`
                  )
                  .join("\n");

                // Add the current message to the history
                const fullHistory = `${conversationHistory}\nUser: ${newMessage.trim()}`;

                // Call the AI endpoint
                const aiResponse = await axios.post("/api/AIChatBot", {
                  question: fullHistory,
                });

                if (aiResponse.data.response) {
                  const aiMessage = {
                    id: Date.now() + 1,
                    message: aiResponse.data.response,
                    sender: "ai_chat_bot",
                    time: new Date(),
                  };

                  // Send AI response to the database
                  await sendMessage(
                    selectedConversation,
                    aiMessage.message,
                    aiMessage.sender
                  );
                  setMessages((prevMessages) => [...prevMessages, aiMessage]);
                }
              } catch (error) {
                console.error("Error getting AI response:", error);
                // Fallback error message
                const errorMessage = {
                  id: Date.now() + 1,
                  message:
                    "I apologize, but I'm having trouble processing your request right now. Please try again later.",
                  sender: "ai_chat_bot",
                  time: new Date(),
                };
                await sendMessage(
                  selectedConversation,
                  errorMessage.message,
                  errorMessage.sender
                );
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
              } finally {
                setIsThinking(false);
              }
            }, 1000);
          }
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      const response = await axios.delete(
        `/api/message?groupId=${selectedConversation}&channelId=${selectedChannelId}&messageId=${messageId}&requesterId=${currentUserId}`
      );

      if (response.data.success) {
        // Update the messages list locally
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div style={stylesChat.container}>
      <div style={stylesChat.header}>
        <h2 style={stylesChat.headerText}>
          Chat with {conversation.users.map((user) => user.username).join(", ")}
        </h2>
      </div>

      <div ref={containerRef} style={stylesChat.messagesContainer}>
        {messages.map((msgObj, index) => (
          <MessageComponent
            key={index}
            content={msgObj.message}
            users={conversation.users}
            senderId={msgObj.sender}
            isOwnMessage={msgObj.sender === currentUserId}
            time={msgObj.time}
            isAdmin={isAdmin && conversation.isGroup}
            onDelete={() => handleDeleteMessage(msgObj.id)}
            messageId={msgObj.id}
          />
        ))}
        {isThinking && <ThinkingAnimation />}
        <div ref={messagesEndRef} />
      </div>

      <div style={stylesChat.inputContainer}>
        <input
          type="text"
          style={stylesChat.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button style={stylesChat.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
