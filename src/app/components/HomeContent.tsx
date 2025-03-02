"use client";

import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import Welcome from "./Welcome";

interface User {
  id: string;
  picture: string;
  name: string;
}

const HomeContent = ({ session }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Generate sample users for now which should eventually come from your backend :(
  const users: User[] = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `user-${index}`,
      picture: session?.user?.picture || "",
      name: session?.user?.name || "User",
    }));

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 21vh)" }}>
      <ChatSidebar
        session={session}
        onUserSelect={handleUserSelect}
        users={users}
        selectedUserId={selectedUserId}
      />
      <div style={{ flex: 1, display: "flex" }}>
        {selectedUserId ? (
          <div>
            {/* Gonig to put chat content here */}
            <h2>Chat with user {selectedUserId}</h2>
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
