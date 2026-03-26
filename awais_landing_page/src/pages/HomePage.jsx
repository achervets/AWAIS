import { Link } from 'react-router-dom'

export default function HomePage() {
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
                <section className="social_media">Social Media Goes Here</section>
            </main>

            <footer className="footer">
                <div className="contact">Contact</div>
                <div className="credentials">Credentials</div>
            </footer>

        </>
  );
}