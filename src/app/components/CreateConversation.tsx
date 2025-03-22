import React, { useState } from "react";
import "./CreateConversation.css";
import axios from "axios";

interface CreateConversationProps {
  allUsers: any; // eslint-disable-line
  session: any; // eslint-disable-line
  buttonText?: string;
  isGroup?: boolean;
  onConversationCreated?: () => void;
}

const NewConversation: React.FC<CreateConversationProps> = ({
  allUsers,
  session,
  buttonText = "New Conversation",
  isGroup = false,
  onConversationCreated,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setErrorMessage(null);
  };

  const showTemporaryError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const handleSubmit = async () => {
    if (isGroup && selectedUsers.length < 2) {
      showTemporaryError("You need at least 2 users to create a group");
      return;
    }

    try {
      const formattedUsers = selectedUsers.map((user) => ({
        id: user.UserID,
        username: user.UserName,
        url: user.PictureURL,
      }));

      formattedUsers.push(loggedInUserObject);

      const endpoint = isGroup ? "/api/groupMessage" : "/api/directMessage";

      const response = await axios.post(endpoint, {
        users: formattedUsers,
      });

      console.log("Successfully Created Conversation", response.data);
      setShowModal(false);
      setSelectedUsers([]);
      setErrorMessage(null);

      if (onConversationCreated) {
        onConversationCreated();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        showTemporaryError("A conversation already exists with these users");
      } else {
        showTemporaryError("Failed to create conversation. Please try again.");
      }
    }
  };

  return (
    <div className={`new-conversation ${isGroup ? "group-conversation" : ""}`}>
      <button className="new-convo-btn" onClick={() => setShowModal(true)}>
        {buttonText === "New Conversation" ? "New\nConversation" : buttonText}
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
            {errorMessage && <div className="error-popup">{errorMessage}</div>}
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
                setErrorMessage(null);
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
