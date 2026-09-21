import { Link, useNavigate, useLocation } from 'react-router-dom';
import '@/styles/Layout.css'; 

export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const firstName = localStorage.getItem('userFirstName');

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login');
    };

    return (
        <div className="page_edges">
            
            <header className="header">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="title">America with Anastasiia</div>
                </Link>

                <nav className="header-nav">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>

                    <div className={`nav-dropdown-wrapper ${location.pathname.startsWith('/services') ? 'active' : ''}`}>
                        <span className="nav-link dropdown-trigger" tabIndex="0">
                            Services <span className="arrow-down">▼</span>
                        </span>
                        
                        <ul className="dropdown-menu level-1">
                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Visas <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/b1-b2-visa">B-1/B-2 Tourist Visa</Link></li>
                                    <li><Link to="/services/f1-visa">F-1 Student Visa</Link></li>
                                    <li><Link to="/services/k-fiance-visa">K-1/K-3 Fiancé Visas</Link></li>
                                    <li><Link to="/services/sb1-visa">SB-1 Returning Resident Visa</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Status &amp; Work <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/b1-b2-visa-ext">Status Extension</Link></li>
                                    <li><Link to="/services/change-of-status">Change of Status</Link></li>
                                    <li><Link to="/services/tps">Temporary Protected Status (TPS)</Link></li>
                                    <li><Link to="/services/i765-application">Employment Authorization</Link></li>
                                    <li><Link to="/services/i131-application">Travel &amp; Parole Documents</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-item has-submenu">
                                <span className="submenu-trigger">Other Services <span className="arrow-right">▶</span></span>
                                <ul className="dropdown-menu level-2">
                                    <li><Link to="/services/dv-lottery">DV Lottery Registration</Link></li>
                                    <li><Link to="/services/green-card-dv">DV Lottery Green Card</Link></li>
                                    <li><Link to="/services/reparole-ukraine">Re-Parole for Ukraine</Link></li>
                                    <li><Link to="/services/congress-inquiry">Congressional Inquiry</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <Link to="/contact_us" className={`nav-link ${location.pathname === '/contact_us' ? 'active' : ''}`}>
                        Contact Us
                    </Link>

                    <Link to="/news" className={`nav-link ${location.pathname.startsWith('/news') ? 'active' : ''}`}>
                        News
                    </Link>
                </nav>
                
            </header>

            <main className="inner_page"> 
                {children}
            </main>

            <footer className="footer">
                <div className="footer-links">
                    <Link to="/contact_us">Contact Us</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
                <div className="auth-buttons">
                    {firstName ? (
                        <div className="user-greeting-container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span className="welcome-text">Hi, {firstName}</span>
                            <button className="login-btn" onClick={handleLogout}>Log Out</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="login-btn">Admin Log In</button>
                            </Link>
            
                        </>
                    )}
                </div>
                <div>
                    <p>&copy; {new Date().getFullYear()} America with Anastasiia. All rights reserved.</p>
                    <p className="footer-disclaimer">Government agencies decide all applications and petitions; outcomes are not guaranteed.</p>
                </div>
            </footer>
        </div>
    );
}
