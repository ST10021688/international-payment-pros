<<<<<<< HEAD
//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Register from './components/RegistrationForm';
import Login from './components/LoginForm';
import CustomerDashboard from './components/CustomerDashboard';
import Payment from './components/PaymentForm';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route for the registration page */}
            <Route path="/register" element={<Register />} />

            {/* Route for the login page */}
            <Route path="/login" element={<Login />} />

            {/* Route for the customer dashboard page */}
            <Route path="/dashboard" element={<CustomerDashboard />} />

            {/* Route for the payment page */}
            <Route path="/payment" element={<Payment />} />

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
=======
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
>>>>>>> 468b49c (Register page is fixed)
  );
}

export default App;