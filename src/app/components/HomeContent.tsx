"use client";

import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import Welcome from "./Welcome";
import Chat from "./Chat";

interface User {
  id: string;
  picture: string;
  name: string;
}

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 21vh)",
    backgroundColor: "#1a1a1a",
    width: "100%",
  },
  chatArea: {
    flex: 1,
    display: "flex",
    width: "calc(100% - 80px)",
  },
};

const HomeContent: React.FC<{ session: any }> = ({ session }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Generate sample users for now which should eventually come from your backend :(
  const users: User[] = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `user-${index}`,
      picture: session?.user?.picture || "",
      name: session?.user?.name || "User",
    }));

  const handleUserSelect = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUser(user);
    }
  };

  return (
    <div style={styles.container}>
      <ChatSidebar
        onUserSelect={handleUserSelect}
        users={users}
        selectedUserId={selectedUserId}
        session={session}
      />
      <div style={styles.chatArea}>
        {selectedUser ? (
          <Chat currentUserId={session.user.sub} selectedUser={selectedUser} />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
