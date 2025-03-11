import React, { useState, useEffect } from "react";
import "./CreateConversation.css";
import { UserStoredInDB } from "./ChatSidebar";
import axios from "axios";
import { User } from "./HomeContent";

interface CreateConversationProps {
  allUsers: any;
  session: any;
}

const NewConversation: React.FC<CreateConversationProps> = ({
  allUsers,
  session,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loggedInUserObject = {
    id: session.user.sub,
    username: session.user.name,
    url: session.user.picture,
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) => {
      const isAlreadySelected = prev.some((u) => u.userID === user.userID);
      // Add or remove the entire user object
      return isAlreadySelected
        ? prev.filter((u) => u.userID !== user.userID) // Remove user if already selected
        : [...prev, user]; // Add user if not selected
    });
  };

  const handleSubmit = () => {
    const createConversation = async (selectedUsers, loggedInUserObject) => {
      try {
        // Map the users to match the expected backend structure
        const formattedUsers = selectedUsers.map((user) => ({
          id: user.UserID, // Change UserID -> id
          username: user.UserName, // Change UserName -> username
          url: user.PictureURL, // Change PictureURL -> url
        }));

        formattedUsers.push(loggedInUserObject);

        const response = await axios.post(
          "http://localhost:3000/api/directMessage",
          {
            users: formattedUsers, // Send correctly formatted users
          }
        );

        console.log("Successfully Created Conversation", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating conversation:", error);
        throw error;
      }
    };
    createConversation(selectedUsers, loggedInUserObject) // allUsers is already the correct array, no need for allUsers.data
      .then((data) => {
        console.log("Message status:", data.success);
      })
      .catch((error) => {
        console.error("Failed to create conversation:", error);
      });

    setShowModal(false);
    setSelectedUsers([]);
  };

  return (
    <div className="new-conversation">
      <button className="new-convo-btn" onClick={() => setShowModal(true)}>
        New Conversation
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Select Users</h3>
            <div className="modal-content">
              {allUsers.map((user) => (
                <label key={user.UserID} className="user-option">
                  <input
                    type="checkbox"
                    checked={selectedUsers.some(
                      (u) => u.UserID === user.UserID
                    )}
                    onChange={() => handleUserSelect(user)} // Pass whole user object
                  />
                  <span>{user.UserName}</span>
                </label>
              ))}
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              Start Conversation
            </button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewConversation;
