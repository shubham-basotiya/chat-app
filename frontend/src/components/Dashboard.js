import React, { useState, useEffect } from "react";
import API from "../api";
import ChatWindow from "./ChatWindow";

export default function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => { fetchProfile(); }, []);

  async function fetchProfile() {
    const res = await API.get("/users/me");
    setProfile(res.data);
  }

  async function acceptRequest(requesterId) {
    await API.post(`/users/${requesterId}/accept`);
    fetchProfile();
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", padding: 20 }}>
      <div style={{ width: 250, borderRight: "1px solid gray", padding: 10 }}>
        <h3>Welcome, {profile.username}</h3>
        <button onClick={onLogout}>Logout</button>
        <hr />
        <h4>Requests</h4>
        {profile.requests.length === 0 ? <p>No requests</p> : (
          profile.requests.map(req => (
            <div key={req._id}>
              {req.username} <button onClick={() => acceptRequest(req._id)}>Accept</button>
            </div>
          ))
        )}
        <hr />
        <h4>Contacts</h4>
        {profile.contacts.length === 0 ? <p>No contacts</p> : (
          profile.contacts.map(c => (
            <div key={c._id} style={{ cursor: "pointer", padding: 5 }}
              onClick={() => setChatUser(c._id)}>
              {c.username}
            </div>
          ))
        )}
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        {chatUser ? <ChatWindow chatUser={chatUser} /> : <p>Select a contact to start chatting</p>}
      </div>
    </div>
  );
}