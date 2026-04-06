import { useState } from 'react';
import { Link } from 'react-router-dom';
import leoProfanity from 'leo-profanity';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get("message");
    const email = formData.get("email");

    // Basic email validation (by structure) xxx@xxx.xxx
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
            event.target.reset();
        } else {
            console.log("Erorr", data);
            setResult("Oops! Something went wrong. Please try again.");
        }
    } catch (error) {
        setResult("Network error. Please check your internet connection.");
    }

    
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <h2>Contact Us</h2>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select 
            name="service" 
            required 
            defaultValue=""
            style={{ 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid #ccc', 
                backgroundColor: 'white',
                color: '#333',
                cursor: 'pointer'
            }}
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
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        ></textarea>

        {/* Honeypot to catch bots */}
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

        <button
            type="submit"
            style={{ padding: '12px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >Submit
        </button>
        </form>
        {result && <p style={{ marginTop: '20px', fontWeight: 'bold', color: result.includes("Error") || result.includes("Oops") ? "red" : "green" }}>{result}</p>}
        <Link to="/" style={{ display: 'block', marginTop: '30px' }}>
        Back to Home
        </Link>
    </div>
  );
}