import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const PaymentForm = ({ customerName }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');

  const currencies = ['USD', 'EUR', 'ZAR', 'GBP']; // Add more as required
  const providers = ['SWIFT', 'Western Union', 'PayPal']; // Add dynamic providers if needed

  useEffect(() => {
    // Fetch customer name if not passed as prop
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        userId: 'user-id-placeholder', // Replace with actual user ID
        recipientName: customerName,
        recipientsBank: provider,
        recipientsAccountNumber: 'recipient-account-placeholder', // Replace with actual recipient account number
        amountToTransfer: amount,
        swiftCode: 'swift-code-placeholder', // Replace with actual SWIFT code
        transactionType: 'payment',
        status: 'pending',
      };
      const response = await authService.addTransaction(transactionData);
      console.log('Transaction successful:', response);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Hello, {customerName}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount to pay" 
            required 
          />
        </div>

        <div>
          <label>Select Currency:</label>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            required
          >
            <option value="">Select Currency</option>
            {currencies.map((curr, index) => (
              <option key={index} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Provider:</label>
          <select 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)} 
            required
          >
            <option value="">Select Provider</option>
            {providers.map((prov, index) => (
              <option key={index} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
