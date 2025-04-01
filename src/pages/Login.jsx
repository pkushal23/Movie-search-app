import React, { useState } from "react";
import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  
import "../css/Login.css"


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/"); // ✅ Redirect to home after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> 
    </div>
    </div>
  );
};

export default Login;
