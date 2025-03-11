"use client";

import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import Welcome from "./Welcome";
import Chat from "./Chat";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Conversation {
  _id: string;
  users: User[];
  isGroup: boolean;
}

export interface User {
  id: string;
  url: string;
  username: string;
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
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (loggedInUserID) {
      axios
        .get(`/api/directMessage?userID=${loggedInUserID}`)
        .then((response) => {
          console.log("Response data:", response.data);

          // Process conversations to exclude the self-user from each user array
          const processedConversations = response.data.conversations.map(
            (conversation) => {
              return {
                ...conversation,
                users: conversation.users.filter(
                  (user) => user.id !== loggedInUserID
                ),
              };
            }
          );

          console.log("Processed Conversation Data:", processedConversations);

          // Extract all the GroupIDs into an array
          const groupIDs = processedConversations.map(
            (conversation) => conversation._id
          );

          console.log("Group IDs:", groupIDs);

          setConversations(processedConversations);
          setConversationIDs(groupIDs);
        })
        .catch((error) => console.error("Error fetching conversations", error));
    }
  }, [loggedInUserID]); // Fetch when user is logged in

  useEffect(() => {
    if (loggedInUserID) {
      axios
        .get(`/api/allUsers`)
        .then((response) => {
          console.log("Response data:", response.data);

          const processedUsers = response.data.data.filter(
            (user) => user.UserID !== loggedInUserID
          );

          console.log("All Users:", processedUsers);

          setAllUsers(processedUsers);
        })
        .catch((error) => console.error("Error fetching users", error));
    }
  }, [loggedInUserID]); // Fetch when user is logged in

  const handleUserSelect = (conversationId: string) => {
    const conversation = ConversationIDs.find((u) => u === conversationId);
    if (conversation) {
      setSelectedConversationId(conversationId);
      setSelectedConversation(conversation);
    }
  };

  return (
    <div style={styles.container}>
      <ChatSidebar
        onConversationSelect={handleUserSelect}
        session={session}
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        allUsers={AllUsers}
      />
      <div style={styles.chatArea}>
        {selectedConversation ? (
          <Chat
            currentUserId={loggedInUserID}
            conversation={conversations.find(
              (conv) => conv._id === selectedConversationId
            )}
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
