import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaWhatsappSquare } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

export default function HomePage() {

    /* This assembles the phone number for the WhatsApp link onClick, to avoid bots */
    const part1 = "170776"
    const part2 = "19120"

    const messageText = "Test Message DNR";

    const handleWhatsAppClick = (event) => {
        event.preventDefault();

        const fullNumber = part1 + part2;
        const whatsappURL = `https://wa.me/${fullNumber}?text=${encodeURIComponent(messageText)}`;
        
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <header className="header">
                <div className="title">America with Anastasiia Immigration Services</div>
                <div className="auth-buttons">
                <button>Log In</button>
                <button>Sign Up</button>
                </div>
            </header>

            <main className="main">
                <section className="description">
                <p>This is a description(tm)</p>
                </section>
                <section className="services">
                <h1>Services</h1>
                <ul>
                    <li><Link to="/services/b1-b2-visa">B-1/B-2 Tourist Visa</Link></li>
                    <li><Link to="/services/f1-visa">F-1 Student Visa</Link></li>
                    <li><Link to="/services/b1-b2-visa-ext">B-1/B-2 Tourist Visa Status Extension</Link></li>
                    <li><Link to="/services/change-of-status">Change of Status</Link></li>
                    <li><Link to="/services/tps">Temporary Protected Status (TPS)</Link></li>
                    <li><Link to="/services/i765-application">Application for Employment Authorization (I-765)</Link></li>
                    <li><Link to="/services/i131-application">Application for Travel, Parole, and Arrival/Departure Documents (I-131)</Link></li>
                    <li><Link to="/services/dv-lottery">DV Lottery Registration for Individuals (In the U.S. and Abroad)</Link></li>
                    <li><Link to="/services/green-card-dv">Green Card through Winning the DV Lottery (For Applicants in the U.S. and Abroad)</Link></li>
                    <li><Link to="/services/reparole-ukraine">Re-Parole for Ukraine</Link></li>
                    <li><Link to="/services/k-fiance-visa">K-1, K-2, K-3, K-4 Visas for Fiancés of U.S. Citizens</Link></li>
                    <li><Link to="/services/sb1-visa">SB-1 Returning Student Visa</Link></li>
                    <li><Link to="/services/congress-inquiry">Congressional Inquiry Assistance</Link></li>
                </ul>
                </section>
                <section className="picture">Picture Goes Here</section>
                <section className="social_media">
                    <a href="https://www.instagram.com/america_with_anastasiia/" target="_blank" rel="noopener noreferrer" style={{display: 'flex'}}>
                        <div style={{ 
                        display: 'inline-flex',
                        padding: '8px',
                        borderRadius: '12px',
                        color: 'white',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
                        }}>
                            <BsInstagram size={48} />
                        </div>
                        <span>
                            Follow Us on Instagram
                        </span>
                    </a>
                    <br />   
                    <a href="https://t.me/americanastasia" target="_blank" rel="noopener noreferrer" style={{display: 'flex'}}>
                        <div style={{ 
                        display: 'inline-flex',
                        padding: '8px',
                        borderRadius: '12px',
                        background: 'white',
                        }}>
                            <FaTelegramPlane size={48} color="#0088cc" />
                        </div>
                        <span>
                            Message Us on Telegram!
                        </span>
                    </a>
                    <br />
                    <a href="#" onClick={handleWhatsAppClick}>
                        <div style={{ 
                        display: 'inline-flex',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '62px',
                        height: '62px',
                        marginLeft: '-2px',
                        }}>
                            <div style={{
                                position: 'absolute',
                                background: 'white',
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                            }}>
                            </div>
                                <FaWhatsappSquare size={70} color="#25D366" 
                                style={{ position: 'relative', zIndex: 1}}/>
                        </div>
                        <span>
                            Message Us on WhatsApp!
                        </span>
                    </a>
                </section>
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

        </>
  );
}