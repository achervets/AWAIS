import { useState, useEffect } from 'react';

const ApiTest = () => {
  const [message, setMessage] = useState('Connecting to Backend...');
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/health')
      .then((response) => {
        console.log("Status Code:", response.status);
        if (response.status === 200) {
          setStatus('connected');
          return response.json();
        } else {
          throw new Error(`Unexpected Status: ${response.status}`);
        }
      })
      .then((data) => {
        setMessage(`Server is ${data.status} (v${data.version})`);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setMessage("Server is Down");
        setStatus('error');
      });
  }, []);

  const statusStyle = {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: status === 'connected' ? '#d4edda' : '#f8d7da',
    color: status === 'connected' ? '#155724' : '#721c24',
    marginTop: '20px',
    border: '1px solid',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%'
  };

  return (
    <div style={statusStyle}>
      <strong>Backend Status:</strong> {message}
    </div>
  );
};

export default ApiTest;