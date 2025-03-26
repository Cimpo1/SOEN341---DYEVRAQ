import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ThinkingAnimation.css";
{/*I'm putting a disclaimer every time:
idk if we need those but just in case i dont wanna break smth
its easy to delete later anyway*/}

const stylesChat = {
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  channelSelect: {
    padding: "8px",
    backgroundColor: "#3f3f3f",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
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
  thinkingContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  thinkingAvatarContainer: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
  },
  thinkingMessageContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  thinkingSenderName: {
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  thinkingBubble: {
    backgroundColor: "#2c2c2c",
    padding: "16px 20px",
    borderRadius: "8px",
    maxWidth: "70%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minHeight: "40px",
    lineHeight: 1,
  },
};

export { stylesChat };