import React, { useState } from "react";
import './App.css';
import Routes from "../src/component/Routes";
import AuthContext from "./context/AuthContext";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAuth(null);
    setEmail(null);
    setUserId(null);
  };
  const context = {
    auth,
    setAuth,
    userId,
    setUserId,
    email,
    setEmail,
    user,
    setUser,
    logout,
  };
  return (
    <AuthContext.Provider value={context}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
