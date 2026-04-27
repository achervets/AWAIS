import React, { useState } from 'react';

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success! Welcome back.");
      } else {
        setMessage(`Error: ${data.detail}`);
      }
    } catch (error) {
      setMessage("Cannot reach the server.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      
      <form className="auth-form" onSubmit={handleLogin}>

        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        
        <button type="submit">
          Log In
        </button>
      </form>

      {message && <p className="auth-status">{message}</p>}
    </div>
  );
}