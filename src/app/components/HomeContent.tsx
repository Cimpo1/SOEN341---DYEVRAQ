"use client";

import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import Welcome from "./Welcome";
import Chat from "./Chat";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  url: string;
}

export interface Channel {
  id: string;
  name: string;
  messages: Array<{
    id: number;
    message: string;
    time: Date;
    sender: string;
  }>;
}

export interface Conversation {
  _id: string;
  users: User[];
  admins: User[];
  isGroup: boolean;
  channels?: Channel[];
  messages?: Array<{
    id: number;
    message: string;
    time: Date;
    sender: string;
  }>;
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
// eslint-disable-next-line
const HomeContent: React.FC<{ session: any }> = ({ session }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const loggedInUserID = session.user.sub;
  const [directMessages, setDirectMessages] = useState<Conversation[]>([]);
  const [groupChats, setGroupChats] = useState<Conversation[]>([]);
  const [ConversationIDs, setConversationIDs] = useState<string[]>([]);
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (loggedInUserID) {
      // Fetch direct messages
      axios
        .get(`/api/directMessage?userID=${loggedInUserID}`)
        .then((response) => {
          const processedDirectMessages = response.data.conversations.map(
            (conversation) => {
              return {
                ...conversation,
                users: conversation.users.filter(
                  (user) => user.id !== loggedInUserID
                ),
              };
            }
          );

          setDirectMessages(processedDirectMessages);
        })
        .catch((error) =>
          console.error("Error fetching direct messages", error)
        );

      // Fetch group messages
      axios
        .get(`/api/groupMessage?userID=${loggedInUserID}`)
        .then((response) => {
          const processedGroupMessages = response.data.conversations.map(
            (conversation) => {
              return {
                ...conversation,
                users: conversation.users.filter(
                  (user) => user.id !== loggedInUserID
                ),
              };
            }
          );

          setGroupChats(processedGroupMessages);
        })
        .catch((error) =>
          console.error("Error fetching group messages", error)
        );
    }
  }, [loggedInUserID]);

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

  const handleConversationSelect = (
    conversationId: string,
    channelId?: string
  ) => {
    const conversation = [...directMessages, ...groupChats].find(
      (conv) => conv._id === conversationId
    );

    if (conversation) {
      setSelectedConversationId(conversationId);
      setSelectedConversation(conversation);
      setSelectedChannelId(channelId || null);
    }
  };

  const refreshConversations = () => {
    if (loggedInUserID) {
      // Refresh direct messages
      axios
        .get(`/api/directMessage?userID=${loggedInUserID}`)
        .then((response) => {
          const processedDirectMessages = response.data.conversations.map(
            (conversation) => {
              return {
                ...conversation,
                users: conversation.users.filter(
                  (user) => user.id !== loggedInUserID
                ),
              };
            }
          );

          setDirectMessages(processedDirectMessages);
        })
        .catch((error) =>
          console.error("Error fetching direct messages", error)
        );

      // Refresh group messages
      axios
        .get(`/api/groupMessage?userID=${loggedInUserID}`)
        .then((response) => {
          const processedGroupMessages = response.data.conversations.map(
            (conversation) => {
              return {
                ...conversation,
                users: conversation.users.filter(
                  (user) => user.id !== loggedInUserID
                ),
              };
            }
          );

          setGroupChats(processedGroupMessages);
        })
        .catch((error) =>
          console.error("Error fetching group messages", error)
        );
    }
  };

  return (
    <div style={styles.container}>
      <ChatSidebar
        onConversationSelect={handleConversationSelect}
        session={session}
        directMessages={directMessages}
        groupChats={groupChats}
        selectedConversationId={selectedConversationId}
        allUsers={AllUsers}
        onConversationCreated={refreshConversations}
      />
      <div style={styles.chatArea}>
        {selectedConversation ? (
          <Chat
            currentUserId={loggedInUserID}
            conversation={selectedConversation}
            selectedConversation={selectedConversationId}
            selectedChannelId={selectedChannelId}
            onChannelSelect={(channelId) => setSelectedChannelId(channelId)}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
