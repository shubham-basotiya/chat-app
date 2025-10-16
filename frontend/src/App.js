import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        {showLogin ? (
          <Login onLogin={setUser} />
        ) : (
          <Signup onSignup={() => setShowLogin(true)} />
        )}
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Create account" : "Back to login"}
        </button>
      </div>
    );
  }

  return <Dashboard user={user} onLogout={() => { localStorage.clear(); setUser(null); }} />;
}

export default App;