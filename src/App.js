import React, { useState, useEffect } from 'react';
import './App.css';
import NewUserPage from './newUserPage'; // New user component
import ExistingUserPage from './oldUserPage'; // Existing user component

function App() {
  const [isExistingUser, setIsExistingUser] = useState(false); // Default to false (new user)

  // Function to check if the user exists in the MongoDB database
  const checkUserStatus = async () => {
    try {
      // Assuming the user identifier (e.g., username or email) is available after login
      const userIdentifier = 'usernameOrEmail'; // Replace with actual user identifier (from login session or token)

      const response = await fetch(`http://your-backend-url/check-user-status/${userIdentifier}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.exists) {
        setIsExistingUser(true); // User exists
      } else {
        setIsExistingUser(false); // User is new
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setIsExistingUser(false); // Default to new user if there's an error (e.g., database error)
    }
  };

  // Check user status when component mounts (after login)
  useEffect(() => {
    checkUserStatus(); // Check the user status from the database
  }, []);

  // Loading state or conditional rendering based on user status
  if (isExistingUser === null) {
    return <div>Loading...</div>; // Show a loading state while checking user status
  }

  return (
    <div className="App">
      {isExistingUser ? (
        <ExistingUserPage /> // Render existing user page if user exists
      ) : (
        <NewUserPage /> // Render new user page if user is new or error occurred
      )}
    </div>
  );
}

export default App;

