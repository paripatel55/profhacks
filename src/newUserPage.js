// new user 
import React, { useState } from 'react';

function NewUserPage() {
  const [income, setIncome] = useState(''); // Income state
  const [file, setFile] = useState(null); // File state for bank statement
  const [uploadMessage, setUploadMessage] = useState(''); // Message for upload status

  // Handle income submission
  const handleIncomeSubmit = () => {
    if (!income) return alert('Please enter your income'); // Check if income is provided
    console.log('New income:', income); // Log income for demo
  };

  // Handle file input change
  const handleFileChange = (e) => setFile(e.target.files[0]); // Save selected file

  // Handle file upload
  const handleFileUpload = () => {
    if (!file) return setUploadMessage('Please choose a file');
    
    const formData = new FormData(); 
    formData.append('file', file); // Append file to form data

    // Send file to backend for analysis
    fetch('http://your-backend-url/upload', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(() => setUploadMessage('File uploaded successfully!')) // Success message
      .catch(() => setUploadMessage('Error uploading file.')); // Error message
  };

  return (
    <div>
      <h1>Welcome, New User!</h1>

      {/* Income input */}
      <div>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)} 
          placeholder="Enter income"
        />
        <button onClick={handleIncomeSubmit}>Submit Income</button>
      </div>

      {/* File upload */}
      <div>
        <input
          type="file"
          accept=".csv,.pdf"
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>Upload Bank Statement</button>
        <p>{uploadMessage}</p>
      </div>
    </div>
  );
}

export default NewUserPage;
