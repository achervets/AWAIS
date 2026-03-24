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
                    <li>Full-Cycle B1/B2 Visa Services</li>
                    <li>Full-Cycle F-1 Visa Services</li>
                    <li>Full-Cycle B1/B2 Visa Status Extension Services</li>
                    <li>Full-Cycle Change of Status Services</li>
                    <li>Full-Cycle TPS Services</li>
                    <li>Full-Cycle I-765 Initial Application and Renewal Service</li>
                    <li>Full-Cycle I-131 Application Services</li>
                    <li>DV Lottery Registration for Individuals (In the U.S. and Abroad) Service</li>
                    <li>Green Card through DV Lottery Winning (For Applicants in the U.S. and Abroad) Service</li>
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