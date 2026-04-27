import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaWhatsappSquare } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import logo1 from '@/assets/logo1.png'
import '@/styles/HomePage.css';

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

            <div className="banner_container">
                <img src={logo1} alt="Logo Banner" className="banner"/>
            </div>

            <div className="home_grid">
                <section className="description">
                <p>This is a description(tm)</p>
                </section>
                
                <section className="services">
                <h1>Services</h1>
                <div className="services-grid">
                    <Link to="/services/b1-b2-visa">
                        <span>B-1/B-2 Tourist Visa</span>
                    </Link>
                    <Link to="/services/f1-visa">
                        <span>F-1 Student Visa</span>
                    </Link>
                    <Link to="/services/b1-b2-visa-ext">
                        <span>B-1/B-2 Tourist Visa Status Extension</span>
                    </Link>
                    <Link to="/services/change-of-status">
                        <span>Change of Status</span>
                    </Link>
                    <Link to="/services/tps">
                        <span>Temporary Protected Status (TPS)</span>
                    </Link>
                    <Link to="/services/i765-application">
                        <span>Application for Employment Authorization (I-765)</span>
                    </Link>
                    <Link to="/services/i131-application">
                        <span>Application for Travel, Parole, and Arrival/Departure Documents (I-131)</span>
                    </Link>
                    <Link to="/services/dv-lottery">
                        <span>DV Lottery Registration for Individuals (In the U.S. and Abroad)</span>
                    </Link>
                    <Link to="/services/green-card-dv">
                        <span>Green Card through Winning the DV Lottery</span>
                    </Link>
                    <Link to="/services/reparole-ukraine">
                        <span>Re-Parole for Ukraine</span>
                    </Link>
                    <Link to="/services/k-fiance-visa">
                        <span>K-1, K-2, K-3, K-4 Visas for Fiancés</span>
                    </Link>
                    <Link to="/services/sb1-visa">
                        <span>SB-1 Returning Student Visa</span>
                    </Link>
                    <Link to="/services/congress-inquiry">
                        <span>Congressional Inquiry Assistance</span>
                    </Link>
                </div>
                </section>
                
                <section className="picture">Picture Goes Here</section>
                
                <section className="social_media">
                    <a href="https://www.instagram.com/america_with_anastasiia/" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-base instagram-bg">
                            <BsInstagram size={48} />
                        </div>
                        <span>
                            Follow Us on Instagram
                        </span>
                    </a>
                    <br />   
                    <a href="https://t.me/americanastasia" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-base telegram-bg">
                            <FaTelegramPlane size={48} color="#0088cc" />
                        </div>
                        <span>
                            Message Us on Telegram!
                        </span>
                    </a>
                    <br />
                    <a href="#" onClick={handleWhatsAppClick}>
                        <div className="whatsapp-container">
                            <div className="whatsapp-inner-bg">
                            </div>
                            <FaWhatsappSquare className="whatsapp-icon" />
                        </div>
                        <span>
                            Message Us on WhatsApp!
                        </span>
                    </a>
                </section>
            </div>
        </>
  );
}