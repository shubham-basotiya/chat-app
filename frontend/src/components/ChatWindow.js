import React, { useState, useEffect } from "react";
import API from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatWindow({ chatUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchHistory() {
      const res = await API.get(`/chat/${chatUser}/history`);
      setMessages(res.data);
    }
    fetchHistory();
  }, [chatUser]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((m) => [...m, { content: msg, senderId: "other" }]);
    });
  }, []);

  async function sendMessage() {
    if (!text) return;
    await API.post(`/chat/${chatUser}/send`, { content: text });
    socket.emit("sendMessage", text);
    setMessages([...messages, { content: text, senderId: userId }]);
    setText("");
  }

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ border: "1px solid gray", height: 200, overflowY: "auto", padding: 5 }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.senderId === userId ? "right" : "left" }}>{m.content}</p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}