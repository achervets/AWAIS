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

                <nav className="header-nav">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>

                    <div className={`nav-dropdown-wrapper ${location.pathname.startsWith('/services') ? 'active' : ''}`}>
                        <span className="nav-link dropdown-trigger">
                            Services <span className="arrow-down">▼</span>
                        </span>
                        
                        <ul className="dropdown-menu level-1">
                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Placeholder Option 1 <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/placeholder-1-1">Sub Option 1.1</Link></li>
                                    <li><Link to="/services/placeholder-1-2">Sub Option 1.2</Link></li>
                                    <li><Link to="/services/placeholder-1-3">Sub Option 1.3</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Placeholder Option 2 <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/placeholder-2-1">Sub Option 2.1</Link></li>
                                    <li><Link to="/services/placeholder-2-2">Sub Option 2.2</Link></li>
                                    <li><Link to="/services/placeholder-2-3">Sub Option 2.3</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Placeholder Option 3 <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/placeholder-3-1">Sub Option 3.1</Link></li>
                                    <li><Link to="/services/placeholder-3-2">Sub Option 3.2</Link></li>
                                    <li><Link to="/services/placeholder-3-3">Sub Option 3.3</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <Link to="/contact_us" className={`nav-link ${location.pathname === '/contact_us' ? 'active' : ''}`}>
                        Contact Us
                    </Link>

                    <Link to="/admin" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>
                        Admin
                    </Link>
                </nav>
                
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