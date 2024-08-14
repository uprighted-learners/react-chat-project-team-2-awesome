import React, { useState, useEffect } from "react";

const Room = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false); // To manage button state

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
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        setError("Error fetching messages");
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [room.id]); // Only refetch if room.id changes

  const sendMessage = async () => {
    if (!newMessage.trim()) return; //Prevent sending empty messages

    setSending(true);

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
      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setNewMessage("");
    } catch (error) {
      setError("Error sending message");
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="message-view">
        {loading ? (
          <div>Loading messages...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
        messages.map((message) => (
          <div key={message.id}>{message.content}</div>
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
