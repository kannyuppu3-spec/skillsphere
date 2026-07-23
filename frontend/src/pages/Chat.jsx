import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Replace this with your CLIENT MongoDB _id
  const res = await api.get("/users");

setUsers(res.data);

  const fetchMessages = async (userId) => {
    try {
      const res = await api.get(`/messages/conversation/${userId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;

    fetchMessages(selectedUser.id);

    const interval = setInterval(() => {
      fetchMessages(selectedUser.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  const openClientChat = () => {
    setSelectedUser(client);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await api.post("/messages/send", {
        receiver: selectedUser.id,
        message: newMessage,
      });

      setNewMessage("");

      fetchMessages(selectedUser.id);
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to send messages.");
    }
  };

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        <h2>Conversations</h2>

        <button
          onClick={openClientChat}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {client.name}
        </button>
      </div>

      {/* Chat */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!selectedUser ? (
          <div style={{ padding: "20px" }}>
            <h3>Select a conversation</h3>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                padding: "15px",
                borderBottom: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              Chat with {selectedUser.name}
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "15px",
                background: "#f9f9f9",
              }}
            >
              {messages.length === 0 ? (
                <p>No messages found.</p>
              ) : (
                messages.map((msg) => {
                  const isMine =
                    msg.sender?._id === currentUser.id;

                  return (
                    <div
                      key={msg._id}
                      style={{
                        display: "flex",
                        justifyContent: isMine
                          ? "flex-end"
                          : "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          background: isMine
                            ? "#DCF8C6"
                            : "#FFFFFF",
                          padding: "10px",
                          borderRadius: "10px",
                          maxWidth: "60%",
                          border: "1px solid #ddd",
                        }}
                      >
                        <strong>{msg.sender?.name}</strong>

                        <p style={{ margin: "5px 0" }}>
                          {msg.message}
                        </p>

                        <small>
                          {new Date(
                            msg.createdAt
                          ).toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "15px",
                borderTop: "1px solid #ccc",
              }}
            >
              <input
                type="text"
                value={newMessage}
                placeholder="Type a message..."
                onChange={(e) =>
                  setNewMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;