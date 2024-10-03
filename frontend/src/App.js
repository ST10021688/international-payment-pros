import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/RegistrationForm'; // Adjust the path based on your project structure

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the registration page */}
          <Route path="/" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;