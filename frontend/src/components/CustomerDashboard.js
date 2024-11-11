// frontend/src/components/CustomerDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import authService from '../services/authService';
import './CustomerDashboard.css';
import logo from '../assets/images/bank-logo.png'; // Import the logo image

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

  //---------------------------------------------------------------------------------------------------------//
  const handlePaymentButtonClick = (type) => {
    // Redirect to the payment page with the payment type
    navigate('/payment', { state: { paymentType: type } });
  };

  //---------------------------------------------------------------------------------------------------------//  
  const handleLogout = async () => {
    try {
      // Redirect to the login page or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.response || error);
      alert('Error logging out. Please try again.');
    }
  };

  //---------------------------------------------------------------------------------------------------------//
  // UI
  return (
    <div className="main-container">

      <div className="logo-container">
        <img src={logo} alt="Logo" />
        <label>Global Banking</label>
      </div>

      <div className="dashboard">

        <div className="main-actions">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <span className="divider"></span>
        </div>

        <header>
          <h1>Customer Dashboard</h1>
          <h2>Hello, {firstName}</h2>
        </header>

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
              <p>Recipient: {transaction.recipientName}</p>
              <p>Amount: ${transaction.amountToTransfer}</p>

              {transaction.transactionType === 'International' && <p>Status: <span className="pending">{transaction.status}</span></p>}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;