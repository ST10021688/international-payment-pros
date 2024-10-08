import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerDashboard.css';

const CustomerDashboard = ({ customerName, userId }) => {
  const [accountDetails, setAccountDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch account details
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`/api/accounts/${userId}`);
        setAccountDetails(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    // Fetch recent transactions
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/transactions/${userId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchAccountDetails();
    fetchTransactions();
  }, [userId]);

  const firstName = customerName.split(' ')[0];

  const handlePaymentButtonClick = (type) => {
    navigate('/payment', { state: { paymentType: type, userId } });
  };

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
        <button className="action-button" onClick={() => handlePaymentButtonClick('local')}>Make Local Payment</button>
        <button className="action-button" onClick={() => handlePaymentButtonClick('international')}>Make International Payment</button>
      </div>

      {/* Banking Details (Center) */}
      <section className="banking-details">
        <h3>Banking Details</h3>
        <p>Account type: Current Acc.</p>
        <p>Account number: {accountDetails.accountNumber}</p>
        <p>Available balance: ${accountDetails.balance}</p>
      </section>

      {/* Payment Receipts (Bottom Center) */}
      <section className="payment-receipts">
        <h3>Payment Receipts</h3>
        {transactions.map((transaction) => (
          <div key={transaction._id} className="receipt">
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: ${transaction.amountToTransfer}</p>
            <button>Pay again</button>
          </div>
        ))}
      </section>
    </div>
  );
};

CustomerDashboard.propTypes = {
  customerName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default CustomerDashboard;