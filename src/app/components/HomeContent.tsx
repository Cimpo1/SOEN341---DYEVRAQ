"use client";

import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import Welcome from "./Welcome";
import Chat from "./Chat";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

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
  const loggedInUserID = session.user.sub;
  //const { user, error, isLoading } = useUser();
  const [conversations, setConversations] = useState([]);
  // const [OtherUserIDs, setOtherUserIDs] = useState([]);
  const [ConversationIDs, setConversationIDs] = useState([]);

  useEffect(() => {
    if (loggedInUserID) {
      axios
        .get(`/api/directMessage?userID=${loggedInUserID}`)
        .then((response) => {
          console.log("Response data:", response.data);

          // Extract all the GroupIDs into an array
          const groupIDs = response.data.conversations.map(
            (conversation) => conversation._id
          );
          console.log("Group IDs:", groupIDs);

          // Still set the original conversations data for your component
          setConversations(response.data.conversations);

          // If you need to store the IDs in state as well
          setConversationIDs(groupIDs);
        })
        .catch((error) => console.error("Error fetching conversations", error));
    }
  }, [loggedInUserID]); // Fetch when user is logged in

  const users: User[] = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `user-${index}`,
      picture: session?.user?.picture || "",
      name: session?.user?.name || "User",
    }));

  const handleUserSelect = (userId: string) => {
    const user = ConversationIDs.find((u) => u === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUser(user);
    }
  };

  return (
    <div style={styles.container}>
      <ChatSidebar
        onUserSelect={handleUserSelect}
        users={ConversationIDs}
        selectedUserId={selectedUserId}
        session={session}
      />
      <div style={styles.chatArea}>
        {selectedUser ? (
          <Chat
            currentUserId={session.user.sub}
            selectedUser={selectedUserId}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
