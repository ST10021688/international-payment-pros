// frontend/src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';
import authService from '../services/authService';

const PaymentsForm = () => {
  const [recipientName, setRecipientName] = useState(''); // Recipient name
  const [recipientsBank, setRecipientsBank] = useState(''); // Recipient's bank
  const [recipientsAccountNumber, setRecipientsAccountNumber] = useState(''); // Recipient's account number
  const [amountToTransfer, setAmountToTransfer] = useState(''); // Amount to transfer
  const [swiftCode, setSwiftCode] = useState(''); // SWIFT code (for international transactions)
  const [transactionType, setTransactionType] = useState('local'); // Default to local transaction
  const [status, setStatus] = useState('pending');
  const [transactions, setTransactions] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      // Fetch user info to get the user ID
      const userInfo = await authService.getUserInfo(token);
      const userId = userInfo.user._id; // Access the user ID

      // Input sanitization
      const sanitizedRecipientName = recipientName.trim();
      const sanitizedRecipientsBank = recipientsBank.trim();
      const sanitizedRecipientsAccountNumber = recipientsAccountNumber.trim();
      const sanitizedAmountToTransfer = parseFloat(amountToTransfer.trim());
      const sanitizedSwiftCode = swiftCode.trim();
      const sanitizedTransactionType = transactionType.trim();

      // Input validation
      if (!sanitizedRecipientName || !sanitizedRecipientsBank || !sanitizedRecipientsAccountNumber || !sanitizedTransactionType) {
        alert('All fields are required');
        return;
      }

      if (isNaN(sanitizedAmountToTransfer) || sanitizedAmountToTransfer <= 0) {
        alert('Please enter a valid amount greater than 0');
        return;
      }

      if (!/^\d+$/.test(sanitizedRecipientsAccountNumber)) {
        alert('Please enter a valid account number (numbers only)');
        return;
      }

      if (sanitizedTransactionType === 'international' && sanitizedSwiftCode && !/^[A-Z0-9]{8,11}$/.test(sanitizedSwiftCode)) {
        alert('Please enter a valid SWIFT code');
        return;
      }

      const transactionData = {
        recipientName,
        recipientsBank,
        recipientsAccountNumber,
        amountToTransfer,
        swiftCode: transactionType === 'international' ? swiftCode : '', // Swift code only for international transactions
        transactionType,
        status,
        userId
      };

      const response = await authService.payment(transactionData, token); // Call the service
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting payment:', error);
    }

    // Reset form
    setRecipientName('');
    setRecipientsBank('');
    setRecipientsAccountNumber('');
    setAmountToTransfer('');
    setSwiftCode('');
    setTransactionType('local');
  };

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await authService.getTransactions(token);
      setTransactions(response);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions');
    }
  };

  return (
    <div className="registration-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient Name:</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipient's Bank:</label>
          <input
            type="text"
            value={recipientsBank}
            onChange={(e) => setRecipientsBank(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipient's Account Number:</label>
          <input
            type="text"
            value={recipientsAccountNumber}
            onChange={(e) => setRecipientsAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount to Transfer:</label>
          <input
            type="number"
            value={amountToTransfer}
            onChange={(e) => setAmountToTransfer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>SWIFT Code:</label>
          <input
            type="text"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            disabled={transactionType === 'local'} // Only allow SWIFT for international payments
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} required>
            <option value="local">Local Payment</option>
            <option value="international">International Payment</option>
          </select>
        </div>
        <button type="submit">Pay Now</button>
      </form>
      <button onClick={fetchTransactions}>View All Transactions</button>
      <div>
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.recipientName} - {transaction.amountToTransfer} - {transaction.transactionType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentsForm;
