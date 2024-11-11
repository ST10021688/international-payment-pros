import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import logo from '../assets/images/bank-logo.png'; // Import the logo image

const EmployeeDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await authService.getAllTransactions();
        const internationalTransactions = response.filter(transaction => transaction.transactionType === 'International');
        setTransactions(internationalTransactions);

        // Fetch user details for each transaction
        const userIds = [...new Set(internationalTransactions.map(transaction => transaction.userId))];
        const userDetails = await Promise.all(userIds.map(id => authService.getUserDetails(id)));
        const usersMap = userDetails.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleValidate = async (transactionId) => {
    try {
      await authService.validateTransaction(transactionId);
      setTransactions(transactions.map(t => t._id === transactionId ? { ...t, status: 'Validated' } : t));
    } catch (error) {
      console.error('Error validating transaction:', error);
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await authService.rejectTransaction(transactionId);
      setTransactions(transactions.map(t => t._id === transactionId ? { ...t, status: 'Rejected' } : t));
    } catch (error) {
      console.error('Error rejecting transaction:', error);
    }
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

      <div className="employee-dashboard">
        <div className="main-actions">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
                    <h1>Employee Dashboard</h1>

          <span className="divider"></span>
        </div>

        <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Swift Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{users[transaction.userId]?.firstName} {users[transaction.userId]?.lastName}</td>
                <td>{transaction.recipientName}</td>
                <td>${transaction.amountToTransfer}</td>
                <td>{transaction.swiftCode}</td>
                <td>{transaction.status}</td>
                <td>
                  <button onClick={() => handleValidate(transaction._id)}>Validate</button>
                  <button onClick={() => handleReject(transaction._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;