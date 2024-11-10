// frontend/src/components/CustomerDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import authService from '../services/authService';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [accountDetails, setAccountDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchAccountDetails = async () => {
      try {
        const data = await authService.getAccountDetails(userId);
        setAccountDetails(data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const data = await authService.getTransactions(userId);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchAccountDetails();
    fetchTransactions();
  }, [userId]);

  const firstName = user?.firstName;

  const handlePaymentButtonClick = (type) => {
    navigate('/payment', { state: { paymentType: type } });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Customer Dashboard</h1>
        <h2>Hello, {firstName}</h2>
      </header>
      <nav className="sidebar">
        <div className="menu">
          <button>Menu &gt;</button>
          <div className="submenu">
            <button>Transactions &gt;</button>
            <button>Payments &gt;</button>
          </div>
        </div>
      </nav>
      <div className="main-actions">
        <button className="action-button" onClick={() => handlePaymentButtonClick('Local')}>Make Local Payment</button>
        <button className="action-button" onClick={() => handlePaymentButtonClick('International')}>Make International Payment</button>
      </div>
      <section className="banking-details">
        <h3>Banking Details</h3>
        <p>Account type: Current Acc.</p>
        <p>Account number: {accountDetails.accountNumber}</p>
        <p>Available balance: ${accountDetails.balance}</p>
      </section>
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

export default CustomerDashboard;