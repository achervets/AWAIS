import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaWhatsappSquare } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import logo3 from '@/assets/logo3.png';
import NastyaPhotoOfficial from '@/assets/NastyaPhotoOfficial.jpeg'
import '@/styles/HomePage.css';

export default function HomePage() {
    const [latestPost, setLatestPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const part1 = "170776"
    const part2 = "19120"

    const messageText = "Test Message DNR";

    const handleWhatsAppClick = (event) => {
        event.preventDefault();

        const fullNumber = part1 + part2;
        const whatsappURL = `https://wa.me/${fullNumber}?text=${encodeURIComponent(messageText)}`;
        
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        const fetchLatestNews = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/news?limit=1&offset=0');
                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data.posts) && data.posts.length > 0) {
                        setLatestPost(data.posts[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching latest news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestNews();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + 'Z');
        if (isNaN(date.getTime())) return 'Unknown Date';
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <div className="banner_container">
                <img src={logo3} alt="Logo Banner" className="banner"/>
            </div>

            <div className="home_grid">
                <section className="services">
                    <h1>Nastya Khanykov/Pavlyukova Pick One</h1>
                    <div className="services-grid">
                        <img src={NastyaPhotoOfficial} alt="Nastya's Real Face" className="face"/>
                    </div>
                </section>
                
                <section className="social_media">
                    <a href="https://www.instagram.com/america_with_anastasiia/" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-base instagram-bg">
                            <BsInstagram size={48} />
                        </div>
                        <span>Follow Us on Instagram</span>
                    </a>
                    <br />   
                    <a href="https://t.me/americanastasia" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-base telegram-bg">
                            <FaTelegramPlane size={48} color="#0088cc" />
                        </div>
                        <span>Message Us on Telegram!</span>
                    </a>
                    <br />
                    <a href="#" onClick={handleWhatsAppClick}>
                        <div className="whatsapp-container">
                            <div className="whatsapp-inner-bg"></div>
                            <FaWhatsappSquare className="whatsapp-icon" />
                        </div>
                        <span>Message Us on WhatsApp!</span>
                    </a>
                </section>

                <section className="description">
                    <h1>A Letter From the Founder</h1>
                    <p>Dear Clients, Welcome to America with Anastasiia Visa Agency - your trusted partner for visa support, document services, and travel planning.</p>
                    <p>My name is Anastasiia Pavlyukova, and I am the founder of America with Anastasiia. I am originally from Ukraine. Before starting this company, I spent five years working with leading immigration law firms in the U.S., helping with different types of visas and immigration cases.</p>
                    <p>America with Anastasiia was created for people who want to feel supported, understood, and confident during an important step in their life. We know that every visa, every document, and every application carries a personal story behind it - a family visit, a student dream, a new opportunity, a safe stay, a long-awaited trip, or a fresh start.</p>
                    <p>Our team believes in your success and is ready to support you at every stage of your journey. We use an individual approach to every client and every case, carefully reviewing your situation, documents, goals, and needs. We do not treat your case like standard paperwork - we treat it with attention, responsibility, and care.</p>
                    <p>At America with Anastasiia, we want the process to feel clear, organized, and less stressful. Our goal is not only to prepare your application, but also to create a warm and welcoming experience where you feel heard, guided, and never left alone with confusing paperwork.</p>
                    <p>We stay in touch with our clients throughout the process and even after the work is done. Your plans, your peace of mind, and your future matter to us, and we are honored to be part of your next step.</p>
                    <p>With respect,<br />Anastasiia Pavlyukova<br />Founder, America with Anastasiia Visa Agency</p>
                </section>
                
                <section className="picture">
                    {loading ? (
                        <p>Loading latest update...</p>
                    ) : latestPost ? (
                        <div className="home-news-preview">
                            {latestPost.picture && (
                                <img 
                                    src={latestPost.picture.startsWith('data:') ? latestPost.picture : `data:image/jpeg;base64,${latestPost.picture}`} 
                                    alt={latestPost.title} 
                                    className="home-news-image" 
                                />
                            )}
                            <h3 className="home-news-title">{latestPost.title}</h3>
                            <small className="home-news-date">Published: {formatDate(latestPost.created_at)}</small>
                            <p className="home-news-summary">{latestPost.summary}</p>
                            <button onClick={() => navigate('/news')} className="home-news-learn-more-btn">
                                Learn More →
                            </button>
                        </div>
                    ) : (
                        <p>No recent news posts found.</p>
                    )}
                </section>
            </div>
        </>
    );
}