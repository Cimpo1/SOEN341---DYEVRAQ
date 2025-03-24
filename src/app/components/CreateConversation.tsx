import React, { useState, useRef } from "react";
import "./CreateConversation.css";
import axios from "axios";

interface CreateConversationProps {
  allUsers: any; // eslint-disable-line
  session: any; // eslint-disable-line
  buttonText?: string;
  isGroup?: boolean;
  onConversationCreated?: () => void;
}

interface HoverState {
  userId: string;
  startTime: number;
  timer: NodeJS.Timeout | null;
}

const NewConversation: React.FC<CreateConversationProps> = ({
  allUsers,
  session,
  buttonText = "New Conversation",
  isGroup = false,
  onConversationCreated,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hoverStates, setHoverStates] = useState<{ [key: string]: number }>({});
  const hoverTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const loggedInUserObject = {
    id: session.user.sub,
    username: session.user.name,
    url: session.user.picture,
  };

  const handleUserSelect = (user) => {
    if (isGroup) {
      setSelectedUsers((prev) => {
        const isAlreadySelected = prev.some((u) => u.UserID === user.UserID);
        if (isAlreadySelected) {
          // Remove from admins when unselecting
          setSelectedAdmins((current) =>
            current.filter((id) => id !== user.UserID)
          );
          // Reset hover state when unselecting
          setHoverStates((prev) => {
            const newState = { ...prev };
            delete newState[user.UserID];
            return newState;
          });
          return prev.filter((u) => u.UserID !== user.UserID);
        }
        return [...prev, user];
      });
    } else {
      setSelectedUsers([user]);
    }
    setErrorMessage(null);
  };

  const handleUserHover = (userId: string, isEntering: boolean) => {
    if (!isGroup || !selectedUsers.some((u) => u.UserID === userId)) return;

    if (isEntering) {
      // Clear any existing timer for this user
      if (hoverTimers.current[userId]) {
        clearTimeout(hoverTimers.current[userId]);
      }

      // Start a new timer
      setHoverStates((prev) => ({ ...prev, [userId]: 0 }));

      // Timer for intermediate color (2s)
      hoverTimers.current[userId] = setTimeout(() => {
        setHoverStates((prev) => ({ ...prev, [userId]: 1 }));

        // Timer for full color (additional 1s)
        hoverTimers.current[userId] = setTimeout(() => {
          setHoverStates((prev) => ({ ...prev, [userId]: 2 }));
          // Toggle admin status
          setSelectedAdmins((current) => {
            const isAdmin = current.includes(userId);
            return isAdmin
              ? current.filter((id) => id !== userId)
              : [...current, userId];
          });
        }, 1000);
      }, 2000);
    } else {
      // Clear timer when mouse leaves
      if (hoverTimers.current[userId]) {
        clearTimeout(hoverTimers.current[userId]);
        delete hoverTimers.current[userId];
      }
      // Reset hover state if not yet an admin
      if (!selectedAdmins.includes(userId)) {
        setHoverStates((prev) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      }
    }
  };

  const getNameStyle = (userId: string) => {
    if (!isGroup) return {};

    const isSelected = selectedUsers.some((u) => u.UserID === userId);
    if (!isSelected) return { color: "white" }; // Always white if not selected

    const hoverState = hoverStates[userId] || 0;
    const isAdmin = selectedAdmins.includes(userId);

    if (isAdmin) {
      return { color: "#4F46E5" }; // Admin color
    }

    switch (hoverState) {
      case 1:
        return { color: "#A5B4FC" }; // Intermediate color
      case 2:
        return { color: "#4F46E5" }; // Full color
      default:
        return { color: "white" }; // Default color
    }
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

      // Add logged-in user to the users list
      formattedUsers.push(loggedInUserObject);

      // Create admins list with selected admins and the logged-in user
      const admins = [
        ...selectedAdmins.map((adminId) => {
          const adminUser = selectedUsers.find((u) => u.UserID === adminId);
          return {
            id: adminUser.UserID,
            username: adminUser.UserName,
            url: adminUser.PictureURL,
          };
        }),
        loggedInUserObject, // Always include the creator as admin
      ];

      const endpoint = isGroup ? "/api/groupMessage" : "/api/directMessage";

      const response = await axios.post(endpoint, {
        users: formattedUsers,
        admins: isGroup ? admins : undefined,
      });

      console.log("Successfully Created Conversation", response.data);
      setShowModal(false);
      setSelectedUsers([]);
      setSelectedAdmins([]);
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
                <label
                  key={user.UserID}
                  className="user-option"
                  onMouseEnter={() => handleUserHover(user.UserID, true)}
                  onMouseLeave={() => handleUserHover(user.UserID, false)}
                >
                  <input
                    type={isGroup ? "checkbox" : "radio"}
                    checked={selectedUsers.some(
                      (u) => u.UserID === user.UserID
                    )}
                    onChange={() => handleUserSelect(user)}
                    name="user-selection"
                  />
                  <span style={getNameStyle(user.UserID)}>
                    {user.UserName}
                    {selectedUsers.some((u) => u.UserID === user.UserID) &&
                      selectedAdmins.includes(user.UserID) &&
                      " (Admin)"}
                  </span>
                </label>
              ))}
            </div>
            <div>
              {isGroup && (
                <p className="note">
                  To grant or remove a user&apos;s admin access, hover over
                  their name for 3 seconds after selecting them.
                </p>
              )}
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
                setSelectedAdmins([]);
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
