import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/components/backendHelper';
import '@/styles/FormStyles.css';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstname: "", lastname: "", email: "", password: "", confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Error: Passwords do not match.");
      return;
    }

    try {
      await authService.register({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('userFirstName', formData.firstname);
      setMessage("Account created! Redirecting...");
      
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const isError = message.includes("Error");

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form className="base-form" onSubmit={handleRegister}>
        <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
          <input className="form-input" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
          <input className="form-input" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
        </div>
        <input className="form-input" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input className="form-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input className="form-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit" className="form-submit-btn">Sign Up</button>
      </form>
      {message && <p className={`form-status ${isError ? "status-error" : "status-success"}`}>{message}</p>}
      <p className="form-footer-text">
        Already have an account? <Link to="/login" className="form-link">Log In</Link>
      </p>
    </div>
  );
}