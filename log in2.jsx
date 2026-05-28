import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import the component above
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    console.log("User logged in!");
  };

  return (
    <div style={{ width: '100%' }}>
      {!isAuthenticated ? (
        // Show the Login Page
        <LoginPage onLogin={handleLoginSuccess} />
      ) : (
        // Show the Dashboard (from previous code)
        <div>
          <h1>Welcome to Dashboard</h1>
          {/* ... Dashboard Content ... */}
        </div>
      )}
    </div>
  );
};

export default App;