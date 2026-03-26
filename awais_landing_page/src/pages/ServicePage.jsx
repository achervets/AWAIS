import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const serviceTitles = {
  "b1-b2-visa": "Full-Cycle B1/B2 Visa Services",
  "f1-visa": "Full-Cycle F-1 Visa Services",
  "b1-b2-visa-ext": "Full-Cycle B1/B2 Visa Status Extension Services",
  "change-of-status": "Full-Cycle Change of Status Services",
  "tps": "Full-Cycle TPS Services",
  "i765-application": "Full-Cycle I-765 Initial Application and Renewal Service",
  "i131-application": "Full-Cycle I-131 Application Services",
  "dv-lottery": "DV Lottery Registration for Individuals (In the U.S. and Abroad) Service",
  "green-card-dv": "reen Card through DV Lottery Winning (For Applicants in the U.S. and Abroad) Service"
};

export default function ServicePage() {

  const { serviceId } = useParams();
  const [textContent, setTextContent] = useState("Loading description...");
  const [errorMessage, setErrorMessage] = useState(null);
  const pageTitle = serviceTitles[serviceId] || "Immigration Services";

  useEffect(() => {
    fetch(`/services/${serviceId}.txt`)
      .then(response => {
        /* vite returns index.html if file not found so we have to catch that */
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error(`Could not find the text file for: ${serviceId}`);
        }
        if (!response.ok) throw new Error(`Could not fine the file for ${serviceId} (Error ${response.status})`);
        return response.text();
      })
      .then(text => setTextContent(text))
      .catch(error => {setErrorMessage(error.message);
        setTextContent("");
      });
  }, [serviceId]);

  return (
    <div>
      <h1>{pageTitle}</h1>

      {errorMessage ? (
        <div>
          <strong>Oops! Something went wrong.</strong>
          <br />
          {errorMessage}
        </div>
      ) : (
        <p style={{ whiteSpace: 'pre-wrap'}}>{textContent}</p>
      )}
      
      <Link to="/">
        Back to Home
      </Link> 
    </div>
  );
}