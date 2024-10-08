import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './CustomerDashboard.css'; // Import the CSS file for styles

const CustomerDashboard = () => {
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setAvailableBalance] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await authService.getUserInfo(token);
                setFullName(response.user.fullName); 
                setAccountNumber(response.account.accountNumber);
                setAvailableBalance(`$${response.account.balance.toFixed(2)}`);

            } catch (error) {
                console.error('Failed to fetch user info:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Handle unauthorized access
                }
            }
        };
        fetchUserInfo();
    }, [navigate]);

    const handleLocalPayments = () => {
        navigate('/payment');
    };

    const handleInternationalPayments = () => {
        navigate('/payment');
    };

    return (
        <div className="dashboard">
            <h2>Hello, {fullName}</h2>
            <div className="banking-details-container">
                <div className="banking-details">
                    <strong>Current Account</strong>
                    <div>
                        <span>Name: {fullName}</span> {/* Using full name instead of customerName */}
                    </div>
                    <div>
                        <span>Acc No: {accountNumber}</span>
                    </div>
                    <div>
                        <span>Available Balance: {balance}</span>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleLocalPayments}>Local Payments</button>
                <button onClick={handleInternationalPayments}>International Payments</button>
            </div>
        </div>
    );
};

export default CustomerDashboard;