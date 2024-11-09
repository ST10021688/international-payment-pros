import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext'; // UserContext to manage user data globally
import Register from './components/RegistrationForm';
import Login from './components/LoginForm';
import CustomerDashboard from './components/CustomerDashboard';
import Payment from './components/PaymentForm';

function App() {
  return (
    <UserProvider> {/* Wrap the app in UserProvider for global state management */}
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

            {/* Default route redirecting to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
