import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState({});

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

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Recipient</th>
            <th>Amount</th>
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
  );
};

export default EmployeeDashboard;