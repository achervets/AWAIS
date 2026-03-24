import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Anastasiia</h1>
      <p>Ready for those immigration services? Let's talk.</p>
      
      {}
      <Link to="/" style={{ display: 'inline-block', marginTop: '20px' }}>
        &larr; Back to Home
      </Link> 
    </div>
  );
}