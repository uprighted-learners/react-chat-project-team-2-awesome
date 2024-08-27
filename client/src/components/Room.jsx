import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import View from "./View";
import '../App.css';

const Room = ({ selectedRoom }) => {
  const room = selectedRoom;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false); // To manage button state
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState("");

  //Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/messages/${selectedRoom._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      console.log(data);
      setMessages(data);
      setLoading(true);
    } catch (error) {
      setError("Error fetching messages");
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [room._id]); // Only refetch if room.id changes

  //Send message to the server
  const sendMessage = async () => {
    if (!newMessage.trim()) return; //Prevent sending empty messages

    setSending(true);

    try {
      const response = await fetch(
        `http://localhost:5000/messages/message/${localStorage.getItem("UID")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ room: selectedRoom._id, body: newMessage }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      fetchMessages(); //Refresh messages
      console.log(data);
      setNewMessage("");
    } catch (error) {
      setError("Error sending message");
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (messageId) => {
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is admin

    try {
      const response = await fetch(
        `http://localhost:5000/rooms/${room.id}/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete message");
    } catch (error) {
      setError("Error deleting messages");
      console.error("Error deleting messages:", error);
    }
  };

  const updateMessage = async () => {
    if (!editMessageContent.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/rooms/${room.id}/messages/${editMessageId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ body: editMessageContent }),
        }
      );

      if (!response.ok) throw new Error("Failed to update message");
      setEditMessageId(null);
      setEditMessageContent("");
    } catch (error) {
      setError("Error updating message");
      console.error("Error updating message:", error);
    }
  };

  const handleEditClick = (message) => {
    setEditMessageId(message._id);
    setEditMessageContent(message.body);
  };

  return (
    <div>
      <View />
      <InputField />
      <div className="message-view">
        {!loading ? (
          <div>Loading messages...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          messages.map((message) => (
            <div key={message._id}>
                  <p>{message.body}</p>
                  <h5>User:{message?.user?.firstName}</h5>
                    </div>
                  ))
                )}
                </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={sending || !newMessage.trim()}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Room;
