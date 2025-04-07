import React, { useState } from "react";
import { Channel } from "../interfaces/models";
import axios from "axios";
import { stylesChannelSidebar } from "../stylesComponents/stylesChannelSidebar";

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
    <div style={stylesChannelSidebar.sidebar}>
      <div style={stylesChannelSidebar.header}>
        <h3>Channels</h3>
        {isAdmin && (
          <button
            style={stylesChannelSidebar.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            +
          </button>
        )}
      </div>
      <div style={stylesChannelSidebar.channelList}>
        {channels.map((channel) => (
          <div
            key={channel.id}
            style={{
              ...stylesChannelSidebar.channelItem,
              ...(selectedChannelId === channel.id
                ? stylesChannelSidebar.selectedChannel
                : {}),
            }}
            onClick={() => onChannelSelect?.(channel.id)}
          >
            <span style={stylesChannelSidebar.channelIcon}>#</span>
            {channel.name}
          </div>
        ))}
      </div>

      {showCreateModal && (
        <>
          <div
            style={stylesChannelSidebar.overlay}
            onClick={() => setShowCreateModal(false)}
          />
          <div style={stylesChannelSidebar.modal}>
            <h3 style={{ color: "#ffffff", marginBottom: "16px" }}>
              Create New Channel
            </h3>
            <input
              type="text"
              placeholder="Enter channel name"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              style={stylesChannelSidebar.input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateChannel();
                }
              }}
            />
            <div style={stylesChannelSidebar.buttonGroup}>
              <button
                style={{ ...stylesChannelSidebar.button, ...stylesChannelSidebar.cancelButton }}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...stylesChannelSidebar.button, ...stylesChannelSidebar.createButton }}
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
