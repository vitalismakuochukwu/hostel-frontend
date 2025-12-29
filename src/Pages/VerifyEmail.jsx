import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying...');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await fetch(`https://hostel-management-system-backend-2o9z.onrender.com/api/auth/verify/${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setMessage(data.message);
          setIsSuccess(true);
        } else {
          setMessage(data.message || 'Verification failed.');
          setIsSuccess(false);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        setIsSuccess(false);
      }
    };

    if (token) verifyAccount();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white p-5">
      <h2 className="text-3xl font-bold mb-4">{isSuccess ? 'Success!' : 'Verification Status'}</h2>
      <p className="text-xl mb-6">{message}</p>
      <Link to="/AuthForm" className="bg-yellow-400 text-green-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition">Go to Login</Link>
    </div>
  );
};

export default VerifyEmail;