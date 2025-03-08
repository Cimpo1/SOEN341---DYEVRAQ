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
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [selectedConversation, setSelectedConversation] = useState<User | null>(
    null
  );

  const loggedInUserID = session.user.sub;
  const [conversations, setConversations] = useState([]);
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

  const handleConversationSelect = (conversationId: string) => {
    const conversation = ConversationIDs.find((c) => c === conversationId);
    if (conversation) {
      setSelectedConversationId(conversationId);
      setSelectedConversation(conversation);
    }
  };

  return (
    <div style={styles.container}>
      <ChatSidebar
        onConversationSelect={handleConversationSelect}
        conversations={ConversationIDs}
        selectedConversationId={selectedConversationId}
      />
      <div style={styles.chatArea}>
        {selectedConversation ? (
          <Chat
            currentUserId={loggedInUserID}
            selectedConversation={selectedConversationId}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
