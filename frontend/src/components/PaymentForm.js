// frontend/src/components/PaymentForm.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import authService from '../services/authService';
import './PaymentForm.css';
import logo from '../assets/images/bank-logo.png'; // Import the logo image

const PaymentForm = () => {
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null); // Store user's full account details

  const navigate = useNavigate();
  const location = useLocation();
  const { paymentType } = location.state || { paymentType: 'local' }; // Default to 'local' if not passed
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  //---------------------------------------------------------------------------------------------------------//
  // Fetch user's account details
  useEffect(() => {
    const fetchUserAccountDetails = async () => {
      try {
        const data = await authService.getAccountDetails(userId);
        setAccountDetails(data); // Store account details
      } catch (error) {
        setError('Failed to fetch user balance.');
      }
    };
    if (userId) {
      fetchUserAccountDetails();
    }
  }, [userId]);

  //---------------------------------------------------------------------------------------------------------//
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

  //---------------------------------------------------------------------------------------------------------//
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  //---------------------------------------------------------------------------------------------------------//
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting transaction data:', {
      ...transactionData,
      userId
    });

    // Reset error state before submission
    setError('');

    if (!transactionData.recipientName || !transactionData.recipientsBank || !transactionData.recipientsAccountNumber || !transactionData.amountToTransfer) {
      setError('Please fill in all required fields');
      return;
    }

    if (transactionData.amountToTransfer <= 0) {
      setError('Amount to transfer must be a positive number');
      return;
    }

    // Check if accountDetails are fetched and perform balance check
    if (accountDetails && transactionData.amountToTransfer > accountDetails.balance) {
      setError('Insufficient funds in your account');
      return;
    }

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
      setError('Error processing payment. Please try again later.');
      console.error('Error making payment:', error);
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

          {paymentType === 'International' && (
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Confirm</button>

          <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;