import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus('Uploading...');
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Upload failed');
      
      setStatus(data.message);
      setFile(null);
    } catch (err) {
      setError(err.message);
      setStatus('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CSV User Upload</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={!file}>
          Upload CSV
        </button>
      </form>
      
      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}