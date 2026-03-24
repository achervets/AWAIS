import './App.css'

function App() {

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
          <p>We handle your stuff, you give us big bux.</p>
        </section>
        <section className="services">
          <h1>Services</h1>
          <ul>
            <li>High Fives</li>
            <li>Low Fives</li>
            <li>Reasonable Fives</li>
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

export default App
