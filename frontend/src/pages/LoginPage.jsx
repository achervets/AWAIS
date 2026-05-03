import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/components/backendHelper';
import '@/styles/FormStyles.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const userData = await authService.login({
        username: email,
        password: password
      });
      if (userData.firstname) {
        localStorage.setItem('userFirstName', userData.firstname);
      }

      setMessage(`Success! Welcome back, ${userData.firstname}.`);

      setTimeout(() => navigate('/'), 1500);
      
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const isError = message.includes("Error");
  const isSuccess = message.includes("Success");

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <form className="base-form" onSubmit={handleLogin}>
        <input 
          className="form-input"
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="form-input"
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit" className="form-submit-btn">Log In</button>
      </form>

      {message && (
        <p className={`form-status ${isError ? "status-error" : (isSuccess ? "status-success" : "")}`}>
          {message}
        </p>
      )}

      <p className="form-footer-text">
        Don't have an account? <Link to="/register" className="form-link">Sign Up</Link>
      </p>
    </div>
  );
}