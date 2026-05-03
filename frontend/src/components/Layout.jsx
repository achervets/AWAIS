import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '@/styles/Layout.css'; 

export default function Layout({ children }) {
    const [firstName, setFirstName] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedName = localStorage.getItem('userFirstName');
        setFirstName(savedName);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('userFirstName');
        setFirstName(null);
        navigate('/login');
    };

    return (
        <div className="page_edges">
            
            <header className="header">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="title">America with Anastasiia Immigration Services</div>
                </Link>
                
                <div className="auth-buttons">
                    {firstName ? (
                        <div className="user-greeting-container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span className="welcome-text">Hi, {firstName}</span>
                            <button className="login-btn" onClick={handleLogout}>Log Out</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="login-btn">Log In</button>
                            </Link>
            
                            <Link to="/register">
                                <button className="signup-btn">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="inner_page"> 
                {children}
            </main>

            <footer className="footer">
                <div className="contact">
                    <Link to="/contact_us">Contact Us</Link>
                </div>
                <div className="credentials">Credentials</div>
                <div>
                    <p>&copy; {new Date().getFullYear()} Nastya's Visa Emporium. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}