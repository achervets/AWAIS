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
                <h1>A Letter From the Founder</h1>
                <p>Dear Clients,
                    Welcome to America with Anastasiia Visa Agency
                     - your trusted partner for visa support, document services, and 
                     travel planning.
                </p>
                <p>
                    My name is Anastasiia Pavlyukova, and I am the founder of America with 
                    Anastasiia. I am originally from Ukraine. Before starting this company, 
                    I spent five years working with leading immigration law firms in the
                     U.S., helping with different types of visas and immigration cases.
                </p>
                <p>
                    America with Anastasiia was created for people who want to feel supported,
                     understood, and confident during an important step in their life. 
                     We know that every visa, every document, and every application carries 
                     a personal story behind it - a family visit, a student dream, a new 
                     opportunity, a safe stay, a long-awaited trip, or a fresh start.
                </p>
                <p>
                    Our team believes in your success and is ready to support you at every 
                    stage of your journey. We use an individual approach to every client and 
                    every case, carefully reviewing your situation, documents, goals, and 
                    needs. We do not treat your case like standard paperwork - we treat it 
                    with attention, responsibility, and care.
                </p>
                <p>
                    At America with Anastasiia, we want the process to feel clear, 
                    organized, and less stressful. Our goal is not only to prepare your 
                    application, but also to create a warm and welcoming experience where 
                    you feel heard, guided, and never left alone with confusing paperwork.
                </p>
                <p>
                    We stay in touch with our clients throughout the process and even after the work is done. Your plans, your peace of mind, and your future matter to us, and we are honored to be part of your next step.
                </p>
                <p>
                    With respect,<br />
                    Anastasiia Pavlyukova<br />
                    Founder, America with Anastasiia Visa Agency
                </p>
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
                
                <section className="picture">
                    <Link to="/news">
                        <button>No news is good news? Bullshit!</button>
                    </Link>
                </section>
                
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