import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccordionItem from '../AccordionItem';
import './ServicePage.css';

const serviceTitles = {
  "b1-b2-visa": "B-1/B-2 Tourist Visa",
  "f1-visa": "F-1 Student Visa",
  "b1-b2-visa-ext": "B-1/B-2 Tourist Visa Status Extension",
  "change-of-status": "Change of Status",
  "tps": "Temporary Protected Status (TPS)",
  "i765-application": "Application for Employment Authorization (I-765)",
  "i131-application": "Application for Travel, Parole, and Arrival/Departure Documents (I-131)",
  "dv-lottery": "DV Lottery Registration for Individuals (In the U.S. and Abroad)",
  "green-card-dv": "Green Card through Winning the DV Lottery (For Applicants in the U.S. and Abroad)",
  "reparole-ukraine": "Re-Parole for Ukraine",
  "k-fiance-visa": "K-1, K-2, K-3, K-4 Visas for Fiancés of U.S. Citizens",
  "sb1-visa": "SB-1 Returning Student Visa",
  "congress-inquiry": "Congressional Inquiry Assistance",
};

export default function ServicePage() {

  const { serviceId } = useParams();

  const [pageDescription, setPageDescription] = useState("");
  const [textChunks, setTextChunks] = useState([]); 
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
        if (!response.ok) throw new Error(`Could not find the file for ${serviceId} (Error ${response.status})`);
        return response.text();
      })
      .then(text => {
        /* Splitting by newline */
        const sections = text.split(/\n\s*\n/);
        /* Extracting the description */
        const introText = sections[0];
        setPageDescription(introText);
        const accordionSections = sections.slice(1);
        const parsedChunks = accordionSections.map(section => {
          const lines = section.split('\n');
          const title = lines[0];
          const content = lines.slice(1).join('\n');
          return { title, content};
        }).filter(chunk => chunk.title && chunk.content);

        setTextChunks(parsedChunks);
      })
      .catch(error => setErrorMessage(error.message));
  }, [serviceId]);

  return (
    <div className="service-page-container">
      <h1 className="service-page-title">{pageTitle}</h1>

      {pageDescription && (
        <p className="service-page-description">
          {pageDescription}
        </p>
      )}

      {errorMessage ? (
        <div className="service-error-message">
          <strong>Oops! Something went wrong.</strong>
          <br />
          {errorMessage}
        </div>
      ) : (
        <div>
          {textChunks.map((chunk, index) => (
            <AccordionItem 
              key={index} 
              title={chunk.title} 
              content={chunk.content} 
            />
          ))}
        </div>
      )}
    </div>
  );
}