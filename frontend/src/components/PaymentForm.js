import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentType, userId } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState({
    recipientName: '',
    recipientBank: '',
    recipientAccountNumber: '',
    amountToTransfer: '',
    swiftCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/payments', {
        ...paymentDetails,
        userId,
        paymentType
      });
      navigate('/dashboard'); // Redirect to dashboard after successful payment
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  
  // UI
  return (
    <div className="payment-form-container">
      <h3>{paymentType === 'local' ? 'Local Payment' : 'International Payment'}</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Recipient Name:</label>
          <input
            type="text"
            name="recipientName"
            value={paymentDetails.recipientName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Recipient Bank:</label>
          <input
            type="text"
            name="recipientBank"
            value={paymentDetails.recipientBank}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Recipient Account Number:</label>
          <input
            type="text"
            name="recipientAccountNumber"
            value={paymentDetails.recipientAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount to Transfer:</label>
          <input
            type="number"
            name="amountToTransfer"
            value={paymentDetails.amountToTransfer}
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
              value={paymentDetails.swiftCode}
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