import React, { useState } from "react";
import axios from "axios";
{/* idk if we need those but just in case i dont wanna break, its easy to delete later anyway*/}


const stylesChannelSidebar = {
      sidebar: {
      width: "200px",
      backgroundColor: "#2c2c2c",
      borderRight: "1px solid #3f3f3f",
      display: "flex",
      flexDirection: "column" as const,
      height: "calc(100vh - 21vh)",
      transition: "width 0.3s ease",
    },
    hidden: {
      width: "0",
      overflow: "hidden",
    },
    header: {
      padding: "16px",
      borderBottom: "1px solid #3f3f3f",
      color: "#ffffff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    channelList: {
      padding: "8px",
      overflowY: "auto" as const,
    },
    channelItem: {
      padding: "8px 16px",
      color: "#9ca3af",
      cursor: "pointer",
      borderRadius: "4px",
      marginBottom: "4px",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    selectedChannel: {
      backgroundColor: "#4F46E5",
      color: "#ffffff",
    },
    channelIcon: {
      fontSize: "18px",
    },
    createButton: {
      padding: "4px 8px",
      backgroundColor: "#4F46E5",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    modal: {
      position: "fixed" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2c2c2c",
      padding: "20px",
      borderRadius: "8px",
      zIndex: 1000,
      width: "300px",
    },
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "16px",
      backgroundColor: "#3f3f3f",
      border: "1px solid #4F46E5",
      borderRadius: "4px",
      color: "#ffffff",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      justifyContent: "flex-end",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
    },
    cancelButton: {
      backgroundColor: "#3f3f3f",
      color: "#ffffff",
    },
  };

  export {stylesChannelSidebar};