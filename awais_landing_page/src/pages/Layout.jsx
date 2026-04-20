import { Link } from 'react-router-dom';
import './Layout.css'; 

export default function Layout({ children }) {
    return (
        <div className="page_edges">
            
            <header className="header">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="title">America with Anastasiia Immigration Services</div>
                </Link>
                <div className="auth-buttons">
                    <Link to="/login">
                        <button className="login-btn">Log In</button>
                    </Link>
    
                    <Link to="/register">
                        <button className="signup-btn">Sign Up</button>
                    </Link>
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