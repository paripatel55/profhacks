// existing user 
import React, { useState, useEffect } from 'react';

// Simulating fetching user data
const fetchUserData = () => {
  return {
    income: 5000,
    pieChartData: [2000, 1000, 500, 500] 
  };
};

function ExistingUserPage() {
  const [userData, setUserData] = useState(null);
  const [newIncome, setNewIncome] = useState('');
  const [file, setFile] = useState(null);
  const [isIncomeUpdated, setIsIncomeUpdated] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const data = fetchUserData();
    setUserData(data);
  }, []);

  const handleIncomeUpdate = () => {
    setUserData({ ...userData, income: newIncome });
    setIsIncomeUpdated(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Send the file to the backend for analysis
      fetch('http://your-backend-url/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => setUploadMessage('File uploaded and analyzed successfully!'))
      .catch(error => setUploadMessage('Error uploading the file.'));
    } else {
      setUploadMessage('Please choose a file to upload.');
    }
  };

  return (
    <div>
      <h1>Welcome Back!</h1>
      <div>
        <h2>Your Monthly Income: ${userData?.income}</h2>
      </div>
      <div>
        <input
          type="number"
          value={newIncome}
          onChange={(e) => setNewIncome(e.target.value)}
          placeholder="Update your income"
        />
        <button onClick={handleIncomeUpdate}>Update Income</button>
      </div>
      {isIncomeUpdated && <p>Your income has been updated to ${newIncome}</p>}
      <div>
        <h3>Monthly Expense Breakdown</h3>
        <ul>
          {userData?.pieChartData.map((amount, index) => (
            <li key={index}>Category {index + 1}: ${amount}</li>
          ))}
        </ul>
      </div>
      
      {/* File Upload Section */}
      <div>
        <input
          type="file"
          accept=".csv,.pdf" // Allowing specific file formats
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>Upload Bank Statement</button>
        <p>{uploadMessage}</p>
      </div>
    </div>
  );
}

export default ExistingUserPage;
