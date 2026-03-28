import { Link } from 'react-router-dom';
import { FaInstagramSquare, FaTelegramPlane, FaWhatsappSquare } from 'react-icons/fa';

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
                    <li><Link to="/services/b1-b2-visa">Full-Cycle B1/B2 Visa Services</Link></li>
                    <li><Link to="/services/f1-visa">Full-Cycle F-1 Visa Services</Link></li>
                    <li><Link to="/services/b1-b2-visa-ext">Full-Cycle B1/B2 Visa Status Extension Services</Link></li>
                    <li><Link to="/services/change-of-status">Full-Cycle Change of Status Services</Link></li>
                    <li><Link to="/services/tps">Full-Cycle TPS Services</Link></li>
                    <li><Link to="/services/i765-application">Full-Cycle I-765 Initial Application and Renewal Service</Link></li>
                    <li><Link to="/services/i131-application">Full-Cycle I-131 Application Services</Link></li>
                    <li><Link to="/services/dv-lottery">DV Lottery Registration for Individuals (In the U.S. and Abroad) Service</Link></li>
                    <li><Link to="/services/green-card-dv">Green Card through DV Lottery Winning (For Applicants in the U.S. and Abroad) Service</Link></li>
                </ul>
                </section>
                <section className="picture">Picture Goes Here</section>
                <section className="social_media">
                    <a href="https://www.instagram.com/america_with_anastasiia/" target="_blank" rel="noopener noreferrer" style={{display: 'flex'}}>
                        <FaInstagramSquare size={24} />
                        <span>
                            Follow Us on Instagram
                        </span>
                    </a>
                    <span> or </span>
                    <a href="https://ig.me/m/america_with_anastasiia/" target="_blank" rel="noopener noreferrer" style={{display: 'flex'}}>
                        <FaInstagramSquare size={24} />
                        <span>
                            Message Us!
                        </span>
                    </a>
                    <br />
                    <a href="https://t.me/americanastasia" target="_blank" rel="noopener noreferrer" style={{display: 'flex'}}>
                        <FaTelegramPlane size={24} />
                        <span>
                            Message Us on Telegram!
                        </span>
                    </a>
                    <br />
                    <a href="#" onClick={handleWhatsAppClick}>
                        <FaWhatsappSquare size={24} />
                        <span>
                            Message Us on WhatsApp!
                        </span>
                    </a>
                </section>
            </main>

            <footer className="footer">
                <div className="contact">Contact</div>
                <div className="credentials">Credentials</div>
            </footer>

        </>
  );
}