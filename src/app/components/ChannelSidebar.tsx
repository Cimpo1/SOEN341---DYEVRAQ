import React, { useState } from "react";
import { Channel } from "./HomeContent";
import axios from "axios";

interface ChannelSidebarProps {
  channels?: Channel[];
  selectedChannelId?: string | null;
  onChannelSelect?: (channelId: string) => void;
  isVisible: boolean;
  currentUserId: string;
  isAdmin: boolean;
  groupId: string;
  onChannelCreated?: () => void;
}

const styles = {
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
  createButton: {
    backgroundColor: "#4F46E5",
    color: "#ffffff",
  },
};

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels = [],
  selectedChannelId,
  onChannelSelect,
  isVisible,
  currentUserId,
  isAdmin,
  groupId,
  onChannelCreated,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  if (!isVisible) {
    return null;
  }

  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) return;

    try {
      const response = await axios.post("/api/channel", {
        groupId,
        channelName: newChannelName.trim(),
      });

      if (response.data.success) {
        setNewChannelName("");
        setShowCreateModal(false);
        const newChannel = response.data.channel;
        onChannelCreated?.();
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3>Channels</h3>
        {isAdmin && (
          <button
            style={styles.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            +
          </button>
        )}
      </div>
      <div style={styles.channelList}>
        {channels.map((channel) => (
          <div
            key={channel.id}
            style={{
              ...styles.channelItem,
              ...(selectedChannelId === channel.id
                ? styles.selectedChannel
                : {}),
            }}
            onClick={() => onChannelSelect?.(channel.id)}
          >
            <span style={styles.channelIcon}>#</span>
            {channel.name}
          </div>
        ))}
      </div>

      {showCreateModal && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setShowCreateModal(false)}
          />
          <div style={styles.modal}>
            <h3 style={{ color: "#ffffff", marginBottom: "16px" }}>
              Create New Channel
            </h3>
            <input
              type="text"
              placeholder="Enter channel name"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              style={styles.input}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateChannel();
                }
              }}
            />
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.cancelButton }}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, ...styles.createButton }}
                onClick={handleCreateChannel}
              >
                Create
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelSidebar;
