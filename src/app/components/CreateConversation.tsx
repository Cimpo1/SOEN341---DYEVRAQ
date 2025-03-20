import React, { useState, useEffect } from "react";
import "./CreateConversation.css";
import { UserStoredInDB } from "./ChatSidebar";
import axios from "axios";
import { User } from "./HomeContent";

interface CreateConversationProps {
  allUsers: any;
  session: any;
  buttonText?: string;
  isGroup?: boolean;
}

const NewConversation: React.FC<CreateConversationProps> = ({
  allUsers,
  session,
  buttonText = "New Conversation",
  isGroup = false,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loggedInUserObject = {
    id: session.user.sub,
    username: session.user.name,
    url: session.user.picture,
  };

  const handleUserSelect = (user) => {
    if (isGroup) {
      setSelectedUsers((prev) => {
        const isAlreadySelected = prev.some((u) => u.UserID === user.UserID);
        return isAlreadySelected
          ? prev.filter((u) => u.UserID !== user.UserID)
          : [...prev, user];
      });
    } else {
      setSelectedUsers([user]);
    }
  };

  const handleSubmit = () => {
    const createConversation = async (selectedUsers, loggedInUserObject) => {
      try {
        const formattedUsers = selectedUsers.map((user) => ({
          id: user.UserID,
          username: user.UserName,
          url: user.PictureURL,
        }));

        formattedUsers.push(loggedInUserObject);

        const response = await axios.post(
          "http://localhost:3000/api/directMessage",
          {
            users: formattedUsers,
          }
        );

        console.log("Successfully Created Conversation", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating conversation:", error);
        throw error;
      }
    };
    createConversation(selectedUsers, loggedInUserObject)
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
    <div className={`new-conversation ${isGroup ? "group-conversation" : ""}`}>
      <button className="new-convo-btn" onClick={() => setShowModal(true)}>
        {buttonText}
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Select {isGroup ? "Users" : "a User"}</h3>
            <div className="modal-content">
              {allUsers.map((user) => (
                <label key={user.UserID} className="user-option">
                  <input
                    type={isGroup ? "checkbox" : "radio"}
                    checked={selectedUsers.some(
                      (u) => u.UserID === user.UserID
                    )}
                    onChange={() => handleUserSelect(user)}
                    name="user-selection"
                  />
                  <span>{user.UserName}</span>
                </label>
              ))}
            </div>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={selectedUsers.length === 0}
            >
              {isGroup ? "Create Group" : "Start Conversation"}
            </button>
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                setSelectedUsers([]);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewConversation;
