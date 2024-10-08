//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/RegistrationForm';
import Login from './components/LoginForm';
import CustomerDashboard from './components/CustomerDashboard';
import Payment from './components/PaymentsForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the registration page */}
          <Route path="/register" element={<Register />} />

          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the registration page */}
          <Route path="/dashboard" element={<CustomerDashboard />} />

          {/* Route for the registration page */}
          <Route path="/payment" element={<Payment />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;