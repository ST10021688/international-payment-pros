// frontend/src/components/PaymentForm.js
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import authService from '../services/authService';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentType } = location.state || {};
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  const [transactionData, setTransactionData] = useState({
    recipientName: '',
    recipientsBank: '',
    recipientsAccountNumber: '',
    amountToTransfer: '',
    swiftCode: '',
    transactionType: paymentType,
    status: 'Pending',
    date: new Date().toISOString()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting transaction data:', {
      ...transactionData,
      userId
    });
    try {
      const data = await authService.createTransaction({
        ...transactionData,
        userId
      });
      console.log('Transaction created successfully:', data);

      if (data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div className="payment-form-container">
      <h3>{paymentType === 'Local' ? 'Local Payment' : 'International Payment'}</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Recipient Name:</label>
          <input
            type="text"
            name="recipientName"
            value={transactionData.recipientName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Recipient Bank:</label>
          <input
            type="text"
            name="recipientsBank"
            value={transactionData.recipientsBank}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Recipient Account Number:</label>
          <input
            type="text"
            name="recipientsAccountNumber"
            value={transactionData.recipientsAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount to Transfer:</label>
          <input
            type="number"
            name="amountToTransfer"
            value={transactionData.amountToTransfer}
            onChange={handleInputChange}
            required
          />
        </div>
        {paymentType === 'international' && (
          <div>
            <label>SWIFT Code:</label>
            <input
              type="text"
              name="swiftCode"
              value={transactionData.swiftCode}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button type="submit">Confirm</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
};

export default PaymentForm;