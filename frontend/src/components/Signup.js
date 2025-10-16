import React, { useState } from "react";
import API from "../api";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      await API.post("/auth/signup", { username, email, password });
      alert("Signup successful! Please login.");
      onSignup();
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}