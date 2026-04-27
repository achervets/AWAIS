import { useState } from 'react';
import { Link } from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import '@/styles/ContactForm.css';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track success state

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic Field Checks
    if (!name.trim()) {
      setResult("Please enter your name.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResult("Please enter a valid email address.");
      return;
    }

    // Length Validation
    if (message.trim().length < 10) {
      setResult("Please provide a bit more detail (at least 10 characters).");
      return;
    }

    // Profanity Filter
    if (leoProfanity.check(message)) {
      setResult("Please ensure your message remains professional.");
      return; 
    }

    setResult("Sending Message...");
    formData.append("access_key", "26492ee7-14d2-445c-9035-5f68b65fc78b");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message sent successfully! We will be in touch soon.");
            setIsSubmitted(true); // Switch to success state
        } else {
            console.log("Error", data);
            setResult("Oops! Something went wrong. Please try again.");
        }
    } catch (error) {
        setResult("Network error. Please check your internet connection.");
    }
  };

  const handleReset = () => {
    setResult("");
    setIsSubmitted(false);
  };

  // Determine if the message is an error
  const isError = result.includes("Error") || result.includes("Oops") || result.includes("Please");

  return (
    <div className="contact-container">
      {isSubmitted ? (
        /* --- SUCCESS STATE --- */
        <div className="success-view">
          <h2 className="result-success">{result}</h2>
          <p>Thank you for reaching out to America with Anastasiia.</p>
          
          <div className="success-buttons">
            <Link to="/">
              Back to Home
            </Link>
            <button onClick={handleReset}>
              Fill out another form
            </button>
          </div>
        </div>
      ) : (
        /* --- FORM STATE --- */
        <>
          <h2>Contact Us</h2>
          <form onSubmit={onSubmit} className="contact-form" noValidate>
            <input 
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
                className="contact-input"
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                className="contact-input"
            />
            <select 
                name="service" 
                required 
                defaultValue=""
                className="contact-select"
            >
              <option value="" disabled>Select a Service...</option>
              <option value="B-1/B-2 Tourist Visa">B-1/B-2 Tourist Visa</option>
              <option value="F-1 Student Visa">F-1 Student Visa</option>
              <option value="B-1/B-2 Tourist Visa Status Extension">B-1/B-2 Tourist Visa Status Extension</option>
              <option value="Change of Status">Change of Status</option>
              <option value="Temporary Protected Status">Temporary Protected Status (TPS)</option>
              <option value="Application for Employment Authorization (I-765)">Application for Employment Authorization (I-765)</option>
              <option value="Application for Travel, Parole, and Arrival/Departure Documents (I-131)">Application for Travel, Parole, and Arrival/Departure Documents (I-131)</option>
              <option value="DV Lottery Registration for Individuals (In the U.S. and Abroad)">DV Lottery Registration for Individuals (In the U.S. and Abroad)</option>
              <option value="Green Card through Winning the DV Lottery (For Applicants in the U.S. and Abroad)">Green Card through Winning the DV Lottery (For Applicants in the U.S. and Abroad)</option>
              <option value="Re-Parole for Ukraine">Re-Parole for Ukraine</option>
              <option value="K-1, K-2, K-3, K-4 Visas for Fiancés of U.S. Citizens">K-1, K-2, K-3, K-4 Visas for Fiancés of U.S. Citizens</option>
              <option value="SB-1 Returning Student Visa">SB-1 Returning Student Visa</option>
              <option value="Congressional Inquiry Assistance">Congressional Inquiry Assistance</option>
              <option value="Other/Not Sure">Other / Not Sure</option>
            </select>
            <textarea
                name="message"
                placeholder="Your Message Here"
                required
                rows="5"
                className="contact-textarea"
            ></textarea>

            {/* Honeypot to catch bots */}
            <input type="checkbox" name="botcheck" className="honeypot" style={{ display: 'none' }} />

            <button
                type="submit"
                className="contact-submit-btn"
            >Submit
            </button>
          </form>

          {result && (
            <p className={`contact-result ${isError ? "result-error" : "result-success"}`}>
              {result}
            </p>
          )}
        </>
      )}
    </div>
  );
}