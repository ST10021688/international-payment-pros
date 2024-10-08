import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CustomerDashboard.css'; // Assuming you have a CSS file for styling

const CustomerDashboard = ({ customerName }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');

  const currencies = ['USD', 'EUR', 'ZAR', 'GBP']; // Add more as required
  const providers = ['SWIFT', 'Western Union', 'PayPal']; // Add dynamic providers if needed

  useEffect(() => {
    // Fetch customer name if not passed as prop
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log(`Amount: ${amount}, Currency: ${currency}, Provider: ${provider}`);
  };

  const firstName = customerName.split(' ')[0];

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header>
        <h1>Customer Dashboard</h1>
        <h2>Hello, {firstName}</h2>
      </header>

      {/* Navigation Menu (Left Sidebar) */}
      <nav className="sidebar">
        <div className="menu">
          <button>Menu &gt;</button>
          <div className="submenu">
            <button>Transactions &gt;</button>
            <button>Payments &gt;</button>
          </div>
        </div>
      </nav>

      {/* Main Actions (Top Center) */}
      <div className="main-actions">
        <button className="action-button">Make Local Payment</button>
        <button className="action-button">Make International Payment</button>
      </div>

      {/* Banking Details (Center) */}
      <section className="banking-details">
        <h3>Banking Details</h3>
        <p>Account type: Current Acc.</p>
        <p>Account number: XXXXXXXXXXXX</p>
        <p>Available balance: $1500.00</p>
      </section>

      {/* Payment Receipts (Bottom Center) */}
      <section className="payment-receipts">
        <h3>Payment Receipts</h3>
        <div className="receipt">
          <p>Date: 2024/08/20</p>
          <p>Description: Sch Fees</p>
          <p>Amount: $200</p>
          <button>Pay again</button>
        </div>
        <div className="receipt">
          <p>Date: 2024/08/20</p>
          <p>Description: Home R</p>
          <p>Amount: $100</p>
          <button>Pay again</button>
        </div>
      </section>
    </div>
  );
};

CustomerDashboard.propTypes = {
  customerName: PropTypes.string.isRequired,
};

export default CustomerDashboard;