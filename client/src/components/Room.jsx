import React, { useState, useEffect } from "react";

const Room = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:9000/rooms/${room.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [room.id]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch(
        `http://localhost:9000/rooms/${room.id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );
      const data = await response.json();
      setMessages([...messages, data.message]);
      setNewMessage("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="message-view">
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Room;
