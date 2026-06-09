import { useState } from 'react';
import { Link } from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { contactHelper } from '@/components/contactHelper'; 
import '@/styles/FormStyles.css';
import 'react-phone-number-input/style.css';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track success state
  const [phone, setPhone] = useState(""); // Track phone state
  const [preferredLanguage, setPreferredLanguage] = useState("English"); // Track language choice
  const [preferredPlatform, setPreferredPlatform] = useState("Telegram"); // Track platform choice

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

    // Phone Number Validation
    if (!phone) {
      setResult("Please enter your phone number.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setResult("Please enter a valid phone number.");
      return;
    }

    // Append phone, language, and platform states into the FormData payload
    formData.append("Phone Number", phone);
    formData.append("Preferred Language", preferredLanguage);
    formData.append("Preferred Messaging Platform", preferredPlatform);

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

    try {
        await contactHelper(formData);

        setResult("Message sent successfully! We will be in touch soon.");
        setIsSubmitted(true); // Switch to success state
    } catch (error) {
        console.error("The actual error:", error);
        setResult(`Oops! Something went wrong. Please try again.`);
    }
  };

  const handleReset = () => {
    setResult("");
    setIsSubmitted(false);
    setPhone("");
    setPreferredLanguage("English");
    setPreferredPlatform("Telegram");
  };

  // Determine if the message is an error
  const isError = result.includes("Error") || result.includes("Oops") || result.includes("Please");

  return (
    <div className="form-container">
      {isSubmitted ? (
        /* --- SUCCESS STATE --- */
        <div className="success-view">
          <h2 className="status-success">{result}</h2>
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
          <form onSubmit={onSubmit} className="base-form" noValidate>
            <input 
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
                className="form-input"
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                className="form-input"
            />
            
            <div className="language-selector-container">
              <label className="language-label">Preferred Language</label>
              <div className="language-buttons-row">
                <button
                  type="button"
                  className={`lang-btn ${preferredLanguage === "English" ? "active" : ""}`}
                  onClick={() => setPreferredLanguage("English")}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`lang-btn ${preferredLanguage === "Russian" ? "active" : ""}`}
                  onClick={() => setPreferredLanguage("Russian")}
                >
                  Russian
                </button>
              </div>
            </div>

            <div className="language-selector-container">
              <label className="language-label">Preferred Messaging Platform</label>
              <div className="language-buttons-row">
                <button
                  type="button"
                  className={`lang-btn ${preferredPlatform === "Telegram" ? "active" : ""}`}
                  onClick={() => setPreferredPlatform("Telegram")}
                >
                  Telegram
                </button>
                <button
                  type="button"
                  className={`lang-btn ${preferredPlatform === "WhatsApp" ? "active" : ""}`}
                  onClick={() => setPreferredPlatform("WhatsApp")}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <PhoneInput
                defaultCountry="US"
                countries={['US', 'RU', 'UA']}
                addInternationalOption={false}
                international
                value={phone}
                onChange={setPhone}
                placeholder="Your Phone Number"
                required
                className="form-input"
            />

            <select 
                name="service" 
                required 
                defaultValue=""
                className="form-select"
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
                className="form-textarea"
            ></textarea>

            {/* Honeypot to catch bots */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

            <button
                type="submit"
                className="form-submit-btn"
            >Submit
            </button>
          </form>

          {result && (
            <p className={`form-status ${isError ? "status-error" : "status-success"}`}>
              {result}
            </p>
          )}
        </>
      )}
    </div>
  );
}