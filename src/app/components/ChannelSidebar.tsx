import React from "react";
import { Channel } from "./HomeContent";

interface ChannelSidebarProps {
  channels?: Channel[];
  selectedChannelId?: string | null;
  onChannelSelect?: (channelId: string) => void;
  isVisible: boolean;
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
};

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels = [],
  selectedChannelId,
  onChannelSelect,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3>Channels</h3>
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
    </div>
  );
};

export default ChannelSidebar;
